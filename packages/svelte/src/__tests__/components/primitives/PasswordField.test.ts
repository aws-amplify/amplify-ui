import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import PasswordField from '../../../components/primitives/PasswordField.svelte';

describe('PasswordField', () => {
  it('renders with default props', () => {
    const { getByLabelText } = render(PasswordField);
    const input = getByLabelText('Password');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
  });

  it('toggles password visibility', async () => {
    const { getByLabelText, getByText } = render(PasswordField);
    const input = getByLabelText('Password');
    const toggleButton = getByText('Show password');
    
    expect(input).toHaveAttribute('type', 'password');
    
    await fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'text');
    expect(toggleButton).toHaveTextContent('Hide password');
    
    await fireEvent.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleButton).toHaveTextContent('Show password');
  });

  it('hides show password button when hideShowPassword is true', () => {
    const { queryByText } = render(PasswordField, {
      props: {
        hideShowPassword: true,
      },
    });
    
    expect(queryByText('Show password')).not.toBeInTheDocument();
  });

  it('uses custom toggle button text', () => {
    const { getByText } = render(PasswordField, {
      props: {
        showPasswordText: 'Reveal',
        hidePasswordText: 'Conceal',
      },
    });
    
    expect(getByText('Reveal')).toBeInTheDocument();
  });

  it('disables toggle button when field is disabled', () => {
    const { getByText } = render(PasswordField, {
      props: {
        isDisabled: true,
      },
    });
    
    const toggleButton = getByText('Show password');
    expect(toggleButton).toBeDisabled();
  });

  it('handles input events', async () => {
    const handleChange = vi.fn();
    const handleInput = vi.fn();
    const { getByLabelText } = render(PasswordField, {
      props: {
        value: '',
      },
      events: {
        change: handleChange,
        input: handleInput,
      },
    });
    
    const input = getByLabelText('Password') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: 'password123' } });
    
    expect(handleInput).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('password123');
  });

  it('handles blur events', async () => {
    const handleBlur = vi.fn();
    const { getByLabelText } = render(PasswordField, {
      events: {
        blur: handleBlur,
      },
    });
    
    const input = getByLabelText('Password');
    await fireEvent.blur(input);
    
    expect(handleBlur).toHaveBeenCalled();
  });

  it('passes through all TextField props', () => {
    const { getByLabelText, getByText } = render(PasswordField, {
      props: {
        label: 'New Password',
        hasError: true,
        errorMessage: 'Password is too weak',
        isRequired: true,
        descriptiveText: 'Must be at least 8 characters',
      },
    });
    
    const input = getByLabelText('New Password');
    expect(input).toBeRequired();
    expect(getByText('Password is too weak')).toBeInTheDocument();
    expect(getByText('Must be at least 8 characters')).toBeInTheDocument();
  });
});