import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';

import MessageWrapper from '../MessageWrapper';

const Children = () => <Text>Children</Text>;

describe('MessageWrapper', () => {
  it('renders as expected', () => {
    const { toJSON } = render(
      <MessageWrapper>
        <Children />
      </MessageWrapper>
    );

    expect(toJSON()).toMatchSnapshot();
  });
});
