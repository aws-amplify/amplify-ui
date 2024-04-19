import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';

import { ComponentClassName } from '@aws-amplify/ui';

import { StorageImage } from '../StorageImage';

describe('StorageImage', () => {
  const imgKey = 'test.jpg';
  const path = 'guest/test.jpg';
  const imgURL = 'https://amplify.s3.amazonaws.com/path/to/test.jpg';
  const fallbackSrc = 'https://amplify.s3.amazonaws.com/path/to/fallback.jpg';
  const errorMessage = '500 Internal Server Error';
  const accessLevel = 'guest';

  beforeEach(() => {
    jest.spyOn(Storage, 'getUrl').mockResolvedValue({
      url: new URL(imgURL),
      expiresAt: new Date(),
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render default classname', async () => {
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

  it('should render custom classname', async () => {
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
    // jest.restoreAllMocks();
    const onGetUrlError = jest.fn();
    expect(() =>
      render(
        <StorageImage
          alt="StorageImage"
          path={path}
          // @ts-expect-error testing invalid input
          imgKey={imgKey}
          onGetUrlError={onGetUrlError}
        />
      )
    ).toThrow('StorageImage cannot have both imgKey and path props.');
  });

  describe('with `imgKey`', () => {
    it('should get the presigned URL and pass it to image src attribute', async () => {
      const onStorageError = jest.fn();
      render(
        <StorageImage
          alt="StorageImage"
          imgKey={imgKey}
          accessLevel={accessLevel}
          onStorageGetError={onStorageError}
        />
      );

      const img = await screen.findByRole('img');
      expect(onStorageError).not.toHaveBeenCalled();
      expect(img).toHaveAttribute('src', imgURL);
    });

    it('should set image src attribute to fallbackSrc and invoke onGetStorageError when Storage getUrl is rejected', async () => {
      // jest.restoreAllMocks();
      jest.spyOn(Storage, 'getUrl').mockRejectedValue(errorMessage);
      const onStorageError = jest.fn();
      render(
        <StorageImage
          alt="StorageImage"
          imgKey={imgKey}
          accessLevel={accessLevel}
          fallbackSrc={fallbackSrc}
          onStorageGetError={onStorageError}
        />
      );
      await waitFor(() => {
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', fallbackSrc);

        expect(onStorageError).toHaveBeenCalledTimes(1);
        expect(onStorageError).toHaveBeenCalledWith(errorMessage);
      });
    });
  });

  describe('with `path`', () => {
    it('should get the presigned URL and pass it to image src attribute', async () => {
      // jest.restoreAllMocks();
      const onGetUrlError = jest.fn();
      render(
        <StorageImage
          alt="StorageImage"
          path={path}
          onGetUrlError={onGetUrlError}
        />
      );

      const img = await screen.findByRole('img');
      expect(onGetUrlError).not.toHaveBeenCalled();
      expect(img).toHaveAttribute('src', imgURL);
    });

    it('should set image src attribute to fallbackSrc and invoke onGetUrlError when Storage getUrl is rejected', async () => {
      jest.spyOn(Storage, 'getUrl').mockRejectedValue(errorMessage);
      const onGetUrlError = jest.fn();
      render(
        <StorageImage
          alt="StorageImage"
          path={path}
          onGetUrlError={onGetUrlError}
        />
      );
      await waitFor(() => {
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', undefined);

        expect(onGetUrlError).toHaveBeenCalledTimes(1);
        expect(onGetUrlError).toHaveBeenCalledWith(errorMessage);
      });
    });
  });
});
