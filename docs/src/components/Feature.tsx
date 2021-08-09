import {
  AstBuilder,
  GherkinClassicTokenMatcher,
  Parser,
} from '@cucumber/gherkin';
import { IdGenerator } from '@cucumber/messages';
import {
  ClipboardCheckIcon,
  CodeIcon,
  ExclamationIcon,
  ExternalLinkIcon,
} from '@heroicons/react/solid';
import remarkHeadings from 'amplify-docs/src/plugins/headings';
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
    case 'next':
    case 'react':
      return `https://github.com/aws-amplify/amplify-ui/tree/${process.env.BRANCH}/examples/next/pages`;
    case 'vue':
      return `https://github.com/aws-amplify/amplify-ui/tree/${process.env.BRANCH}/examples/vue/src/pages`;

    default:
      throw new Error(`Examples folder not defined for ${platform}`);
  }
}

export function Feature({ name = required('Missing feature name') }) {
  const [source, setSource] = React.useState(null);
  const { pathname, query } = useRouter();
  const { platform = 'react' } = query;

  const port = getPortForPlatform(platform);

  useEffect(() => {
    import(
      `../../../packages/e2e/cypress/integration${pathname}/${name}.feature`
    ).then((exports) => setSource(exports.default));
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
      <div className="p-4 rounded-md bg-yellow-50">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationIcon
              className="w-5 h-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="m-0 text-sm font-medium text-yellow-800">
              This feature is not supported for this platform.{' '}
              <a href="https://github.com/aws-amplify/amplify-ui/issues/new/choose">
                Open an issue
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { default: About } = evaluateSync(
    document.feature.description,
    // @ts-ignore because react/jsx-runtime doesn't export types
    {
      ...runtime,
      rehypePlugins: [],
      remarkPlugins: [remarkHeadings, remarkGfm],
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
                    target="_blank"
                  >
                    <span className="sr-only">Source</span>
                    <CodeIcon className="h-4" />
                  </a>
                </td>
                <td>
                  <a
                    href={`https://github.com/aws-amplify/amplify-ui/blob/${process.env.BRANCH}/packages/e2e/cypress/integration${pathname}/${name}.feature#L${scenario.location.line}`}
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
