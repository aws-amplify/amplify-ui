import * as fs from 'fs';
import { sitePaths } from '../src/data/sitePaths';

test('Sitemap Snapshot', () => {
  expect(sitePaths.join(', \n')).toMatchSnapshot();
});
