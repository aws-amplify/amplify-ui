import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { ComponentClassName } from '@aws-amplify/ui';
import { ToggleButton } from '../ToggleButton';

describe('ToggleButton:', () => {
  const ControlledToggleButton = () => {
    const [pressed, setPressed] = React.useState(false);
    return (
      <ToggleButton isPressed={pressed} onChange={() => setPressed(!pressed)} />
    );
  };

  it('should render classname and custom classname', async () => {
    const className = 'test-class';
    render(<ToggleButton className="test-class" />);
    const toggleButton = await screen.findByRole('button');
    expect(toggleButton).toHaveClass(
      ComponentClassName.ToggleButton,
      className
    );
  });

  it('should render variation classes for ToggleButton', async () => {
    render(
      <div>
        <ToggleButton variation="primary" testId="primary">
          primary
        </ToggleButton>
        <ToggleButton variation="link" testId="link">
          link
        </ToggleButton>
        <ToggleButton variation="menu" testId="menu">
          menu
        </ToggleButton>
      </div>
    );

    const primary = await screen.findByTestId('primary');
    const link = await screen.findByTestId('link');
    const menu = await screen.findByTestId('menu');

    expect(primary.classList).toContain(
      `${ComponentClassName['ToggleButton']}--primary`
    );
    expect(link.classList).toContain(
      `${ComponentClassName['ToggleButton']}--link`
    );
    expect(menu.classList).toContain(
      `${ComponentClassName['ToggleButton']}--menu`
    );
  });

  it('should set size and variation correctly', async () => {
    render(<ToggleButton size="large" variation="primary" />);
    const toggleButton = await screen.findByRole('button');
    expect(toggleButton).toHaveClass(`${ComponentClassName.Button}--large`);
    expect(toggleButton).toHaveClass(`${ComponentClassName.Button}--primary`);
  });

  it('should be disabled if isDisabled is set to true', async () => {
    render(<ToggleButton isDisabled />);
    const toggleButton = await screen.findByRole('button');
    expect(toggleButton).toBeDisabled();
  });

  it('should set aria-label if ariaLabel is provided', async () => {
    render(<ToggleButton ariaLabel="label-test" />);
    const toggleButton = await screen.findByRole('button');
    expect(toggleButton).toHaveAttribute('aria-label', 'label-test');
  });

  it('should call onClick if provided', async () => {
    const onClick = jest.fn();
    render(<ToggleButton onClick={onClick} />);
    const toggleButton = await screen.findByRole('button');
    await act(async () => {
      await userEvent.click(toggleButton);
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should works in uncontrolled way', async () => {
    render(<ToggleButton defaultPressed={false} />);
    const toggleButton = await screen.findByRole('button');
    await act(async () => {
      await userEvent.click(toggleButton);
    });
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
    await act(async () => {
      await userEvent.click(toggleButton);
    });
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should works in controlled way', async () => {
    render(<ControlledToggleButton />);
    const toggleButton = await screen.findByRole('button');
    await act(async () => {
      await userEvent.click(toggleButton);
    });
    expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
    await act(async () => {
      await userEvent.click(toggleButton);
    });
    expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ToggleButton ref={ref} />);

    await screen.findByRole('button');
    expect(ref.current?.nodeName).toBe('BUTTON');
  });
});
