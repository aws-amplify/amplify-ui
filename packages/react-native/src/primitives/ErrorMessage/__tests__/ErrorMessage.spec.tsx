import React from 'react';
import { fireEvent, render, renderHook } from '@testing-library/react-native';

import { useTheme } from '../../../theme';
import { CLOSE_BUTTON_TEST_ID } from '../ErrorMessage';
import ErrorMessage from '../ErrorMessage';
import { getThemedStyles } from '../styles';

describe('ErrorMessage', () => {
  it('renders default ErrorMessage as expected', () => {
    const { toJSON, queryByTestId } = render(
      <ErrorMessage>Default ErrorMessage</ErrorMessage>
    );
    expect(toJSON()).toMatchSnapshot();
    expect(queryByTestId(CLOSE_BUTTON_TEST_ID)).toBeFalsy();
  });

  it('handles an onDismiss callback', () => {
    const customOnDismiss = jest.fn();
    const { getByTestId } = render(
      <ErrorMessage onDismiss={customOnDismiss}>
        Default ErrorMessage
      </ErrorMessage>
    );

    const dismissButton = getByTestId(CLOSE_BUTTON_TEST_ID);
    fireEvent.press(dismissButton);

    expect(customOnDismiss).toHaveBeenCalledTimes(1);
  });

  it('applies theme and style props', () => {
    const customStyle = { backgroundColor: 'blue' };
    const customLabelStyle = { color: 'white' };
    const labelText = 'Themed ErrorMessage';

    const { getByRole, getByText, toJSON } = render(
      <ErrorMessage labelStyle={customLabelStyle} style={customStyle}>
        {labelText}
      </ErrorMessage>
    );

    const { result } = renderHook(() => useTheme());
    const themedStyle = getThemedStyles(result.current);

    const alert = getByRole('alert');
    const label = getByText(labelText);

    expect(alert.props.style).toStrictEqual([
      themedStyle.container,
      customStyle,
    ]);

    expect(label.props.style).toStrictEqual([
      themedStyle.label,
      customLabelStyle,
    ]);
    expect(toJSON()).toMatchSnapshot();
  });
});
