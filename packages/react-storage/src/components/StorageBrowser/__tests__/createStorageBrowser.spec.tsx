import React from 'react';
import { render } from '@testing-library/react';
import createStorageBrowser from '../createStorageBrowser';

describe('createStorageBrowser', () => {
  it('returns a StorageBrowser', async () => {
    const { StorageBrowser } = createStorageBrowser();

    expect(
      await render(<StorageBrowser />).findByText('Hello World!')
    ).toBeDefined();
  });
});
