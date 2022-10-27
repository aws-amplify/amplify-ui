import React from 'react';
import { render } from '@testing-library/react-native';

import { FieldErrors } from '../FieldErrors';

describe('FieldErrors', () => {
  it('renders as expected', () => {
    const errors = ['error 1', 'error 2'];
    const { toJSON } = render(<FieldErrors errors={errors} />);
    expect(toJSON()).toMatchSnapshot();

    expect(toJSON()).toHaveLength(errors.length);
  });

  it('renders as expected with no errors', () => {
    const { toJSON } = render(<FieldErrors errors={[]} />);
    expect(toJSON()).toMatchSnapshot();

    expect(toJSON()).toBe(null);
  });
});
