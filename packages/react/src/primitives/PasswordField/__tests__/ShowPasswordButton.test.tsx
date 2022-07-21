import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { PasswordField } from '../PasswordField';
import { ShowPasswordButton } from '../ShowPasswordButton';
import { ComponentClassNames, ComponentText } from '../../shared/constants';
import userEvent from '@testing-library/user-event';

const { passwordHidden, passwordShown } = ComponentText.PasswordField;

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
    const visuallyHidden = await screen.findByText(passwordHidden);

    expect(passwordField.getAttribute('type')).toBe('password');
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(visuallyHidden.textContent).toBe(passwordHidden);

    userEvent.click(button);

    expect(passwordField.getAttribute('type')).toBe('text');
    expect(button.getAttribute('aria-checked')).toBe('true');
    expect(visuallyHidden.textContent).toBe(passwordShown);

    userEvent.click(button);

    expect(passwordField.getAttribute('type')).toBe('password');
    expect(button.getAttribute('aria-checked')).toBe('false');
    expect(visuallyHidden.textContent).toBe(passwordHidden);
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
});
