import { RekognitionLiveness } from '@amzn/aws-rekognition-liveness-js-v2-client';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

export const handler = async (event, req) => {
  console.log({ req });
  console.log({ event });

  const client = new RekognitionLiveness({
    region: 'us-east-1',
    endpoint: `https://us-east-1.gamma.frontend.reventlov.rekognition.aws.dev`,
  });

  const response = await client
    .getFaceLivenessSessionResults({
      AwsAccountId: '845721723350',
      SessionId: event.pathParameters.sessionId,
    })
    .promise();

  const isLive = response.Confidence > 90;
  const auditImageBytes = Buffer.from(
    new Uint8Array(response.ReferenceImage?.Bytes)
  ).toString('base64');

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify({
      isLive,
      confidenceScore: response.Confidence,
      auditImageBytes: auditImageBytes,
    }),
  };
};
