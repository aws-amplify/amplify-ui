import React from 'react';
import { render } from '@testing-library/react-native';

import DefaultFormFields from '../DefaultTextFormFields';

describe('DefaultFormFields', () => {
  it('renders as expected', () => {
    const { toJSON } = render(
      <DefaultFormFields fields={[]} isPending={false} />
    );
    expect(toJSON()).toMatchSnapshot();

    expect(toJSON()).toBeDefined();
  });
});
