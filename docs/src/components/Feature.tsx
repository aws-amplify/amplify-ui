import { Alert } from '@aws-amplify/ui-react';
import {
  AstBuilder,
  GherkinClassicTokenMatcher,
  Parser,
} from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';
import {
  ClipboardCheckIcon,
  CodeIcon,
  ExternalLinkIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useEffect } from 'react';
import * as runtime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import { evaluateSync } from 'xdm';

const parser = new Parser(
  new AstBuilder(IdGenerator.uuid()),
  new GherkinClassicTokenMatcher() // or GherkinInMarkdownTokenMatcher()
);

function required(message) {
  throw new Error(message);
}

function getPortForPlatform(platform) {
  switch (platform) {
    case 'next':
    case 'react':
    case 'vue':
      return 3001;
    default:
      return 3000;
  }
}

function getGitHubUrlForExample(platform) {
  switch (platform) {
    case 'angular':
      return `https://github.com/aws-amplify/amplify-ui/tree/${process.env.BRANCH}/examples/angular/src/pages`;
    case 'next':
    case 'react':
      return `https://github.com/aws-amplify/amplify-ui/tree/${process.env.BRANCH}/examples/next/pages`;
    case 'vue':
      return `https://github.com/aws-amplify/amplify-ui/tree/${process.env.BRANCH}/examples/vue/src/pages`;

    default:
      console.error(
        `Examples folder not defined for ${platform}. Please open an issue: https://github.com/aws-amplify/amplify-ui/issues/choose`
      );
  }
}

export function Feature({ name = required('Missing feature name') }) {
  const [source, setSource] = React.useState(null);
  const { pathname, query } = useRouter();
  const { platform = 'react' } = query;

  const port = getPortForPlatform(platform);

  useEffect(() => {
    import(`../../../packages/e2e/features${pathname}/${name}.feature`).then(
      (exports) => setSource(exports.default)
    );
  }, [name, pathname]);

  if (!source) {
    return false;
  }

  const document = parser.parse(source);
  const scenarios = document.feature.children
    // Ignore background steps for features – they'll always be applied
    .filter(({ background }) => !background)
    .filter(({ scenario }) => {
      return scenario.tags?.find(({ name }) => name === `@${platform}`);
    });

  // TODO Don't show content if there aren't any supported scenarios
  if (!scenarios.length) {
    return (
      <Alert variation="warning">
        This feature is not supported for this platform.{' '}
        <a href="https://github.com/aws-amplify/amplify-ui/issues/new/choose">
          Open an issue
        </a>{' '}
        if you would like to see it added.
      </Alert>
    );
  }

  const { default: About } = evaluateSync(
    document.feature.description,
    // @ts-ignore because react/jsx-runtime doesn't export types
    {
      ...runtime,
      rehypePlugins: [],
      remarkPlugins: [remarkGfm],
    }
  );

  return (
    <React.Fragment key={document.feature.name}>
      {/* TODO Should this get rendered at all if it's redundant with the docs? */}
      {/* <About /> */}

      <details>
        <summary className="cursor-pointer">Examples</summary>

        <table className="w-full ml-4 table-auto">
          <thead>
            <tr className="text-sm text-left text-gray-600">
              <th className="sr-only">Example</th>
              {process.env.NODE_ENV === 'development' && <td>Demo</td>}
              <td>Source</td>
              <td>Test</td>
            </tr>
          </thead>
          <tbody className="shadow">
            {scenarios.map(({ scenario }, i) => (
              <tr
                className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                key={scenario.name}
              >
                <td className="p-1 px-2">{scenario.name}</td>
                {process.env.NODE_ENV === 'development' && (
                  <td>
                    <a
                      href={`http://localhost:${port}${pathname}/${name}`}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <span className="sr-only">Demo</span>
                      <ExternalLinkIcon className="h-4" />
                    </a>
                  </td>
                )}
                <td>
                  <a
                    href={`${getGitHubUrlForExample(
                      platform
                    )}${pathname}/${name}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="sr-only">Source</span>
                    <CodeIcon className="h-4" />
                  </a>
                </td>
                <td>
                  <a
                    href={`https://github.com/aws-amplify/amplify-ui/blob/${process.env.BRANCH}/packages/e2e/features${pathname}/${name}.feature#L${scenario.location.line}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <span className="sr-only">Test</span>
                    <ClipboardCheckIcon className="h-4" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </React.Fragment>
  );
}
