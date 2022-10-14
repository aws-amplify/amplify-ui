import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { Text } from 'react-native';

import Button from '../Button';

const labelText = 'A pressable button';

const onPress = jest.fn();

describe('Button', () => {
  beforeEach(() => {
    onPress.mockClear();
  });

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

  it('calls the expected handler when pressed', () => {
    const { getByRole } = render(
      <Button onPress={onPress}>{labelText}</Button>
    );
    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders as expected when disabled', () => {
    const { toJSON, getByRole } = render(<Button disabled>{labelText}</Button>);
    expect(toJSON()).toMatchSnapshot();

    const button = getByRole('button');
    expect(button.props.accessibilityState).toHaveProperty('disabled', true);
  });

  it('does nothing when disabled', () => {
    const { getByRole } = render(
      <Button disabled onPress={onPress}>
        {labelText}
      </Button>
    );
    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPress).not.toHaveBeenCalled();
  });
});
