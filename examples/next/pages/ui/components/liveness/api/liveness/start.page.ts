import { getRekognitionClient } from './rekognition';

export default async function handler(req, res) {
  const rekognition = await getRekognitionClient();
  const response = await rekognition.startLivenessDetection().promise();

  res.status(200).json({
    sessionId: response.SessionId,
    clientActionDocument: response.ClientActionDocument,
  });
}
