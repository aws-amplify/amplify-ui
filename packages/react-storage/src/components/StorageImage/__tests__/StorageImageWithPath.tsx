import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import * as Storage from 'aws-amplify/storage';

import { ComponentClassName } from '@aws-amplify/ui';

import { StorageImage } from '../StorageImage';

describe('StorageImage', () => {
  const path = 'guest/test.jpg';
  const imgURL = 'https://amplify.s3.amazonaws.com/path/to/test.jpg';
  const errorMessage = '500 Internal Server Error';

  beforeAll(() => {
    jest.spyOn(Storage, 'getUrl').mockResolvedValue({
      url: new URL(imgURL),
      expiresAt: new Date(),
    });
  });

  it('should render default classname', async () => {
    render(<StorageImage alt="StorageImage" path={path} />);

    const img = await screen.findByRole('img');
    expect(img).toHaveClass(ComponentClassName.StorageImage);
  });

  it('should render custom classname', async () => {
    const className = 'MyImage';
    render(
      <StorageImage alt="StorageImage" className={className} path={path} />
    );

    const img = await screen.findByRole('img');
    expect(img).toHaveClass(className);
  });

  it('should get the presigned URL and pass it to image src attribute', async () => {
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

  it('should invoke onGetStorageError when Storage.get is rejected', async () => {
    jest.restoreAllMocks();
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
      expect(onGetUrlError).toHaveBeenCalledTimes(1);
      expect(onGetUrlError).toHaveBeenCalledWith(errorMessage);
    });
  });
});
