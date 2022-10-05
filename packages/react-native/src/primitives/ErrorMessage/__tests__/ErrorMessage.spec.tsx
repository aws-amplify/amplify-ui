import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import ErrorMessage from '../ErrorMessage';
import { Text, View } from 'react-native';

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
    expect(queryByTestId('rn-amplify-errorMessage-dismissButton')).toBeFalsy();
  });

  it('handles an onDismiss callback', () => {
    const customOnDismiss = jest.fn();
    const { queryByRole, getByTestId } = render(
      <OnDismissExample customOnDismiss={customOnDismiss} />
    );

    const dismissButton = getByTestId('rn-amplify-errorMessage-dismissButton');
    fireEvent.press(dismissButton);

    expect(customOnDismiss).toHaveBeenCalledTimes(1);
    expect(queryByRole('alert')).toBeFalsy();
  });
});
