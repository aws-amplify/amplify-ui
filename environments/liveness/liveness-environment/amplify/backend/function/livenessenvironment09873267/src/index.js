import {
  RekognitionClient,
  GetFaceLivenessSessionResultsCommand,
} from '@aws-sdk/client-rekognition';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, req) => {
  console.log({ req });
  console.log({ event });

  const client = new RekognitionClient({ region: 'us-east-1' });
  const command = new GetFaceLivenessSessionResultsCommand({
    SessionId: event.pathParameters.sessionId,
  });
  const response = await client.send(command);

  const isLive = response.Confidence > 90;

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({
      isLive,
      confidenceScore: response.Confidence,
      auditImageBytes: response.ReferenceImage.Bytes,
    }),
  };
};
