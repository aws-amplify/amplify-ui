import React from 'react';
import { render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { getThemedStyles } from '../styles';
import Label from '../Label';

const text = 'Default Label';
const testID = 'labelID';
const props = {
  testID,
};

describe('Label', () => {
  it('renders a default Label', () => {
    const { toJSON, getByText, getByRole } = render(
      <Label {...props}>{text}</Label>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByText(text)).toBeDefined();
    expect(getByRole('text')).toBeDefined();
  });

  it('applies accessibility role', () => {
    const { toJSON, queryByRole, getByRole } = render(
      <Label {...props} accessibilityRole="none">
        {text}
      </Label>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(queryByRole('text')).toBe(null);
    expect(getByRole('none')).toBeDefined();
  });

  it('should apply theme and style props', () => {
    const customStyle = { color: 'red' };

    const { toJSON, getByTestId } = render(
      <Label {...props} style={customStyle}>
        Red Label
      </Label>
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId(testID).props.style).toStrictEqual([
      themedStyle.text,
      themedStyle['primary'],
      customStyle,
    ]);
  });

  it('should apply variant styles', () => {
    const variant = 'success';

    const { toJSON, getByTestId } = render(
      <Label {...props} variant={variant}>
        Label
      </Label>
    );
    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    expect(toJSON()).toMatchSnapshot();
    expect(getByTestId(testID).props.style).toStrictEqual([
      themedStyle.text,
      themedStyle[variant],
      undefined, // no custom styles
    ]);
  });
});
