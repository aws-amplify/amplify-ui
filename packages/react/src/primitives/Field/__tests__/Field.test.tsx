import * as React from 'react';
import { render } from '@testing-library/react';

import { Field } from '../Field';
import { ComponentClassNames } from '../../shared/constants';

describe('Field component', () => {
  it('should render children', () => {
    const { getByLabelText } = render(<Field label="test" />);

    expect(getByLabelText('test')).toHaveClass(ComponentClassNames.Field);
  });
});
