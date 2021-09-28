import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../Button';
import { ComponentClassNames } from '../../shared';

describe('Button test suite', () => {
  it('should render classname and custom classname', async () => {
    const className = 'test-class';
    render(<Button className={className} />);

    const button = await screen.findByRole('button');
    expect(button).toHaveClass(ComponentClassNames.Button, className);
  });

  it('should set size and variation props correctly', async () => {
    const size = 'large';
    const variation = 'primary';
    render(<Button size={size} variation={variation} />);

    const button = await screen.findByRole('button');
    expect(button).toHaveAttribute('data-size', size);
    expect(button).toHaveAttribute('data-variation', variation);
  });

  it('should set aria-label correctly if ariaLabel is provided', async () => {
    render(<Button ariaLabel="test-label" />);

    const button = await screen.findByRole('button');
    expect(button).toHaveAttribute('aria-label', 'test-label');
  });

  it('should be disabled if isDisabled is set to true', async () => {
    render(<Button isDisabled />);

    const button = await screen.findByRole('button');
    expect(button).toBeDisabled();
  });

  it('should set loading state correctly if isLoading is set to true', async () => {
    render(<Button loadingText="loading" isLoading />);

    const button = await screen.findByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('loading');
  });

  it('should fire onClick function if the button is clicked on', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);

    const button = await screen.findByRole('button');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
