import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';

import { ComponentClassName } from '@aws-amplify/ui';

import { StorageImage } from '../StorageImage';

describe('StorageImage', () => {
  const imgKey = 'test.jpg';
  const imgURL = 'https://amplify.s3.amazonaws.com/path/to/test.jpg';
  const fallbackSrc = 'https://amplify.s3.amazonaws.com/path/to/fallback.jpg';
  const errorMessage = '500 Internal Server Error';
  const accessLevel = 'guest';

  beforeAll(() => {
    jest.spyOn(Storage, 'getUrl').mockResolvedValue({
      url: new URL(imgURL),
      expiresAt: new Date(),
    });
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

  it('should set image src attribute to fallbackSrc and invoke onGetStorageError when Storage.get is rejected', async () => {
    jest.restoreAllMocks();
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
