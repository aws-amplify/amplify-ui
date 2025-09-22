import {
  RekognitionClient,
  CreateFaceLivenessSessionCommand,
} from '@aws-sdk/client-rekognition';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, req) => {
  const client = new RekognitionClient({ region: 'us-east-1' });

  const challengeType =
    event.queryStringParameters?.challengeType ??
    'FaceMovementAndLightChallenge';

  const command = new CreateFaceLivenessSessionCommand({
    Settings: {
      ChallengePreferences: [
        {
          Type: challengeType,
        },
      ],
    },
  });

  const response = await client.send(command);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({ sessionId: response.SessionId }),
  };
};
