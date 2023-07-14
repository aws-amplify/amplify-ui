import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { PasswordField } from '../PasswordField';
import { ComponentClassNames, ComponentText } from '../../shared/constants';

describe('PasswordField component', () => {
  const testId = 'PasswordFieldTestId';
  it('should render classname for PasswordField', async () => {
    render(
      <PasswordField
        testId={testId}
        label="Password"
        descriptiveText="Required"
        name="password"
        className="custom-class"
      />
    );

    const passwordFieldWrapper = await screen.findByTestId(testId);

    expect(passwordFieldWrapper).toHaveClass('custom-class');
    expect(passwordFieldWrapper).toHaveClass(ComponentClassNames.PasswordField);
  });

  it('should forward refs to DOM elements', async () => {
    const ref = React.createRef<HTMLInputElement>();
    const showPasswordButtonRef = React.createRef<HTMLButtonElement>();
    render(
      <PasswordField
        testId={testId}
        label="Password"
        ref={ref}
        showPasswordButtonRef={showPasswordButtonRef}
      />
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('INPUT');
    expect(showPasswordButtonRef.current?.nodeName).toBe('BUTTON');
  });

  it('should be password input type', async () => {
    render(
      <PasswordField
        label="Password"
        descriptiveText="Required"
        name="password"
        placeholder="Password"
      />
    );

    const passwordField = await screen.findByPlaceholderText('Password');
    expect(passwordField.getAttribute('type')).toBe('password');
  });

  it('should be able to set a size', async () => {
    render(
      <PasswordField
        label="Password"
        descriptiveText="Required"
        name="password"
        hideShowPassword
        placeholder="Password"
        size="large"
      />
    );

    const passwordField = await screen.findByPlaceholderText('Password');
    expect(passwordField.dataset['size']).toBe('large');
  });

  it('should render size classes for PasswordField', async () => {
    render(
      <div>
        <PasswordField size="small" testId="small" label="small" />
        <PasswordField size="large" testId="large" label="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(`${ComponentClassNames['Field']}--small`);
    expect(large.classList).toContain(`${ComponentClassNames['Field']}--large`);
  });

  it('should have show password button', async () => {
    render(
      <PasswordField
        label="Password"
        descriptiveText="Required"
        name="password"
      />
    );

    const button = await screen.findByRole('switch');
    expect(button).toBeDefined();
    expect(button.getAttribute('aria-label')).toBe(
      ComponentText.PasswordField.showPassword
    );
  });

  it('should be able to hide show password button', () => {
    render(
      <PasswordField
        label="Password"
        descriptiveText="Required"
        name="password"
        hideShowPassword
      />
    );

    const button = screen.queryByRole('button');
    expect(button).toBeNull();
  });

  it('should show error styling when field has error', async () => {
    render(
      <PasswordField
        label="Password"
        name="password"
        hasError={true}
        placeholder="Password"
      />
    );
    const input = await screen.findByPlaceholderText('Password');
    const button = await screen.findByRole('switch');
    expect(input.classList).toContain(`${ComponentClassNames.Input}--error`);
    expect(button.classList).toContain(
      `${ComponentClassNames.FieldShowPassword}--error`
    );
  });
});
