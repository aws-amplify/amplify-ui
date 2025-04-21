import React from 'react';
import { Text, View } from 'react-native';
import { render } from '@testing-library/react-native';
import type { InAppMessageLayout } from '@aws-amplify/ui-react-core-notifications';
import { useMessage } from '@aws-amplify/ui-react-core-notifications';

import InAppMessageDisplay from '../InAppMessageDisplay';

jest.mock('@aws-amplify/ui-react-core-notifications');

const mockUseMessage = useMessage as jest.Mock;

describe('InAppMessageDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the expected component in the happy path', () => {
    const Component = ({ layout }: { layout: InAppMessageLayout }) => (
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
