import glob from 'glob';
import path from 'path';

const cwd = path.resolve(process.cwd(), 'src/pages');

/**
 * List of all public content URL paths
 */
export async function getContentPaths(pattern = '**/index.page.mdx') {
  return glob
    .sync(pattern, { cwd })
    .map((contentPath) => {
      return path.normalize(`/${path.dirname(contentPath)}`);
    })
    .sort();
}
