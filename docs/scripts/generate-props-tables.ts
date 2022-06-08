import { getCatalog } from './util/getCatalog';

const catalog = getCatalog();

console.log(' 🐻 catalog: ', JSON.stringify(getCatalog(), null, 2));
