import { useEffect } from 'react';
import { Linking } from 'react-native';

export const deepLinkHandler = (
  url: string | null | { url: string },
  shouldLog = true
) => {
  if (!url) {
    return;
  }

  if (shouldLog) {
    console.log('Detected url:', url);
  }
};

export default async function useDeepLinking(shouldLog = true): Promise<void> {
  useEffect(() => {
    Linking.addEventListener('url', deepLinkHandler);
  }, []);

  try {
    deepLinkHandler(await Linking.getInitialURL(), shouldLog);
  } catch (e) {
    console.log(`Cold boot deep link error: ${e}`);
  }
}
