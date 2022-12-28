import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { getThemedStyles } from '../styles';
import Button from '../Button';

const labelText = 'A pressable button';
const Title = () => <Text>{labelText}</Text>;

describe('Button', () => {
  it('renders as expected with a string passed as children', () => {
    const { toJSON, getByRole, getByText } = render(
      <Button>{labelText}</Button>
    );

    expect(getByRole('button')).toBeDefined();
    expect(getByText(labelText)).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with a component passed as children', () => {
    const { toJSON, getByRole, getByText } = render(
      <Button>
        <Title />
      </Button>
    );

    expect(getByRole('button')).toBeDefined();
    expect(getByText(labelText)).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles an onPress callback', () => {
    const onPressMock = jest.fn();

    const { getByRole } = render(
      <Button onPress={onPressMock}>{labelText}</Button>
    );

    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('handles disabled state', () => {
    const onPressMock = jest.fn();

    const { getByRole } = render(
      <Button disabled onPress={onPressMock}>
        {labelText}
      </Button>
    );

    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies accessibility role', () => {
    const { queryByRole, getByRole } = render(
      <Button accessibilityRole="none">{labelText}</Button>
    );

    expect(queryByRole('button')).toBe(null);
    expect(getByRole('none')).toBeDefined();
  });

  it('applies theme and style props', () => {
    const customStyle = { backgroundColor: 'blue' };
    const customTextStyle = { color: 'red' };

    const { toJSON, getByRole, getByText } = render(
      <Button style={customStyle} textStyle={customTextStyle}>
        {labelText}
      </Button>
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(getByRole('button').props.style).toContain(customStyle);
    expect(getByText(labelText).props.style).toStrictEqual([
      {
        ...themedStyle.text,
      },
      customTextStyle,
    ]);
    expect(toJSON()).toMatchSnapshot();
  });
});
