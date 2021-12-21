import { Credentials, getAmplifyUserAgent } from '@aws-amplify/core';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import RekognitionLiveness from 'aws-sdk-liveness/clients/rekognitionliveness';

export interface PutLivenessVideoInput {
  sessionId: string;
  videoBlob: Blob;
  livenessActionDocument: string;
}

export interface PutLivenessVideoOutput {
  sessionId: string;
}

export class LivenessPredictionsProvider extends AmazonAIInterpretPredictionsProvider {
  constructor() {
    super();
  }

  async putLivenessVideo(
    input: PutLivenessVideoInput
  ): Promise<PutLivenessVideoOutput> {
    const credentials = await Credentials.get();
    if (!credentials) {
      throw new Error('No credentials');
    }

    const rekognitionClient = new RekognitionLiveness({
      // TODO: remove hardcoded region and endpoint
      region: 'us-east-1',
      credentials,
      customUserAgent: getAmplifyUserAgent(),
      endpoint: 'https://us-east-1.gamma.reventlov.rekognition.aws.dev/',
      maxRetries: 0, // TODO: revisit once appropriate retry exceptions are added in the service
    });

    await rekognitionClient
      .putLivenessVideo({
        SessionId: input.sessionId,
        Video: input.videoBlob,
        LivenessActionDocument: input.livenessActionDocument,
      })
      .promise();

    return {
      sessionId: input.sessionId,
    };
  }
}
