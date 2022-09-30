import React from 'react';
import { Text, View } from 'react-native';
import TestRenderer from 'react-test-renderer';
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

    const inAppMessageDisplay = TestRenderer.create(<InAppMessageDisplay />);

    expect(inAppMessageDisplay.toJSON()).toMatchSnapshot();
  });
});
