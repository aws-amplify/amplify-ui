import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import { useMessage } from '@aws-amplify/ui-react-core';

import InAppMessageDisplay from '../InAppMessageDisplay';

jest.mock('@aws-amplify/ui-react-core');

const mockUseMessage = useMessage as jest.Mock;

describe('InAppMessageDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the expected component in the happy path', () => {
    const Component = ({ layout }) => (
      <View>
        <Text>{layout}</Text>
      </View>
    );
    const props = { layout: 'TEST_COMPONENT' };

    mockUseMessage.mockReturnValueOnce({ Component, props });

    const { toJSON } = render(<InAppMessageDisplay />);

    expect(toJSON()).toMatchSnapshot();
  });
});
