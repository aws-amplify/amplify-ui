import { Credentials, getAmplifyUserAgent } from '@aws-amplify/core';
import { AmazonAIInterpretPredictionsProvider } from '@aws-amplify/predictions';
import RekognitionLiveness from 'aws-sdk-liveness/clients/rekognitionliveness';

export interface PutLivenessVideoInput {
  sessionId: string;
  videoBlob: Blob;
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

    // TODO: remove try/catch
    try {
      await rekognitionClient
        .putLivenessVideo({
          SessionId: input.sessionId,
          Video: input.videoBlob,
          LivenessActionDocument: 'placeholder',
        })
        .promise();
    } catch (err) {
      console.log({ err });
    }

    return {
      sessionId: input.sessionId,
    };
  }
}
