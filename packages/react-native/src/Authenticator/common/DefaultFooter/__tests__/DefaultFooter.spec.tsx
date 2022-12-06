import React from 'react';
import { render } from '@testing-library/react-native';

import { DefaultFooter } from '..';
import { Button } from '../../../../primitives/Button';

describe('DefaultFooter', () => {
  it('renders as expected with children', () => {
    const testID = 'testButton';
    const { toJSON, getByTestId } = render(
      <DefaultFooter>
        <Button testID={testID} />
      </DefaultFooter>
    );
    expect(toJSON()).toMatchSnapshot();

    expect(getByTestId(testID)).toBeDefined();
  });

  it('renders as expected without children', () => {
    const { toJSON } = render(<DefaultFooter />);
    expect(toJSON()).toMatchSnapshot();

    expect(toJSON()).toBe(null);
  });
});
