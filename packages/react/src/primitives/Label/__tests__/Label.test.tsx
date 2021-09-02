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
});
