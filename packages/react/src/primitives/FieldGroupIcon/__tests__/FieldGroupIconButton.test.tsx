import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassNames } from '../../shared';
import { FieldGroupIconButton } from '../FieldGroupIconButton';

describe('FieldGroupIconButton component', () => {
  const testId = 'fieldGroupTestId';
  it('should render default and custom classname for FieldGroupIconButton', async () => {
    render(<FieldGroupIconButton className="custom-class" testId={testId} />);

    const fieldGroup = await screen.findByTestId(testId);

    expect(fieldGroup).toHaveClass('custom-class');
    expect(fieldGroup).toHaveClass(ComponentClassNames.FieldGroupIconButton);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <FieldGroupIconButton
        className="custom-class"
        ref={ref}
        testId={testId}
      />
    );

    await screen.findByRole('button');

    expect(ref.current.nodeName).toBe('BUTTON');
  });
});
