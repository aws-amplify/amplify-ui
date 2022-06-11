import { getContentPaths } from '@/utils/getContentPaths';
import { getPagesManifest } from '@/utils/getPagesManifest';
import { getPageFromSlug } from '@/utils/getPageFromSlug';
import preval from 'next-plugin-preval';
import { META_INFO } from './meta';

export default preval(
  getPagesManifest(getContentPaths, getPageFromSlug, META_INFO)
);
