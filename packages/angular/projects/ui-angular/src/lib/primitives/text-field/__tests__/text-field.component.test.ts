import { render, screen } from '@testing-library/angular';

import { TextFieldComponent } from '../text-field.component';

describe('amplify-text-field', () => {
  it('renders as expected', async () => {
    const { container } = await render(TextFieldComponent, {
      componentProperties: {
        label: 'Input',
        fieldId: 'input',
        placeholder: 'Enter something',
        type: 'text',
      },
    });
    expect(container).toMatchSnapshot();
  });

  it('should render input with autocapitalize disabled by default', async () => {
    await render(TextFieldComponent, {
      componentProperties: { name: 'username', label: 'Username' },
    });
    const input = screen.getByLabelText('Username');
    expect(input).toHaveAttribute('autocapitalize', 'off');
  });
});
