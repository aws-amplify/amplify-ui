import { getRekognitionClient } from './rekognition';

export default async function handler(req, res) {
  const rekognition = await getRekognitionClient();
  const response = await rekognition
    .getLivenessDetection({
      SessionId: req.query.sessionId,
    })
    .promise();

  const isLive = response.LivenessSession.LivenessConfidence > 90;
  const auditImageBytes = response.LivenessSession.AuditImage?.Bytes;

  res.status(200).json({
    isLive,
    auditImageBytes,
  });
}
