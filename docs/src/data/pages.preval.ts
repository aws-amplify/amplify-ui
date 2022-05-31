import { getPagesManifest } from '@/utils/getPagesManifest';
import preval from 'next-plugin-preval';

export default preval(getPagesManifest());
