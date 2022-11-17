import { Image } from 'react-native';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import {
  BANNER_IMAGE_SCREEN_MULTIPLIER,
  BANNER_IMAGE_SCREEN_SIZE,
} from '../constants';
import { getLayoutImageDimensions, prefetchNetworkImage } from '../utils';

jest.mock('react-native', () => ({
  Dimensions: { get: jest.fn(() => ({ height: 844, width: 400 })) },
  Image: { prefetch: jest.fn() },
}));

// use empty mockImplementation to turn off console output
const errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();

const url = 'https://test.jpeg';

describe('prefetchNetworkImage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('behaves as expected in the happy path', async () => {
    (Image.prefetch as jest.Mock).mockResolvedValueOnce(true);

    const output = await prefetchNetworkImage(url);

    expect(output).toBe('loaded');
  });

  it('handles a false response from Image.prefetch as expected', async () => {
    (Image.prefetch as jest.Mock).mockResolvedValueOnce(false);

    const output = await prefetchNetworkImage(url);

    expect(errorSpy).toHaveBeenLastCalledWith(`Image failed to load: ${url}`);
    expect(errorSpy).toHaveBeenCalledTimes(1);

    expect(output).toBe('failed');
  });

  it('handles an error from Imaage.prefetch as expected', async () => {
    const error = 'ERROR';
    (Image.prefetch as jest.Mock).mockRejectedValueOnce(new Error(error));

    const output = await prefetchNetworkImage(url);

    expect(errorSpy).toHaveBeenLastCalledWith(
      `Image.prefetch failed: Error: ${error}`
    );
    expect(errorSpy).toHaveBeenCalledTimes(1);

    expect(output).toBe('failed');
  });
});

describe('getLayoutImageDimensions', () => {
  it('returns the expected values for a square image', () => {
    const imageHeight = 100;
    const imageWidth = 100;

    const output = getLayoutImageDimensions(
      imageHeight,
      imageWidth,
      'TOP_BANNER'
    );

    expect(output).toStrictEqual({
      height: BANNER_IMAGE_SCREEN_SIZE,
      width: BANNER_IMAGE_SCREEN_SIZE,
    });
  });

  it('returns the expected values for a portrait image', () => {
    const imageHeight = 200;
    const imageWidth = 100;

    const output = getLayoutImageDimensions(
      imageHeight,
      imageWidth,
      'TOP_BANNER'
    );

    expect(output).toStrictEqual({
      height: BANNER_IMAGE_SCREEN_SIZE,
      width: imageHeight * BANNER_IMAGE_SCREEN_MULTIPLIER,
    });
  });

  it('returns the expected values for a landscape image', () => {
    const imageHeight = 100;
    const imageWidth = 200;

    const output = getLayoutImageDimensions(
      imageHeight,
      imageWidth,
      'TOP_BANNER'
    );

    expect(output).toStrictEqual({
      height: imageWidth * BANNER_IMAGE_SCREEN_MULTIPLIER,
      width: BANNER_IMAGE_SCREEN_SIZE,
    });
  });
});
