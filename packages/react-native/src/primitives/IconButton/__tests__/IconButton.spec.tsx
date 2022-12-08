import React from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import IconButton from '../IconButton';
import { getThemedStyles } from '../styles';

const source = { uri: 'icon.png' };

describe('IconButton', () => {
  it('renders as expected', () => {
    const { toJSON, getByRole } = render(<IconButton source={source} />);

    expect(getByRole('button')).toBeDefined();
    expect(getByRole('image')).toBeDefined();
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles disabled state', () => {
    const onPressMock = jest.fn();

    const { toJSON, getByRole } = render(
      <IconButton disabled source={source} />
    );

    const button = getByRole('button');
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(button.props.style).toStrictEqual([
      { ...themedStyle.container, ...themedStyle.disabled },
      undefined,
      undefined,
    ]);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with custom icon style', () => {
    const customIconStyle = { backgroundColor: 'antiquewhite' };
    const { toJSON, getByRole } = render(
      <IconButton iconStyle={customIconStyle} source={source} />
    );

    const icon = getByRole('image');
    expect(icon.props.style).toContain(customIconStyle);
    expect(toJSON()).toMatchSnapshot();
  });

  it('applies theme and style props', () => {
    const customStyle = { backgroundColor: 'blue' };

    const { toJSON, getByRole } = render(
      <IconButton source={source} style={customStyle} />
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(getByRole('button').props.style).toStrictEqual([
      {
        ...themedStyle.container,
      },
      undefined,
      customStyle,
    ]);
    expect(toJSON()).toMatchSnapshot();
  });
});
