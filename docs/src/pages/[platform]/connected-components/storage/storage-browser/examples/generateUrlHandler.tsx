import { ActionHandler } from '@aws-amplify/ui-react-storage/browser';

type GenerateLink = ActionHandler<
  { duration: number; fileKey: string },
  { link: string }
>;

export const generateUrlHandler: GenerateLink = ({ data }) => {
  const asyncExecution = async () => {
    try {
      console.log('get url', data.key);
      const result = {
        status: 'COMPLETE' as const,
        value: {
          link: URL.createObjectURL(new Blob([`mock file for ${data.key}`])),
        },
      };
      return result;
    } catch (error) {
      const message = 'Unable to generate link';
      return {
        status: 'FAILED' as const,
        message,
        error,
      };
    }
  };

  return { result: asyncExecution() };
};
