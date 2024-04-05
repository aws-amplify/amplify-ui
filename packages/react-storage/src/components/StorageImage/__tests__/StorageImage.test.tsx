import * as React from 'react';
import { render, waitFor } from '@testing-library/react';

import { StorageImage } from '../StorageImage';
import { StorageImageWithKey } from '../StorageImageWithKey';
import { StorageImageWithPath } from '../StorageImageWithPath';

describe('StorageImage', () => {
  const imgKey = 'test.jpg';
  const accessLevel = 'guest';

  it('should return StorageImageWithKey if key is provided', () => {
    const { container } = render(
      <>
        <StorageImage
          testId="test-id-1"
          alt="StorageImage"
          imgKey={imgKey}
          accessLevel={accessLevel}
        />
        <StorageImageWithKey
          testId="test-id-2"
          alt="StorageImage"
          imgKey={imgKey}
          accessLevel={accessLevel}
        />
      </>
    );
    const storageImageHTML = container.querySelector(
      '[data-testid="test-id-1"]'
    )?.innerHTML;
    const storageImageWithKeyHTML = container.querySelector(
      '[data-testid="test-id-2"]'
    )?.innerHTML;

    waitFor(() => {
      expect(storageImageHTML).toEqual(storageImageWithKeyHTML);
    });
  });

  it('should return StorageImageWithPath if path is provided', () => {
    const { container } = render(
      <>
        <StorageImage
          testId="test-id-1"
          alt="StorageImage"
          path={`${accessLevel}/${imgKey}`}
        />
        <StorageImageWithPath
          testId="test-id-2"
          alt="StorageImage"
          path={`${accessLevel}/${imgKey}`}
        />
      </>
    );
    const storageImageHTML = container.querySelector(
      '[data-testid="test-id-1"]'
    )?.innerHTML;
    const storageImageWithPathHTML = container.querySelector(
      '[data-testid="test-id-2"]'
    )?.innerHTML;

    waitFor(() => {
      expect(storageImageHTML).toEqual(storageImageWithPathHTML);
    });
  });
});
