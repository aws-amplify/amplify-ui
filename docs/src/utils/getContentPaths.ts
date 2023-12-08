import { globSync } from 'glob';
import path from 'path';

const cwd = path.resolve(process.cwd(), 'src/pages');

/**
 * List of all public content URL paths
 */
export type GetContentPaths = (pattern?: string) => string[];
export const getContentPaths: GetContentPaths = (pattern = '**/*.page.mdx') => {
  return globSync(pattern, { cwd })
    .map((contentPath) => {
      return path.normalize(`/${path.dirname(contentPath)}`);
    })
    .sort();
};
