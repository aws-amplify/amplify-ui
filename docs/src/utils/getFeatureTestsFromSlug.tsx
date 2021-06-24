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
    featurePaths.map(featurePath =>
      readFile(path.resolve(cwd, featurePath), "utf-8")
    )
  );

  const featureTests = featureFiles.map(featureFile =>
    parser.parse(featureFile)
  );

  // Strip `undefined` properties because they're not JSON-serializable by Next.js
  return JSON.parse(JSON.stringify(featureTests));
}
