import React from 'react';
import { render } from '@testing-library/react-native';

import { ThemeProvider } from '../ThemeProvider';
import { Label } from '../../primitives';

const labelText = 'The answer is 42';
const App = () => {
  return <Label>{labelText}</Label>;
};

describe('ThemeProvider', () => {
  it('renders without props', () => {
    const { getByText } = render(
      <ThemeProvider>
        <App />
      </ThemeProvider>
    );

    const label = getByText(labelText);
    expect(label).toBeDefined();
  });
});
