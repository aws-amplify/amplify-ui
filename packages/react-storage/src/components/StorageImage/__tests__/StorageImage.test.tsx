import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';

import { ComponentClassName } from '@aws-amplify/ui';

import {
  MISSING_REQUIRED_PROP_MESSAGE,
  HAS_DEPRECATED_PROPS_MESSAGE,
  HAS_PATH_AND_KEY_MESSAGE,
  HAS_PATH_AND_UNSUPPORTED_OPTIONS_MESSAGE,
  StorageImage,
} from '../StorageImage';

const imgKey = 'test.jpg';
const path = 'guest/test.jpg';
const imgURL = 'https://amplify.s3.amazonaws.com/path/to/test.jpg';
const fallbackSrc = 'https://amplify.s3.amazonaws.com/path/to/fallback.jpg';
const errorMessage = '500 Internal Server Error';
const accessLevel = 'guest';

const onError = jest.fn();
const getUrlSpy = jest.spyOn(Storage, 'getUrl');
const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
const errorSpy = jest.spyOn(console, 'error').mockImplementation();

describe('StorageImage', () => {
  beforeEach(() => {
    getUrlSpy.mockClear();
    warnSpy.mockClear();
    onError.mockClear();
    errorSpy.mockClear();
  });

  it('should render default className', async () => {
    render(
      <StorageImage
        alt="StorageImage"
        imgKey={imgKey}
        accessLevel={accessLevel}
      />
    );

    const img = await screen.findByRole('img');
    expect(img).toHaveClass(ComponentClassName.StorageImage);
  });

  it('should render custom className', async () => {
    const className = 'MyImage';
    render(
      <StorageImage
        alt="StorageImage"
        className={className}
        imgKey={imgKey}
        accessLevel={accessLevel}
      />
    );

    const img = await screen.findByRole('img');
    expect(img).toHaveClass(className);
  });

  it('should throw an error if neither `imgKey` or `path` props are provided', () => {
    expect(() =>
      render(
        // @ts-expect-error force invalid input
        <StorageImage alt="StorageImage" onGetUrlError={onError} />
      )
    ).toThrow(MISSING_REQUIRED_PROP_MESSAGE);
  });

  it('should show a console warning if both `imgKey` and `path` props are provided', () => {
    const { rerender } = render(
      <StorageImage alt="StorageImage" path={path} onGetUrlError={onError} />
    );

    expect(warnSpy).toHaveBeenCalledTimes(0);

    rerender(
      // @ts-expect-error force invalid input
      <StorageImage
        alt="StorageImage"
        imgKey={imgKey}
        path={path}
        onGetUrlError={onError}
      />
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(HAS_PATH_AND_KEY_MESSAGE);
  });

  it('should show a console warning if a `imgKey` prop is provided', () => {
    render(
      // @ts-expect-error force invalid input
      <StorageImage
        alt="StorageImage"
        imgKey={imgKey}
        onGetUrlError={onError}
      />
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(HAS_DEPRECATED_PROPS_MESSAGE);
  });

  it('should show a console warning if a `accessLevel` prop is provided', () => {
    render(
      <StorageImage
        alt="StorageImage"
        imgKey={imgKey}
        accessLevel={accessLevel}
        onGetUrlError={onError}
      />
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(HAS_DEPRECATED_PROPS_MESSAGE);
  });

  it('should show a console warning if a `identityId` prop is provided', () => {
    render(
      // @ts-expect-error force invalid input
      <StorageImage
        alt="StorageImage"
        imgKey={imgKey}
        identityId="identity"
        onGetUrlError={onError}
      />
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(HAS_DEPRECATED_PROPS_MESSAGE);
  });

  it('should show a console warning if a `path` prop is provided with a deprecated prop', () => {
    render(
      // @ts-expect-error force invalid input
      <StorageImage
        alt="StorageImage"
        path={path}
        identityId="identity"
        onGetUrlError={onError}
      />
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      HAS_PATH_AND_UNSUPPORTED_OPTIONS_MESSAGE
    );
  });

  it('should validateObjectExistence by default', () => {
    getUrlSpy.mockResolvedValue({
      url: new URL(imgURL),
      expiresAt: new Date(),
    });
    render(
      <StorageImage
        alt="StorageImage"
        imgKey={imgKey}
        accessLevel={accessLevel}
      />
    );

    expect(getUrlSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({ validateObjectExistence: true }),
      })
    );
  });

  it('should pass bucket to getUrl when supplied', () => {
    getUrlSpy.mockResolvedValue({
      url: new URL(imgURL),
      expiresAt: new Date(),
    });
    render(<StorageImage alt="StorageImage" bucket="my-bucket" path={path} />);

    expect(getUrlSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        options: expect.objectContaining({ bucket: 'my-bucket' }),
      })
    );
  });

  it('should render loadingElement when isLoading(from useGetUrl) is true', async () => {
    const loadingElement = <div>Loading...</div>;
    getUrlSpy.mockReturnValue(new Promise(() => {}));

    render(
      <StorageImage
        alt="StorageImage"
        path={path}
        loadingElement={loadingElement}
      />
    );

    const loadingDiv = await screen.findByText('Loading...');
    expect(loadingDiv).toBeInTheDocument();
  });

  it('should render null when isLoading is true and no loadingElement is provided', () => {
    getUrlSpy.mockReturnValue(new Promise(() => {}));
    const { container } = render(
      <StorageImage alt="StorageImage" path={path} />
    );

    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
    expect(container.firstChild).toBeNull();
  });

  describe('with `imgKey`', () => {
    it('should get the presigned URL and pass it to image src attribute', async () => {
      getUrlSpy.mockResolvedValue({
        url: new URL(imgURL),
        expiresAt: new Date(),
      });
      render(
        <StorageImage
          alt="StorageImage"
          imgKey={imgKey}
          accessLevel={accessLevel}
          onStorageGetError={onError}
        />
      );

      const img = await screen.findByRole('img');
      expect(onError).not.toHaveBeenCalled();
      expect(img).toHaveAttribute('src', imgURL);
    });

    it('should set image src attribute to fallbackSrc and invoke onGetStorageError when Storage getUrl is rejected', async () => {
      getUrlSpy.mockRejectedValue(errorMessage);
      render(
        <StorageImage
          alt="StorageImage"
          imgKey={imgKey}
          accessLevel={accessLevel}
          fallbackSrc={fallbackSrc}
          onStorageGetError={onError}
        />
      );
      await waitFor(() => {
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', fallbackSrc);

        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(errorMessage);
      });
    });

    it('should not set image src when Storage getUrl is rejected and no fallbackSrc is specified', async () => {
      getUrlSpy.mockRejectedValue(errorMessage);
      render(
        <StorageImage
          alt="StorageImage"
          imgKey={imgKey}
          accessLevel={accessLevel}
          onStorageGetError={onError}
        />
      );
      await waitFor(() => {
        const img = screen.getByRole('img');
        expect(img).not.toHaveAttribute('src');

        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(errorMessage);
      });
    });
  });

  describe('with `path`', () => {
    it('should get the presigned URL and pass it to image src attribute', async () => {
      getUrlSpy.mockResolvedValue({
        url: new URL(imgURL),
        expiresAt: new Date(),
      });
      render(
        <StorageImage alt="StorageImage" path={path} onGetUrlError={onError} />
      );

      const img = await screen.findByRole('img');
      expect(onError).not.toHaveBeenCalled();
      expect(img).toHaveAttribute('src', imgURL);
    });

    it('should set image src attribute to fallbackSrc and invoke onGetUrlError when Storage getUrl is rejected', async () => {
      getUrlSpy.mockRejectedValue(errorMessage);
      render(
        <StorageImage
          alt="StorageImage"
          path={path}
          fallbackSrc={fallbackSrc}
          onGetUrlError={onError}
        />
      );
      await waitFor(() => {
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', fallbackSrc);

        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(errorMessage);
      });
    });

    it('should not set image src when Storage getUrl is rejected and no fallbackSrc is specified', async () => {
      getUrlSpy.mockRejectedValue(errorMessage);
      render(
        <StorageImage alt="StorageImage" path={path} onGetUrlError={onError} />
      );
      await waitFor(() => {
        const img = screen.getByRole('img');
        expect(img).not.toHaveAttribute('src');

        expect(onError).toHaveBeenCalledTimes(1);
        expect(onError).toHaveBeenCalledWith(errorMessage);
      });
    });
  });
});
