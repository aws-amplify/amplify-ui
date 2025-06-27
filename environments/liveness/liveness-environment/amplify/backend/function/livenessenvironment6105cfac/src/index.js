import { RekognitionLiveness } from '@amzn/aws-rekognition-liveness-js-v2-client';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, req) => {
  const client = new RekognitionLiveness({
    region: 'us-east-1',
    endpoint: `https://us-east-1.gamma.frontend.reventlov.rekognition.aws.dev`,
  });

  const challengeType =
    event.queryStringParameters?.challengeType ??
    'FaceMovementAndLightChallenge';

  const response = await client
    .createFaceLivenessSession({
      AwsAccountId: '845721723350',
      Settings: {
        ChallengePreferences: [{ Type: challengeType }],
      },
    })
    .promise();

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({ sessionId: response.SessionId }),
  };
};
