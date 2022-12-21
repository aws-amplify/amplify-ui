import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { Label } from '../Label';

describe('Label component', () => {
  it('should render default and custom classname for TextField wrapper', async () => {
    render(
      <Label htmlFor="my-label" className="my-test-label">
        My label
      </Label>
    );

    const label = (await screen.findByText('My label')) as HTMLLabelElement;
    expect(label).toHaveClass('my-test-label');
    expect(label.htmlFor).toBe('my-label');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLLabelElement>();

    render(<Label ref={ref}>My label</Label>);
    await screen.findByText('My label');
    expect(ref.current?.nodeName).toBe('LABEL');
  });
});
