import PasswordControl from '../password-control.vue';
import { components } from '../../../global-spec';
import { fireEvent, render, screen } from '@testing-library/vue';
import { ComponentClassName } from '@aws-amplify/ui';

describe('PasswordControl', () => {
  it('should render as expected', () => {
    // to mock random id
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.3141592654);

    const { container } = render(PasswordControl, {
      global: { components },
      props: {
        name: 'password',
        label: 'Password',
        autocomplete: 'new-password',
        hasError: false,
      },
    });

    expect(container).toMatchSnapshot();
  });

  it('should render as expected when showPassword button is clicked', async () => {
    // to mock random id
    jest.spyOn(global.Math, 'random').mockReturnValueOnce(0.3141592654);

    const { container } = render(PasswordControl, {
      global: { components },
      props: {
        name: 'password',
        label: 'Password',
        autocomplete: 'new-password',
        hasError: false,
      },
    });

    const showPasswordButton = screen.getByRole('switch');
    await fireEvent.click(showPasswordButton);

    expect(screen.getByLabelText('Hide password')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  it('should render with default classnames', () => {
    const { baseElement } = render(PasswordControl, {
      global: { components },
      props: { name: 'password', label: 'Password' },
    });

    // passwordField container is two levels below baseElement (<body> -> <div> -> <div>)
    const passwordField = baseElement.firstChild?.firstChild;

    expect(passwordField).toHaveClass(ComponentClassName.Flex);
    expect(passwordField).toHaveClass(ComponentClassName.Field);
    expect(passwordField).toHaveClass(ComponentClassName.TextField);
    expect(passwordField).toHaveClass(ComponentClassName.PasswordField);
  });

  it('should render label with expected classname', () => {
    render(PasswordControl, {
      global: { components },
      props: { name: 'password', label: 'Password' },
    });

    const label = screen.getByText('Password');

    expect(label).toHaveClass(ComponentClassName.Label);
  });

  it('should hide label when labelHidden is true', async () => {
    render(PasswordControl, {
      global: { components },
      props: { name: 'password', label: 'Password', labelHidden: true },
    });

    const label = screen.getByText('Password');

    expect(label).toHaveClass('amplify-visually-hidden');
  });

  it('should render input with expected classnames', async () => {
    render(PasswordControl, {
      global: { components },
      props: { name: 'password', label: 'Password' },
    });
    const input = screen.getByLabelText('Password');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveClass(ComponentClassName.Input);
  });

  it('should render input with autocomplete enabled by default', async () => {
    render(PasswordControl, {
      global: { components },
      props: { name: 'password', label: 'Password' },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('autocomplete', 'new-password');
  });

  it('should have aria-describedby when describedBy is present', async () => {
    render(PasswordControl, {
      global: { components },
      props: {
        name: 'password',
        label: 'Password',
        describedBy: 'error-id',
      },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('aria-describedby', 'error-id');
  });

  it('should require input when required is true', () => {
    render(PasswordControl, {
      global: { components },
      props: {
        name: 'password',
        label: 'Password',
        required: true,
      },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('required');
  });

  it('should disable input when disabled is true', async () => {
    render(PasswordControl, {
      global: { components },
      props: {
        name: 'password',
        label: 'Password',
        disabled: true,
      },
    });
    const input = screen.getByLabelText('Password');
    expect(input).toBeDisabled();
  });

  it('toggles input field type when show password button is clicked', async () => {
    render(PasswordControl, {
      global: { components },
      props: { name: 'password', label: 'Password' },
    });
    const input = screen.getByLabelText('Password');
    const showPasswordButton = screen.getByRole('switch');

    expect(input).toHaveAttribute('type', 'password');

    await fireEvent.click(showPasswordButton);
    expect(input).toHaveAttribute('type', 'text');

    await fireEvent.click(showPasswordButton);
    expect(input).toHaveAttribute('type', 'password');
  });
});
