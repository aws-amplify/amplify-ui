import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { FieldClearButton } from '../FieldClearButton';

describe('FieldClearButton component', () => {
  const testId = 'fieldGroupTestId';
  it('should render default and custom classname for FieldClearButton', async () => {
    render(<FieldClearButton className="custom-class" testId={testId} />);

    const fieldClearbutton = await screen.findByTestId(testId);

    expect(fieldClearbutton).toHaveClass('custom-class');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <FieldClearButton ref={ref} className="custom-class" testId={testId} />
    );
    await screen.findByTestId(testId);
    expect(ref.current.nodeName).toBe('BUTTON');
  });
});
