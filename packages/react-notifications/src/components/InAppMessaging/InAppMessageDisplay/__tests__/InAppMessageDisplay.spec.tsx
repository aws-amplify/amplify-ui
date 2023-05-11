import React from 'react';
import { Text, View } from '@aws-amplify/ui-react';
import { useMessage } from '@aws-amplify/ui-react-core-notifications';
import { render } from '@testing-library/react';

import InAppMessageDisplay from '../InAppMessageDisplay';

jest.mock('@aws-amplify/ui-react-core-notifications');

const mockUseMessage = useMessage as jest.Mock;

describe('InAppMessageDisplay', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the expected component in the happy path', () => {
    const Component = ({ layout }: { layout: string }) => (
      <View>
        <Text>{layout}</Text>
      </View>
    );
    const props = { layout: 'TEST_COMPONENT' };

    mockUseMessage.mockReturnValueOnce({ Component, props });

    const { baseElement } = render(<InAppMessageDisplay />);

    expect(baseElement).toMatchSnapshot();
  });
});
