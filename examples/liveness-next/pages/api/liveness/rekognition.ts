import { Amplify, withSSRContext } from 'aws-amplify';
import RekognitionLiveness from 'aws-sdk-liveness/clients/rekognitionliveness';
import awsExports from '@environments/liveness/src/aws-exports';

Amplify.configure({ ...awsExports, ssr: true });

export async function getRekognitionClient() {
  const { Credentials } = withSSRContext();

  const credentials = await Credentials.get();
  const rekognitionClient = new RekognitionLiveness({
    region: 'us-west-2',
    credentials,
    endpoint: 'https://us-west-2.beta.reventlov.rekognition.aws.dev/',
  });

  return rekognitionClient;
}
