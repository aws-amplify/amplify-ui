import { DEFAULT_RETRY_DELAY_BASE, MAXIMUM_RETRY_DELAY } from './constants';

interface RetryConfig {
  retries?: number;

  MAX_RETRIES?: number;
}

const computeNextBackoffDelay = (retries: number) => {
  return Math.floor(
    Math.min(
      MAXIMUM_RETRY_DELAY,
      // Exponential backoff
      Math.random() * 2 ** retries * DEFAULT_RETRY_DELAY_BASE
    )
  );
};

const wait = (retries: number) => {
  const delay = computeNextBackoffDelay(retries);
  return new Promise((resolve) => setTimeout(resolve, delay));
};

export const LoadWithRetries = async <T>(
  load: () => Promise<T>,
  retryConfig: RetryConfig = {}
): Promise<T> => {
  const { retries = 0, MAX_RETRIES = 3 } = retryConfig;

  try {
    return await load();
  } catch (error) {
    if (retries >= MAX_RETRIES) {
      throw new Error('Maximum retries exceeded. Stop calling the API.');
    }

    await wait(retries);

    return LoadWithRetries(load, { ...retryConfig, retries: retries + 1 });
  }
};
