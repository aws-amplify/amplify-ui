import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { FieldGroupIconButton } from '../FieldGroupIconButton';
import { ComponentClassNames } from '../../shared/constants';

describe('FieldGroupIconButton: ', () => {
  it('should render default and custom classname', async () => {
    const className = 'custom-class';
    render(<FieldGroupIconButton className={className} />);

    const fieldGroupIconButton = await screen.findByRole('button');
    expect(fieldGroupIconButton).toHaveClass(
      ComponentClassNames.FieldGroupIconButton,
      className
    );
  });

  it('should forward ref to DOM element', async () => {
    const testId = 'field-group-icon-button';
    const ref = React.createRef<HTMLButtonElement>();
    render(<FieldGroupIconButton ref={ref} testId={testId} />);
    await screen.findAllByTestId(testId);
    expect(ref.current.nodeName).toBe('BUTTON');
  });
});
