import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import Button from '../Button';

const labelText = 'A pressable button';

describe('Button', () => {
  it('renders as expected with a string passed as children', () => {
    const { toJSON, findByText, getByRole } = render(
      <Button>{labelText}</Button>
    );
    expect(toJSON()).toMatchSnapshot();

    const button = getByRole('button');
    expect(button).toBeDefined();
    const label = findByText(labelText);
    expect(label).toBeDefined();
  });

  it('renders as expected with a component passed as children', () => {
    const { toJSON, findByText, getByRole } = render(
      <Button>
        <Text>{labelText}</Text>
      </Button>
    );
    expect(toJSON()).toMatchSnapshot();

    const button = getByRole('button');
    expect(button).toBeDefined();
    const label = findByText(labelText);
    expect(label).toBeDefined();
  });
});
