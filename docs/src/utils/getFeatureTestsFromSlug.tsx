import {
  AstBuilder,
  GherkinClassicTokenMatcher,
  Parser,
} from "@cucumber/gherkin";
import { IdGenerator } from "@cucumber/messages";
import { readFile } from "fs/promises";
import glob from "glob";
import path from "path";

const parser = new Parser(
  new AstBuilder(IdGenerator.uuid()),
  new GherkinClassicTokenMatcher() // or GherkinInMarkdownTokenMatcher()
);

export async function getFeatureTestsFromSlug(slug: string) {
  const cwd = path.join(
    process.cwd(),
    "../packages/e2e/cypress/integration",
    slug
  );

  const featurePaths = glob.sync("**.feature", { cwd });
  const featureFiles = await Promise.all(
    featurePaths.map(async featurePath => {
      return {
        filepath: featurePath,
        contents: await readFile(path.resolve(cwd, featurePath), "utf-8"),
      };
    })
  );

  const featureTests = featureFiles
    .map(({ filepath, contents }) => {
      const document = parser.parse(contents);

      return {
        filepath,
        document,
      };
    })
    .filter(({ document }) => {
      return (
        document.feature.children
          // Ignore background steps for features – they'll always be applied
          .filter(({ background }) => !background)
          .some(({ scenario }) => {
            // TODO Dynamically filter these based on the current page `?framework`
            return scenario.tags?.find(({ name }) => name === "@React");
          })
      );
    })
    // Strip `undefined` properties because they're not JSON-serializable by Next.js
    .map(featureTest => JSON.stringify(featureTest))
    .map(featureJSON => JSON.parse(featureJSON));

  return featureTests;
}
