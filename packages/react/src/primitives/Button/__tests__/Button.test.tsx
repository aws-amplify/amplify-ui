import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../Button';
import { ComponentClassNames } from '../../shared';

describe('Button test suite', () => {
  it('should render button variations', async () => {
    render(
      <div>
        <Button variation="primary" testId="primary">
          Primary
        </Button>
        <Button variation="link" testId="link">
          Link
        </Button>
        <Button variation="menu" testId="menu">
          Menu
        </Button>
        <Button variation="warning" testId="warning">
          Warning
        </Button>
        <Button variation="destructive" testId="destructive">
          Destructive
        </Button>
      </div>
    );

    const primary = await screen.findByTestId('primary');
    const link = await screen.findByTestId('link');
    const menu = await screen.findByTestId('menu');
    const warning = await screen.findByTestId('warning');
    const destructive = await screen.findByTestId('destructive');

    expect(primary.classList).toContain('amplify-button--primary');
    expect(link.classList).toContain('amplify-button--link');
    expect(menu.classList).toContain('amplify-button--menu');
    expect(warning.classList).toContain('amplify-button--warning');
    expect(destructive.classList).toContain('amplify-button--destructive');
  });

  it('should add the disabled class with the disabled attribute', async () => {
    render(
      <Button disabled testId="disabled">
        Disabled
      </Button>
    );

    const disabled = await screen.findByTestId('disabled');

    expect(disabled).toHaveClass('amplify-button--disabled');
  });

  it('should render button variations', async () => {
    render(
      <div>
        <Button variation="primary" testId="primary">
          Primary
        </Button>
        <Button variation="link" testId="link">
          Link
        </Button>
        <Button variation="menu" testId="menu">
          Link
        </Button>
      </div>
    );

    const primary = await screen.findByTestId('primary');
    const link = await screen.findByTestId('link');
    const menu = await screen.findByTestId('menu');

    expect(primary.classList).toContain(
      `${ComponentClassNames['Button']}--primary`
    );
    expect(link.classList).toContain(`${ComponentClassNames['Button']}--link`);
    expect(menu.classList).toContain(`${ComponentClassNames['Button']}--menu`);
  });

  it('should render button states', async () => {
    render(
      <div>
        <Button isFullWidth={true} testId="fullwidth">
          Full Width
        </Button>
        <Button isDisabled={true} testId="disabled">
          Disabled
        </Button>
        <Button isLoading={true} testId="loading">
          Disabled
        </Button>
      </div>
    );

    const fullwidth = await screen.findByTestId('fullwidth');
    const disabled = await screen.findByTestId('disabled');
    const loading = await screen.findByTestId('loading');

    expect(fullwidth.classList).toContain(
      `${ComponentClassNames['Button']}--fullwidth`
    );
    expect(disabled.classList).toContain(
      `${ComponentClassNames['Button']}--disabled`
    );
    expect(loading.classList).toContain(
      `${ComponentClassNames['Button']}--loading`
    );
  });

  it('should render button sizes', async () => {
    render(
      <div>
        <Button size="small" testId="small">
          Small
        </Button>
        <Button size="large" testId="large">
          Large
        </Button>
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(
      `${ComponentClassNames['Button']}--small`
    );
    expect(large.classList).toContain(
      `${ComponentClassNames['Button']}--large`
    );
  });

  it('should render classname and custom classname', async () => {
    const className = 'test-class';
    render(<Button className={className} />);

    const button = await screen.findByRole('button');
    expect(button).toHaveClass(ComponentClassNames.Button, className);
  });

  it('should forward ref to button DOM element', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    const buttonText = 'Hello there';

    render(<Button ref={ref}>{buttonText}</Button>);

    await screen.findByRole('button');
    expect(ref.current?.nodeName).toBe('BUTTON');
    expect(ref.current?.innerHTML).toBe(buttonText);
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

  it('should render Loader correctly if isLoading is set to true', async () => {
    render(<Button loadingText="loading" isLoading />);

    const loaderWrapper = await screen.findByText('loading');
    expect(loaderWrapper).toHaveClass(ComponentClassNames.ButtonLoaderWrapper);

    const loader = await screen.findByRole('img');
    expect(loader).toHaveClass(ComponentClassNames.Loader);
  });

  it('should pass size to Loader correctly if size is set', async () => {
    render(<Button loadingText="loading" size="small" isLoading />);

    const loader = await screen.findByRole('img');
    expect(loader).toHaveAttribute('data-size', 'small');
  });

  it('should render Loader correctly without loadingText and isLoading is set to true', async () => {
    render(<Button isLoading />);

    const loader = await screen.findByRole('img');
    expect(loader).toHaveClass(ComponentClassNames.Loader);
  });

  it('should fire onClick function if the button is clicked on', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);

    const button = await screen.findByRole('button');
    userEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
