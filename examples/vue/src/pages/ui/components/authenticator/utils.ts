export const importHelper = async (envName: string) => {
  return import.meta.env.VITE_VERSION === 'gen1'
    ? (
        await import(
          `../../../../../../../environments/auth/${envName}/src/aws-exports.js`
        )
      ).default
    : (
        await import(
          `../../../../../../../environments/auth/${envName}/amplify_outputs.json`
        )
      ).default;
};
