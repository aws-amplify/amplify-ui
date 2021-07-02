import { GherkinDocument } from "@cucumber/messages";
import { useRouter } from "next/router";
import {
  CodeIcon,
  ClipboardCheckIcon,
  ExternalLinkIcon,
} from "@heroicons/react/solid";

interface FeatureTest {
  document: GherkinDocument;
  filename: string;
  name: string;
}

interface FeatureTestsProps {
  featureTests: FeatureTest[];
}

export function FeatureTests({ featureTests = [] }: FeatureTestsProps) {
  const router = useRouter();

  if (!featureTests.length) {
    return null;
  }

  return (
    <>
      <h2>Features</h2>

      {featureTests.map(({ document, filename, name }) => (
        <section key={document.feature.name}>
          <h3>{document.feature.name}</h3>
          <p>{document.feature.description}</p>

          <details>
            <summary>Examples</summary>

            <table className="ml-4 table-auto">
              <thead>
                <tr>
                  <th>Example</th>
                  {process.env.NODE_ENV === "development" && <td>Demo</td>}
                  <td>Source</td>
                  <td>Test</td>
                </tr>
              </thead>
              <tbody>
                {document.feature.children
                  .filter(({ background }) => !background)
                  .map(({ scenario }) => (
                    <tr key={scenario.name}>
                      <td>{scenario.name}</td>
                      {process.env.NODE_ENV === "development" && (
                        <td>
                          <a
                            href={`http://localhost:3000${router.asPath}/${name}`}
                            target="_blank"
                          >
                            <span className="sr-only">Demo</span>
                            <ExternalLinkIcon className="h-4" />
                          </a>
                        </td>
                      )}
                      <td>
                        <a
                          href={`https://github.com/aws-amplify/amplify-ui/tree/${process.env.BRANCH}/examples/next/pages${router.asPath}/${name}`}
                          target="_blank"
                        >
                          <span className="sr-only">Source</span>
                          <CodeIcon className="h-4" />
                        </a>
                      </td>
                      <td>
                        <a
                          href={`https://github.com/aws-amplify/amplify-ui/blob/${process.env.BRANCH}/packages/e2e/cypress/integration${router.asPath}/${filename}#L${scenario.location.line}`}
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
        </section>
      ))}
    </>
  );
}
