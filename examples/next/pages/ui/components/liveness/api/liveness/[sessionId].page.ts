import { getRekognitionClient } from './rekognition';

export default async function handler(req, res) {
  const rekognition = await getRekognitionClient();
  const response = await rekognition
    .getLivenessDetection({
      SessionId: req.query.sessionId,
    })
    .promise();

  const confidenceScore = response.LivenessSession.LivenessConfidence;
  const isLive = confidenceScore >= 90;
  const auditImageBytes =
    response.LivenessSession.AuditImages?.[0]?.Bytes?.toString('base64');

  res.status(200).json({
    isLive,
    confidenceScore,
    auditImageBytes,
  });
}
