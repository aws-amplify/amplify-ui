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
      region: 'us-west-2',
      credentials,
      customUserAgent: getAmplifyUserAgent(),
      endpoint: 'https://us-west-2.beta.reventlov.rekognition.aws.dev/',
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
