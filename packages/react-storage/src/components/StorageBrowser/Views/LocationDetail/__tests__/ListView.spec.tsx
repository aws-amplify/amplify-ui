import React from 'react';
import { render } from '@testing-library/react';
import { ListView } from '../ListView';

describe('ListView', () => {
  it('renders a `ListView`', () => {
    expect(render(<ListView />).container).toBeDefined();
  });
});
