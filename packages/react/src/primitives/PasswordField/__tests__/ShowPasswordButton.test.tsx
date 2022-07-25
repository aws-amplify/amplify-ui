import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { PasswordField } from '../PasswordField';
import { ShowPasswordButton } from '../ShowPasswordButton';
import { ComponentClassNames, ComponentText } from '../../shared/constants';
import userEvent from '@testing-library/user-event';

const { passwordIsHidden, passwordIsShown } = ComponentText.PasswordField;

describe('ShowPasswordButton component', () => {
  it('should render default classname for ShowPasswordButton', async () => {
    render(<ShowPasswordButton fieldType="password" />);

    const button = await screen.findByRole('switch');

    expect(button).toHaveClass(ComponentClassNames.FieldShowPassword);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ShowPasswordButton fieldType="password" ref={ref} />);

    await screen.findByRole('switch');

    expect(ref.current?.nodeName).toBe('BUTTON');
  });

  it('should toggle field type, screen reader context, and aria-checked when clicked', async () => {
    render(
      <PasswordField
        label="Password"
        descriptiveText="Required"
        name="password"
        placeholder="Password"
      />
    );

    const passwordField = await screen.findByPlaceholderText('Password');
    const button = await screen.findByRole('switch');
    const visuallyHidden = await screen.findByText(passwordIsHidden);

    expect(passwordField.getAttribute('type')).toBe('password');
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(visuallyHidden.textContent).toBe(passwordIsHidden);

    userEvent.click(button);

    expect(passwordField.getAttribute('type')).toBe('text');
    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(visuallyHidden.textContent).toBe(passwordIsShown);

    userEvent.click(button);

    expect(passwordField.getAttribute('type')).toBe('password');
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(visuallyHidden.textContent).toBe(passwordIsHidden);
  });

  it('should be able to customize show password button label', async () => {
    const showPasswordButtonLabel = 'Show my password';

    render(
      <PasswordField
        label="Password"
        name="password"
        placeholder="Password"
        showPasswordButtonLabel={showPasswordButtonLabel}
      />
    );

    const button = await screen.findByRole('switch');
    expect(button).toHaveAttribute('aria-label', showPasswordButtonLabel);
  });

  it('should be able to customize passwordIsHiddenLabel and passwordIsShownLabel', async () => {
    const passwordIsHiddenLabel = 'Your password is hidden';
    const passwordIsShownLabel = 'Your password is visible';

    render(
      <PasswordField
        label="Password"
        name="password"
        placeholder="Password"
        passwordIsHiddenLabel={passwordIsHiddenLabel}
        passwordIsShownLabel={passwordIsShownLabel}
      />
    );

    const button = await screen.findByRole('switch');
    const visuallyHidden = await screen.findByText(passwordIsHiddenLabel);

    expect(visuallyHidden.textContent).toBe(passwordIsHiddenLabel);

    userEvent.click(button);

    expect(visuallyHidden.textContent).toBe(passwordIsShownLabel);
  });
});
