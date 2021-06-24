import { GherkinDocument } from "@cucumber/messages";

interface FeatureTestsProps {
  featureTests: GherkinDocument[];
}

export function FeatureTests({ featureTests = [] }: FeatureTestsProps) {
  if (!featureTests.length) {
    return null;
  }

  return (
    <>
      <h2>Features</h2>

      {featureTests.map(({ feature }) => (
        <section key={feature.name}>
          <h3>{feature.name}</h3>
          <p>{feature.description}</p>

          <h4>Examples</h4>
          <ul>
            {feature.children.map(({ scenario }) => (
              <li key={scenario.name}>
                <a href="#">{scenario.name}</a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
