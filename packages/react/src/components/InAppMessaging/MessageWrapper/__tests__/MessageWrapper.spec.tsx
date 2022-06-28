import React from 'react';
import TestRenderer from 'react-test-renderer';
import { Text } from 'react-native';

import MessageWrapper from '../MessageWrapper';

jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: 'SafeAreaProvider',
  SafeAreaView: 'SafeAreaView',
}));

const Children = () => <Text>Children</Text>;

describe('MessageWrapper', () => {
  it('renders as expected', () => {
    const renderer = TestRenderer.create(
      <MessageWrapper>
        <Children />
      </MessageWrapper>
    );

    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
