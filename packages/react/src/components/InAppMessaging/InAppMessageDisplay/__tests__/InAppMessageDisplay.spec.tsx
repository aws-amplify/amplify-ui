import React from 'react';
import { useMessage } from '@aws-amplify/ui-react-core';

import { Text } from '../../../../primitives/Text';
import { View } from '../../../../primitives/View';
import { render } from '@testing-library/react';

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

    const { baseElement } = render(<InAppMessageDisplay />);

    expect(baseElement).toMatchSnapshot();
  });
});
