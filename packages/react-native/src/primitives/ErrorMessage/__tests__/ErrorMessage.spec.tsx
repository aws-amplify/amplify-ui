import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { CLOSE_BUTTON_TEST_ID } from '../ErrorMessage';
import ErrorMessage from '../ErrorMessage';

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
});
