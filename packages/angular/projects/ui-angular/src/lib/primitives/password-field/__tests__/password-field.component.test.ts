import { ComponentClassName } from '@aws-amplify/ui';
import { screen, render, fireEvent } from '@testing-library/angular';

import { PasswordFieldComponent } from '../password-field.component';

describe('amplify-password-field', () => {
  it('renders as expected', async () => {
    const { container } = await render(PasswordFieldComponent, {
      componentProperties: {
        name: 'password',
        label: 'Password',
        fieldId: 'mockId',
      },
    });
    expect(container).toMatchSnapshot();
  });

  it('renders as expected when show password button is clicked', async () => {
    const { container } = await render(PasswordFieldComponent, {
      componentProperties: {
        name: 'password',
        label: 'Password',
        fieldId: 'mockId',
      },
    });
    const showPasswordButton = screen.getByRole('switch');
    fireEvent.click(showPasswordButton);

    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render with default classnames', async () => {
    await render(
      `
        <amplify-password-field label="Password" data-testid="test"></amplify-password-field>
      `,
      {
        declarations: [PasswordFieldComponent],
      }
    );

    // Angular components always have an empty wrapper. Go to its first
    // child to reach the actual container.
    const passwordField = screen.getByTestId('test').firstChild;

    expect(passwordField).toHaveClass(ComponentClassName.Flex);
    expect(passwordField).toHaveClass(ComponentClassName.Field);
    expect(passwordField).toHaveClass(ComponentClassName.TextField);
    expect(passwordField).toHaveClass(ComponentClassName.PasswordField);
  });

  it('should render label with expected classname', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: { name: 'password', label: 'Password' },
    });
    const label = screen.getByText('Password');
    expect(label).toHaveClass(ComponentClassName.Label);
  });

  it('should hide label when labelHidden is true', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: {
        name: 'password',
        label: 'Password',
        labelHidden: true,
      },
    });
    const label = screen.getByText('Password');
    expect(label).toHaveClass('amplify-visually-hidden');
  });

  it('should render input with expected classnames', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: {
        label: 'Password',
        fieldId: 'mockId',
        labelHidden: true,
      },
    });

    const input = screen.getByLabelText('Password');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveClass(ComponentClassName.Input);
    expect(input.id).toBe('mockId');
  });

  it('should render input with autocomplete enabled by default', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: { name: 'password', label: 'Password' },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('autocomplete', 'new-password');
  });

  it('should render input with autocapitalize disabled by default', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: { name: 'password', label: 'Password' },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('autocapitalize', 'off');
  });

  it('should have aria-invalid when error is present', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: {
        name: 'password',
        label: 'Password',
        hasError: true,
      },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-invalid', 'true');
  });

  it('should have aria-describedby when describedBy is present', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: {
        name: 'password',
        label: 'Password',
        describedBy: 'error-id',
      },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-describedby', 'error-id');
  });

  it('should require input when required is true', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: {
        name: 'password',
        label: 'Password',
        required: true,
      },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('required');
  });

  it('should disable input when disabled is true', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: {
        name: 'password',
        label: 'Password',
        disabled: true,
      },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toBeDisabled();
  });

  it('toggles input field type when show password button is clicked', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: { name: 'password', label: 'Password' },
    });
    const input = screen.getByLabelText('Password');
    const showPasswordButton = screen.getByRole('switch');

    expect(input).toHaveAttribute('type', 'password');

    fireEvent.click(showPasswordButton);
    expect(input).toHaveAttribute('type', 'text');

    fireEvent.click(showPasswordButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('reflects default value', async () => {
    await render(PasswordFieldComponent, {
      componentProperties: {
        name: 'password',
        label: 'Password',
        labelHidden: true,
        initialValue: 'initialvalue',
      },
    });
    const input: HTMLInputElement = screen.getByLabelText('Password');
    expect(input.value).toBe('initialvalue');
  });
});
