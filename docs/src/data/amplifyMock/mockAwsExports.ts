/**
 * The following `awsExports` contains fake user pool id and web client id values and are not
 * tied to an actual `Amplify` app.
 *
 * Usage of this `awsExports` is to allow `Amplify.configure` to run without error, ultimately
 * preventing `Auth` related errors from being logged to the console by the `Authenticator`
 * examples.
 */
export const awsExports = {
  aws_user_pools_id: 'xx-xxxx-x_xxxxx', // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: 'xxxxxxxxxxxxxx', // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
};
