import glob from 'glob';
import path from 'path';

const cwd = path.resolve(process.cwd(), 'src/pages');

/**
 * List of all public content URL paths
 */
export type GetContentPaths = (pattern?: string) => Promise<string[]>;
export const getContentPaths: GetContentPaths = async (
  pattern = '**/*.page.mdx'
) => {
  return glob
    .sync(pattern, { cwd })
    .map((contentPath) => {
      return path.normalize(`/${path.dirname(contentPath)}`);
    })
    .sort();
};
