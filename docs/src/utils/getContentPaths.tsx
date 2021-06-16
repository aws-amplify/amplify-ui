import glob from "glob";
import path from "path";

const cwd = "src/content";

/**
 * List of all public content URL paths
 */
export async function getContentPaths(pattern = "**/index.mdx") {
  return glob.sync(pattern, { cwd }).map(contentPath => {
    return path.normalize(`/${path.dirname(contentPath)}`);
  });
}
