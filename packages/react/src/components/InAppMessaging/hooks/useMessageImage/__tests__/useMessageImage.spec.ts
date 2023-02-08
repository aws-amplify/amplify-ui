import { renderHook } from '@testing-library/react-hooks';
import { ConsoleLogger as Logger } from '@aws-amplify/core';

import useMessageImage from '../useMessageImage';

type ImageConstructor = new (
  width?: number | undefined,
  height?: number | undefined
) => HTMLImageElement;

// use empty mockImplementation to turn off console output
const errorSpy = jest.spyOn(Logger.prototype, 'error').mockImplementation();

const src = 'https://test.jpeg';
const image = { src };

describe('useMessageImage', () => {
  const original = global.Image;
  afterAll(() => {
    // restore Image
    global.Image = original;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles loading an image in the happy path as expected', async () => {
    // set Image to mock succesful load
    global.Image = class {
      onload = jest.fn();
      constructor() {
        setTimeout(() => {
          this.onload();
        });
      }
    } as unknown as ImageConstructor;

    const { result, waitForNextUpdate } = renderHook(() =>
      useMessageImage(image)
    );

    expect(result.current.hasRenderableImage).toBe(false);
    expect(result.current.isImageFetching).toBe(true);

    await waitForNextUpdate();

    expect(result.current.hasRenderableImage).toBe(true);
    expect(result.current.isImageFetching).toBe(false);
  });

  it('handles an image load error event as expected', async () => {
    // set Image to mock error
    global.Image = class {
      onerror = jest.fn();
      constructor() {
        setTimeout(() => {
          this.onerror();
        });
      }
    } as unknown as ImageConstructor;

    const { result, waitForNextUpdate } = renderHook(() =>
      useMessageImage(image)
    );

    expect(result.current.hasRenderableImage).toBe(false);
    expect(result.current.isImageFetching).toBe(true);

    await waitForNextUpdate();

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(`Image failed to load: ${src}`);
    expect(result.current.hasRenderableImage).toBe(false);
    expect(result.current.isImageFetching).toBe(false);
  });

  it('handles an image load abort event as expected', async () => {
    // set Image to mock abort
    global.Image = class {
      onabort = jest.fn();
      constructor() {
        setTimeout(() => {
          this.onabort();
        });
      }
    } as unknown as ImageConstructor;

    const { result, waitForNextUpdate } = renderHook(() =>
      useMessageImage(image)
    );

    expect(result.current.hasRenderableImage).toBe(false);
    expect(result.current.isImageFetching).toBe(true);

    await waitForNextUpdate();

    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledWith(`Image load aborted: ${src}`);
    expect(result.current.hasRenderableImage).toBe(false);
    expect(result.current.isImageFetching).toBe(false);
  });

  it('handles an undefined argument as expected', () => {
    global.Image = class {
      constructor() {
        // false assertion to test that image constructor was never even called
        expect(false).toBe(true);
      }
    } as unknown as ImageConstructor;

    const { result } = renderHook(() => useMessageImage(undefined));

    expect(result.current.hasRenderableImage).toBe(false);
    expect(result.current.isImageFetching).toBe(false);
  });
});
