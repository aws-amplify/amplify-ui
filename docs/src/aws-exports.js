/**
 * The following awsExports object contains fake user pool id and web client id values
 * which do not translate to any actual aws user information. The purpose of this awsExports
 * object is to mock Amplify.configure() and remove the Auth config erros from the console.
 */
export const awsExports = {
  aws_user_pools_id: 'xx-xxxx-x_xxxxx', // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: 'xxxxxxxxxxxxxx', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
};
export default awsExports;
