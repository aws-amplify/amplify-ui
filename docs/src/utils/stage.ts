const PROD_STAGE_SITE_URL = 'https://ui.docs.amplify.aws';
const DEV_STAGE_SITE_URL = 'dev.ui.docs.amplify.aws';
const SITE_URL = process.env.SITE_URL || '';
export const IS_PROD_STAGE = SITE_URL === PROD_STAGE_SITE_URL;
// Dev Site url starts with "www" due to Algolia search, so we use `includes` to match it:
export const IS_DEV_STAGE = SITE_URL.includes(DEV_STAGE_SITE_URL);
export const IS_LOCAL = !IS_PROD_STAGE && !IS_DEV_STAGE;
