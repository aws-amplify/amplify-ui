import glob from "glob";
import path from "path";

/**
 * List of all public content URL paths
 */
export async function getContentPaths() {
  return glob.sync("src/content/**/index.mdx").map(contentPath => {
    return path.dirname(contentPath).replace("src/content", "") || "/";
  });
}
