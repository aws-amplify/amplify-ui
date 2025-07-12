import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import Button from '../components/primitives/Button.svelte';

describe('Button', () => {
  it('renders with default props', () => {
    const { getByRole } = render(Button, {
      props: {
        children: 'Click me',
      },
    });
    
    const button = getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
    expect(button).toHaveClass('amplify-button');
    expect(button).toHaveClass('amplify-button--primary');
    expect(button).toHaveClass('amplify-button--medium');
  });

  it('renders with different variations', () => {
    const { getByRole } = render(Button, {
      props: {
        variation: 'link',
        children: 'Link button',
      },
    });
    
    const button = getByRole('button');
    expect(button).toHaveClass('amplify-button--link');
  });

  it('renders with different sizes', () => {
    const { getByRole } = render(Button, {
      props: {
        size: 'large',
        children: 'Large button',
      },
    });
    
    const button = getByRole('button');
    expect(button).toHaveClass('amplify-button--large');
  });

  it('renders as disabled', () => {
    const { getByRole } = render(Button, {
      props: {
        isDisabled: true,
        children: 'Disabled button',
      },
    });
    
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('amplify-button--disabled');
  });

  it('renders in loading state', () => {
    const { getByRole, getByText } = render(Button, {
      props: {
        isLoading: true,
        loadingText: 'Processing...',
        children: 'Submit',
      },
    });
    
    const button = getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('amplify-button--loading');
    expect(getByText('Processing...')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(Button, {
      props: {
        children: 'Click me',
      },
      events: {
        click: handleClick,
      },
    });
    
    const button = getByRole('button');
    await fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire click when disabled', async () => {
    const handleClick = vi.fn();
    const { getByRole } = render(Button, {
      props: {
        isDisabled: true,
        children: 'Disabled',
      },
      events: {
        click: handleClick,
      },
    });
    
    const button = getByRole('button');
    await fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders as full width', () => {
    const { getByRole } = render(Button, {
      props: {
        isFullWidth: true,
        children: 'Full width',
      },
    });
    
    const button = getByRole('button');
    expect(button).toHaveClass('amplify-button--fullwidth');
  });
});