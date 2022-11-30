import React from 'react';
import { render } from '@testing-library/react-native';

import { FieldErrors } from '../FieldErrors';

describe('FieldErrors', () => {
  it('renders as expected', () => {
    const errors = ['error 1', 'error 2'];
    const { toJSON, findByText } = render(
      <FieldErrors
        errors={errors}
        errorStyle={{ color: 'red' }}
        style={{ backgroundColor: 'black' }}
      />
    );

    expect(findByText('error 1')).toBeDefined();
    expect(findByText('error 2')).toBeDefined();

    expect(toJSON()).toMatchSnapshot();
  });

  it('renders as expected with no errors', () => {
    const { toJSON } = render(<FieldErrors errors={[]} />);
    expect(toJSON()).toMatchSnapshot();

    expect(toJSON()).toBe(null);
  });
});
