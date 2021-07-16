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

const parser = new Parser(
  new AstBuilder(IdGenerator.uuid()),
  new GherkinClassicTokenMatcher() // or GherkinInMarkdownTokenMatcher()
);

const required = (message) => {
  throw new Error(message);
};

export function Feature({
  framework = 'react',
  exampleFolder = 'next',
  name = required('Missing feature name'),
  port = 3000,
}) {
  const [source, setSource] = React.useState(null);
  let { asPath } = useRouter();
  asPath = asPath.split('-')[0];

  useEffect(() => {
    import(
      `raw-loader!../../../packages/e2e/cypress/integration${asPath}/${name}.feature`
    ).then((exports) => setSource(exports.default));
  }, [asPath, name]);

  if (!source) {
    return false;
  }

  const document = parser.parse(source);
  const scenarios = document.feature.children
    // Ignore background steps for features – they'll always be applied
    .filter(({ background }) => !background)
    .filter(({ scenario }) => {
      return scenario.tags?.find(
        ({ name }) => name.toLowerCase() === `@${framework}`
      );
    });

  return (
    <React.Fragment key={document.feature.name}>
      {/* Hidden, as these aren't rendered with  */}
      {/* <h3>{document.feature.name}</h3> */}
      {/* <p>{document.feature.description}</p> */}

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
                      href={`http://localhost:${port}${asPath}/${name}`}
                      target="_blank"
                    >
                      <span className="sr-only">Demo</span>
                      <ExternalLinkIcon className="h-4" />
                    </a>
                  </td>
                )}
                <td>
                  <a
                    href={`https://github.com/aws-amplify/amplify-ui/tree/${process.env.BRANCH}/examples/${exampleFolder}/pages${asPath}/${name}`}
                    target="_blank"
                  >
                    <span className="sr-only">Source</span>
                    <CodeIcon className="h-4" />
                  </a>
                </td>
                <td>
                  <a
                    href={`https://github.com/aws-amplify/amplify-ui/blob/${process.env.BRANCH}/packages/e2e/cypress/integration${asPath}/${name}.feature#L${scenario.location.line}`}
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
