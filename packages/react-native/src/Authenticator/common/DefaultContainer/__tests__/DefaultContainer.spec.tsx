import React from 'react';
import { render } from '@testing-library/react-native';

import { DefaultContainer } from '..';
import { Button } from '../../../../primitives/Button';

describe('DefaultContainer', () => {
  it('renders as expected with children', () => {
    const testID = 'testButton';
    const { toJSON, getByTestId } = render(
      <DefaultContainer>
        <Button testID={testID} />
      </DefaultContainer>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByTestId(testID)).toBeDefined();
  });
});
