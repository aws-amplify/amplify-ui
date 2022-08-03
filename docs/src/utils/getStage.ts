export const getStage = () => {
  const url = process.env.SITE_URL;
  if (url === 'https://ui.docs.amplify.aws') {
    return 'prod';
  } else if (url.includes('dev.ui.docs.amplify.aws')) {
    return 'dev';
  }
  return 'test';
};
