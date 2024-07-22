import React from 'react';
import { render } from '@testing-library/react';

import { ControlProvider } from '../../../context/controls';

import { NavigateControl } from '../Navigate';

describe('NavigateControl', () => {
  it('renders a `NavigateControl`', () => {
    expect(
      render(
        <ControlProvider>
          <NavigateControl />
        </ControlProvider>
      ).container
    ).toBeDefined();
  });
});
