import {
  RekognitionClient,
  CreateFaceLivenessSessionCommand,
} from '@aws-sdk/client-rekognition';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, req) => {
  const client = new RekognitionClient({ region: 'us-east-1' });
  const command = new CreateFaceLivenessSessionCommand({});
  const response = await client.send(command);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Expose-Headers': 'Date',
    },
    body: JSON.stringify({ sessionId: response.SessionId }),
  };
};
