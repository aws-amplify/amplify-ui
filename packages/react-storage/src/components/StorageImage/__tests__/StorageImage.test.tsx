import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';

import { ComponentClassName } from '@aws-amplify/ui';

import { StorageImage } from '../StorageImage';

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

    warnSpy.mockImplementation(() => {});
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

  it('should throw an error if both `imgKey` and `path` props are passed in', () => {
    errorSpy.mockImplementation(() => {});

    expect(() =>
      render(
        // @ts-expect-error testing invalid input
        <StorageImage
          alt="StorageImage"
          path={path}
          imgKey={imgKey}
          onGetUrlError={onError}
        />
      )
    ).toThrow('StorageImage cannot have both imgKey and path props.');
  });

  it('should show console warning if `imgKey` prop is passed in', () => {
    warnSpy.mockImplementation(() => {});
    const { rerender } = render(
      <StorageImage alt="StorageImage" path={path} onGetUrlError={onError} />
    );

    expect(warnSpy).toHaveBeenCalledTimes(0);

    rerender(
      <StorageImage
        alt="StorageImage"
        accessLevel={accessLevel}
        imgKey={imgKey}
        onGetUrlError={onError}
      />
    );

    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledWith(
      'The `imgKey` prop has been deprecated and will be removed in the next major version of Amplify UI.'
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
        options: expect.objectContaining({
          validateObjectExistence: true,
        }),
      })
    );
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
