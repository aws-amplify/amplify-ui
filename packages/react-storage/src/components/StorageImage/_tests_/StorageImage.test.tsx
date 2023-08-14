import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Storage } from 'aws-amplify';
import { ComponentClassNames } from '@aws-amplify/ui-react';

import { StorageImage } from '../StorageImage';

describe('StorageImage', () => {
  const imgKey = 'test.jpg';
  const imgURL = 'https://amplify.s3.amazonaws.com/path/to/test.jpg';
  const fallbackSrc = 'https://amplify.s3.amazonaws.com/path/to/fallback.jpg';
  const errorMessage = '500 Internal Server Error';

  beforeAll(() => {
    jest.spyOn(Storage, 'get').mockResolvedValue(imgURL);
  });

  it('should render default classname', async () => {
    render(
      <StorageImage alt="StorageImage" imgKey={imgKey} accessLevel="public" />
    );

    const img = await screen.findByRole('img');
    expect(img).toHaveClass(ComponentClassNames.StorageImage);
  });

  it('should render custom classname', async () => {
    const className = 'MyImage';
    render(
      <StorageImage
        alt="StorageImage"
        className={className}
        imgKey={imgKey}
        accessLevel="public"
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
        accessLevel="public"
        onStorageGetError={onStorageError}
      />
    );

    const img = await screen.findByRole('img');
    expect(onStorageError).not.toHaveBeenCalled();
    expect(img).toHaveAttribute('src', imgURL);
  });

  it('should set image src attribute to fallbackSrc and invoke onGetStorageError when Storage.get is rejected', async () => {
    jest.restoreAllMocks();
    jest.spyOn(Storage, 'get').mockRejectedValue(errorMessage);
    const onStorageError = jest.fn();
    render(
      <StorageImage
        alt="StorageImage"
        imgKey={imgKey}
        accessLevel="public"
        fallbackSrc={fallbackSrc}
        onStorageGetError={onStorageError}
      />
    );

    const img = await screen.findByRole('img');
    expect(onStorageError).toHaveBeenCalledTimes(1);
    expect(onStorageError).toHaveBeenCalledWith(errorMessage);
    expect(img).toHaveAttribute('src', fallbackSrc);
  });
});
