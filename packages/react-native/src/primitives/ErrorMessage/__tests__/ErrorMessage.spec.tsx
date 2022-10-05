import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders default ErrorMessage as expected', () => {
    const { toJSON } = render(
      <ErrorMessage>Default ErrorMessage</ErrorMessage>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('handles an onDismiss callback', () => {
    const customOnDismiss = jest.fn();
    const { queryByRole, getByTestId } = render(
      <ErrorMessage onDismiss={customOnDismiss}>
        Test onDismiss handler
      </ErrorMessage>
    );

    const dismissButton = getByTestId('dismissButton');
    fireEvent.press(dismissButton);
    expect(customOnDismiss).toHaveBeenCalledTimes(1);

    expect(queryByRole('alert')).toBeFalsy();
  });

  it('renders as expected with accessibilityRole', () => {
    const { toJSON } = render(
      <ErrorMessage accessibilityRole="none"></ErrorMessage>
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
