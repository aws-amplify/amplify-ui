import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Field } from '../Field';
import { ComponentClassNames } from '../../shared/constants';

describe('Field component', () => {
  it('should have the proper className', () => {
    const { getByTestId } = render(<Field testId="test">Test</Field>);

    expect(getByTestId('test')).toHaveClass(ComponentClassNames.Field);
  });

  it('should render children', () => {
    const { getByTestId } = render(
      <Field testId="test">
        <span>test</span>
        <span>test</span>
      </Field>
    );

    expect(getByTestId('test').childNodes).toHaveLength(2);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();

    render(<Field ref={ref}>My label</Field>);
    await screen.findByText('My label');
    expect(ref.current?.nodeName).toBe('DIV');
  });
});
