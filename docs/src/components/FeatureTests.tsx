import { GherkinDocument } from "@cucumber/messages";
import { useRouter } from "next/router";

interface FeatureTest {
  filepath: string;
  document: GherkinDocument;
}

interface FeatureTestsProps {
  featureTests: FeatureTest[];
}

export function FeatureTests({ featureTests = [] }: FeatureTestsProps) {
  const router = useRouter();

  if (!featureTests.length) {
    return null;
  }

  function getExampleHref({ filepath }) {
    const baseUrl =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://github.com/aws-amplify/amplify-ui/blob/main";

    return `${baseUrl}${router.asPath}/${filepath.split(".").shift()}`;
  }

  return (
    <>
      <h2>Features</h2>

      {featureTests.map(({ filepath, document }) => (
        <section key={document.feature.name}>
          <h3>{document.feature.name}</h3>
          <p>{document.feature.description}</p>

          <h4>Examples</h4>
          <ul>
            {document.feature.children
              .filter(({ background }) => !background)
              .map(({ scenario }) => (
                <li key={scenario.name}>
                  <a href={getExampleHref({ filepath })} target="_blank">
                    {scenario.name}
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </>
  );
}
