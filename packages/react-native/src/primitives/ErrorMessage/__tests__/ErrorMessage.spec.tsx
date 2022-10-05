import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';

import { CLOSE_BUTTON_TEST_ID } from '../ErrorMessage';
import ErrorMessage from '../ErrorMessage';

const OnDismissExample = ({
  customOnDismiss,
}: {
  customOnDismiss: jest.Mock<any, any>;
}) => {
  const [dismissed, setDismissed] = useState(false);

  const handleOnDismiss = () => {
    customOnDismiss();
    setDismissed(!dismissed);
  };

  return (
    <View>
      {dismissed ? (
        <Text>ErrorMessage dismissed</Text>
      ) : (
        <ErrorMessage onDismiss={handleOnDismiss}>
          Test onDismiss handler
        </ErrorMessage>
      )}
    </View>
  );
};

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
    const { queryByRole, getByTestId } = render(
      <OnDismissExample customOnDismiss={customOnDismiss} />
    );

    const dismissButton = getByTestId(CLOSE_BUTTON_TEST_ID);
    fireEvent.press(dismissButton);

    expect(customOnDismiss).toHaveBeenCalledTimes(1);
    expect(queryByRole('alert')).toBeFalsy();
  });
});
