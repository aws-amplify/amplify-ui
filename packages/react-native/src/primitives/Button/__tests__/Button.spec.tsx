import React from 'react';
import { Text } from 'react-native';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { getThemedStyles } from '../styles';
import Button from '../Button';

const title = 'A pressable button';
const Title = () => <Text>{title}</Text>;

describe('Button', () => {
  it('renders as expected with a string passed as children', () => {
    const { toJSON } = render(<Button>{title}</Button>);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with a component passed as children', () => {
    const { toJSON } = render(
      <Button>
        <Title />
      </Button>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles an onPress callback', () => {
    const onPressMock = jest.fn();

    const { getByRole } = render(
      <Button onPress={onPressMock}>{title}</Button>
    );

    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPressMock).toHaveBeenCalled();
  });

  it('handles disabled state', () => {
    const onPressMock = jest.fn();

    const { getByRole } = render(
      <Button disabled onPress={onPressMock}>
        {title}
      </Button>
    );

    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
  });

  it('applies theme and style props', () => {
    const customStyle = { color: 'red' };

    const { toJSON, getByText } = render(
      <Button textStyle={customStyle}>{title}</Button>
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(toJSON()).toMatchSnapshot();
    expect(getByText(title).props.style).toStrictEqual([
      themedStyle.text,
      customStyle,
    ]);
  });
});
