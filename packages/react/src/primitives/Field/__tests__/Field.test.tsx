import * as React from 'react';
import { render } from '@testing-library/react';

import { Field } from '../Field';
import { ComponentClassNames } from '../../shared/constants';

describe('Field component', () => {
  it('should render children', () => {
    const { getByTestId } = render(<Field testId="test">Test</Field>);

    expect(getByTestId('test')).toHaveClass(ComponentClassNames.Field);
  });
});
