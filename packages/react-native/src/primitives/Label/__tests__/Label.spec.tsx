import React from 'react';
import { render, renderHook } from '@testing-library/react-native';

import Label from '../Label';
import { useTheme } from '../../../theme';

describe('Label', () => {
  it('renders a default Label', () => {
    const text = 'Default Label';
    const { toJSON, getByText } = render(<Label>{text}</Label>);
    expect(toJSON()).toMatchSnapshot();

    expect(getByText(text)).toBeDefined();
  });

  it('has default style props', () => {
    const { getByTestId } = render(
      <Label testID="labelID">Themed Label</Label>
    );

    const { result } = renderHook(() => useTheme());

    expect(getByTestId('labelID').props.style).toStrictEqual([
      result.current.tokens.components.label,
      undefined,
    ]);
  });

  it('applies style props', () => {
    const customStyle = { color: 'red' };

    const { toJSON, getByTestId } = render(
      <Label testID="labelID" style={customStyle}>
        Red Label
      </Label>
    );

    const { result } = renderHook(() => useTheme());

    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId('labelID').props.style).toStrictEqual([
      result.current.tokens.components.label,
      customStyle,
    ]);
  });
});
