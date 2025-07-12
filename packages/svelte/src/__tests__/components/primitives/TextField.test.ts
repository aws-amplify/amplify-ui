import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import TextField from '../../../components/primitives/TextField.svelte';

describe('TextField', () => {
  it('renders with default props', () => {
    const { getByRole } = render(TextField);
    const input = getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('amplify-input');
  });

  it('renders with label', () => {
    const { getByLabelText } = render(TextField, {
      props: {
        label: 'Username',
      },
    });
    const input = getByLabelText('Username');
    expect(input).toBeInTheDocument();
  });

  it('renders with hidden label', () => {
    const { container } = render(TextField, {
      props: {
        label: 'Username',
        labelHidden: true,
      },
    });
    const label = container.querySelector('label');
    expect(label).toHaveClass('amplify-visually-hidden');
  });

  it('shows error state', () => {
    const { getByRole, getByText } = render(TextField, {
      props: {
        hasError: true,
        errorMessage: 'This field is required',
      },
    });
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(getByText('This field is required')).toBeInTheDocument();
  });

  it('shows descriptive text', () => {
    const { getByText } = render(TextField, {
      props: {
        descriptiveText: 'Enter your username',
      },
    });
    expect(getByText('Enter your username')).toBeInTheDocument();
  });

  it('handles input events', async () => {
    const handleInput = vi.fn();
    const handleChange = vi.fn();
    const { getByRole } = render(TextField, {
      props: {
        value: '',
      },
      events: {
        input: handleInput,
        change: handleChange,
      },
    });
    
    const input = getByRole('textbox') as HTMLInputElement;
    await fireEvent.input(input, { target: { value: 'test' } });
    
    expect(handleInput).toHaveBeenCalled();
    expect(handleChange).toHaveBeenCalledWith('test');
  });

  it('handles blur events', async () => {
    const handleBlur = vi.fn();
    const { getByRole } = render(TextField, {
      events: {
        blur: handleBlur,
      },
    });
    
    const input = getByRole('textbox');
    await fireEvent.blur(input);
    
    expect(handleBlur).toHaveBeenCalled();
  });

  it('renders with different sizes', () => {
    const { container, rerender } = render(TextField, {
      props: {
        size: 'small',
      },
    });
    
    let field = container.querySelector('.amplify-field');
    expect(field).toHaveClass('amplify-field--small');
    
    rerender({ size: 'large' });
    field = container.querySelector('.amplify-field');
    expect(field).toHaveClass('amplify-field--large');
  });

  it('renders with quiet variation', () => {
    const { container } = render(TextField, {
      props: {
        variation: 'quiet',
      },
    });
    
    const field = container.querySelector('.amplify-field');
    expect(field).toHaveClass('amplify-field--quiet');
  });

  it('supports disabled state', () => {
    const { getByRole } = render(TextField, {
      props: {
        isDisabled: true,
      },
    });
    
    const input = getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('supports required state', () => {
    const { getByRole, getByText } = render(TextField, {
      props: {
        label: 'Username',
        isRequired: true,
      },
    });
    
    const input = getByRole('textbox');
    expect(input).toBeRequired();
    expect(getByText('*')).toBeInTheDocument();
  });

  it('supports readonly state', () => {
    const { getByRole } = render(TextField, {
      props: {
        isReadOnly: true,
      },
    });
    
    const input = getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });
});