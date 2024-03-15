import { RekognitionLiveness } from '@amzn/aws-rekognition-liveness-js-v2-client';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, req) => {
  const client = new RekognitionLiveness({
    region: 'us-west-2',
    endpoint: `https://alankrp-moa.dev.frontend.reventlov.rekognition.aws.dev`,
  });

  const response = await client
    .createFaceLivenessSession({
      AwsAccountId: '432113413711',
      Settings: {
        ChallengePreferenceList: [
          { Type: 'FaceMovementChallenge' },
          { Type: 'FaceMovementAndLightChallenge' },
        ],
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
