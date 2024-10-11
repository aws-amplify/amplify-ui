const express = require('express');

const app = express();

app.use(express.json({ type: '*/*' }));

const server = app.listen(9091, '127.0.0.1', () => {
  console.log(
    `Running express server on '${JSON.stringify(server.address())}'`
  );
});

const userNotFoundErrorMessage = {
  __type: 'UserNotFoundException',
  message: 'Username/client id combination not found.',
  error: true,
};

const invalidCodeErrorMessage = {
  __type: 'CodeMismatchException',
  message: 'Invalid verification code provided, please try again.',
  error: true,
};

const buildMockResponse = (header, body) => {
  switch (header) {
    case 'AWSCognitoIdentityProviderService.InitiateAuth':
      if (body['AuthFlow'] === 'USER_SRP_AUTH') {
        return {
          ChallengeParameters: {
            USER_ID_FOR_SRP: 'test',
            SECRET_BLOCK: '••••-••-••-••-••••',
          },
        };
      } else {
        return {
          AuthenticationResult: {
            UserAttributes: [
              { Name: 'sub', Value: '••••-••-••-••-••••' },
              { Name: 'email_verified', Value: 'true' },
              { Name: 'email', Value: 'test@example.com' },
            ],
            Username: '••••-••-••-••-••••',
          },
        };
      }
    case 'AWSCognitoIdentityProviderService.RespondToAuthChallenge':
      return {
        AuthenticationResult: {
          AccessToken: '****',
          ExpiresIn: 3600,
          IdToken: '****',
          RefreshToken: '****',
          TokenType: 'Bearer',
          NewDeviceMetadata: {
            DeviceKey: '1234',
          },
        },
      };
    case 'AWSCognitoIdentityProviderService.ConfirmDevice':
      return {
        UserConfirmationNecessary: false,
      };
    case 'AWSCognitoIdentityProviderService.ConfirmSignUp':
      if (body['ConfirmationCode'] === '0000') {
        return invalidCodeErrorMessage;
      } else {
        return {};
      }
    case 'AWSCognitoIdentityProviderService.SignUp':
      return {
        CodeDeliveryDetails: {
          AttributeName: 'email',
          DeliveryMedium: 'EMAIL',
          Destination: 'a***@e***.com',
        },
        UserConfirmed: false,
        UserSub: '••••••-••••-••••-••••-•••••••••••••',
      };

    case 'AWSCognitoIdentityProviderService.ForgotPassword':
      if (body['Username'].includes('UNKNOWN')) {
        return userNotFoundErrorMessage;
      } else {
        return {};
      }
    default:
      return {};
  }
};

app.post('/', (req, res) => {
  const message = buildMockResponse(req.headers['x-amz-target'], req.body);
  res.status(message['error'] ? 400 : 200);
  res.send(message);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Trying to exit gracefully');
  server.close(() => {
    console.log('Express server closed. Asking process to exit.');
    process.exit();
  });
});
