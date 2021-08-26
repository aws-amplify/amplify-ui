import { Label } from '../Label';
import { render, screen } from '@testing-library/react';

describe('Label component', () => {
  it('should render default and custom classname for TextField wrapper', async () => {
    render(
      <Label htmlFor="my-label" className="my-test-label">
        My label
      </Label>
    );

    const label = (await screen.findByText('My label')) as HTMLLabelElement;
    expect(label.className).toContain('my-test-label');
    expect(label.htmlFor).toBe('my-label');
  });
});
