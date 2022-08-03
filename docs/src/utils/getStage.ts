enum STAGE {
  LOCAL = 'local',
  DEV = 'dev',
  PROD = 'prod',
}

export const getStage = () => {
  const url = process.env.SITE_URL;
  if (url === 'https://ui.docs.amplify.aws') {
    return STAGE.PROD;
  } else if (url.includes('dev.ui.docs.amplify.aws')) {
    return STAGE.DEV;
  }
  return STAGE.LOCAL;
};
