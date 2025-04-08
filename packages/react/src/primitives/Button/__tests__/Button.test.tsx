import * as React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Button } from '../Button';
import { Fieldset } from '../../Fieldset';
import { ButtonColorTheme } from '../../types';
import { ComponentClassName } from '@aws-amplify/ui';

const SUPPORTED_COLOR_THEMES: ButtonColorTheme[] = [
  'info',
  'success',
  'warning',
  'error',
  'overlay',
];

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

    expect(primary.classList).toContain(
      `${ComponentClassName['Button']}--primary`
    );
    expect(link.classList).toContain(`${ComponentClassName['Button']}--link`);
    expect(menu.classList).toContain(`${ComponentClassName['Button']}--menu`);
  });

  it.each(SUPPORTED_COLOR_THEMES)(
    'should render the %s color theme for the default variation',
    async (colorTheme) => {
      const testId = `default-${colorTheme}-ColorTheme`;
      render(<Button testId={testId} colorTheme={colorTheme} />);
      const button = await screen.findByTestId(testId);
      expect(button.classList).toContain(
        `amplify-button--outlined--${colorTheme}`
      );
    }
  );

  it.each(SUPPORTED_COLOR_THEMES)(
    'should render the %s color theme for the primary variation',
    async (colorTheme) => {
      const testId = `primary-${colorTheme}-ColorTheme`;
      render(
        <Button variation="primary" testId={testId} colorTheme={colorTheme} />
      );
      const button = await screen.findByTestId(testId);
      expect(button.classList).toContain(
        `amplify-button--primary--${colorTheme}`
      );
    }
  );

  it.each(SUPPORTED_COLOR_THEMES)(
    'should render the %s color theme for the link variation',
    async (colorTheme) => {
      const testId = `link-${colorTheme}-ColorTheme`;
      render(
        <Button variation="link" testId={testId} colorTheme={colorTheme} />
      );
      const button = await screen.findByTestId(testId);
      expect(button.classList).toContain(`amplify-button--link--${colorTheme}`);
    }
  );

  it('should not render a color theme class for menu, warning, and destructive variations', async () => {
    render(
      <div>
        <Button
          testId="warningWarning"
          variation="warning"
          colorTheme="warning"
        >
          warning
        </Button>
        <Button
          testId="destructiveWarning"
          variation="destructive"
          colorTheme="warning"
        >
          destructive
        </Button>
        <Button testId="menuWarning" variation="menu" colorTheme="warning">
          destructive
        </Button>
      </div>
    );
    const warningWarning = await screen.findByTestId('warningWarning');
    const destructiveWarning = await screen.findByTestId('destructiveWarning');
    const menuWarning = await screen.findByTestId('menuWarning');

    expect(warningWarning.classList).not.toContain(
      'amplify-button--warning--warning'
    );
    expect(destructiveWarning.classList).not.toContain(
      'amplify-button--destructive--warning'
    );
    expect(menuWarning.classList).not.toContain(
      'amplify-button--menu--warning'
    );
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

  it('should render button states', async () => {
    render(
      <div>
        <Button isFullWidth testId="fullwidth">
          Full Width
        </Button>
        <Button isDisabled testId="disabled">
          Disabled
        </Button>
        <Button isLoading testId="loading">
          Disabled
        </Button>
      </div>
    );

    const fullwidth = await screen.findByTestId('fullwidth');
    const disabled = await screen.findByTestId('disabled');
    const loading = await screen.findByTestId('loading');

    expect(fullwidth.classList).toContain(
      `${ComponentClassName['Button']}--fullwidth`
    );
    expect(disabled.classList).toContain(
      `${ComponentClassName['Button']}--disabled`
    );
    expect(loading.classList).toContain(
      `${ComponentClassName['Button']}--loading`
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

    expect(small.classList).toContain(`${ComponentClassName['Button']}--small`);
    expect(large.classList).toContain(`${ComponentClassName['Button']}--large`);
  });

  it('should render classname and custom classname', async () => {
    const className = 'test-class';
    render(<Button className={className} />);

    const button = await screen.findByRole('button');
    expect(button).toHaveClass(ComponentClassName.Button, className);
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
    expect(button).toHaveClass(`amplify-button--${size}`);
    expect(button).toHaveClass(`amplify-button--${variation}`);
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

  it('should always be disabled if parent Fieldset isDisabled', async () => {
    render(
      <Fieldset legend="legend" isDisabled>
        <Button testId="button" />
        <Button testId="buttonWithDisabledProp" isDisabled={false} />
      </Fieldset>
    );

    const button = await screen.findByTestId('button');
    const buttonDisabled = await screen.findByTestId('buttonWithDisabledProp');
    expect(button).toHaveAttribute('disabled');
    expect(buttonDisabled).toHaveAttribute('disabled');
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
    expect(loaderWrapper).toHaveClass(ComponentClassName.ButtonLoaderWrapper);

    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveClass(ComponentClassName.Loader);
  });

  it('should pass size to Loader correctly if size is set', async () => {
    render(<Button loadingText="loading" size="small" isLoading />);

    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveClass('amplify-loader--small');
  });

  it('should render Loader correctly without loadingText and isLoading is set to true', async () => {
    render(<Button isLoading />);

    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveClass(ComponentClassName.Loader);
  });

  it('should fire onClick function if the button is clicked on', async () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick} />);

    const button = await screen.findByRole('button');
    await act(async () => {
      await userEvent.click(button);
    });
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
