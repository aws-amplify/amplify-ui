import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PasswordField } from '../PasswordField';
import { ComponentClassNames, SharedText } from '../../shared';
import { LABEL_HIDDEN_DEPRECATED } from '../../../helpers/messages';
const originalWarn = console.warn;

const ariaLabelText = SharedText.ShowPasswordButton.ariaLabel;

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
    expect(ref.current.nodeName).toBe('INPUT');
    expect(showPasswordButtonRef.current.nodeName).toBe('BUTTON');
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

    const passwordField = await screen.getByPlaceholderText('Password');
    expect(passwordField.getAttribute('type')).toBe('password');
  });

  it('should be able to set a size', async () => {
    render(
      <PasswordField
        label="Password"
        descriptiveText="Required"
        name="password"
        hideShowPassword={true}
        placeholder="Password"
        size="large"
      />
    );

    const passwordField = await screen.getByPlaceholderText('Password');
    expect(passwordField.dataset['size']).toBe('large');
  });

  it('should have show password button', async () => {
    render(
      <PasswordField
        label="Password"
        descriptiveText="Required"
        name="password"
      />
    );

    const button = await screen.findByRole('button');
    expect(button).toBeDefined();
    expect(button.getAttribute('aria-label')).toBe(ariaLabelText.showPassword);
  });

  it('should be able to hide show password button', async () => {
    render(
      <PasswordField
        label="Password"
        descriptiveText="Required"
        name="password"
        hideShowPassword={true}
      />
    );

    const button = await screen.queryByRole('button');
    expect(button).toBeNull();
  });

  describe(' - ShowPasswordButton', () => {
    it('should toggle button type and label when clicked', async () => {
      render(
        <PasswordField
          label="Password"
          descriptiveText="Required"
          name="password"
          placeholder="Password"
        />
      );

      const button = await screen.findByRole('button');
      const passwordField = await screen.getByPlaceholderText('Password');

      expect(passwordField.getAttribute('type')).toBe('password');
      expect(button.getAttribute('aria-label')).toBe(
        ariaLabelText.showPassword
      );

      userEvent.click(button);

      expect(passwordField.getAttribute('type')).toBe('text');
      expect(button.getAttribute('aria-label')).toBe(
        ariaLabelText.hidePassword
      );

      userEvent.click(button);

      expect(passwordField.getAttribute('type')).toBe('password');
      expect(button.getAttribute('aria-label')).toBe(
        ariaLabelText.showPassword
      );
    });
  });

  describe('Label', () => {
    beforeAll(() => {
      console.warn = jest.fn();
    });
    afterAll(() => {
      console.warn = originalWarn;
    });

    it('should render expected field classname', async () => {
      render(<PasswordField label="Password" />);
      const label = (await screen.findByText('Password')) as HTMLLabelElement;
      expect(label).toHaveClass(ComponentClassNames.Label);
    });

    it('should show deprecation message when labelHidden is true', async () => {
      render(<PasswordField label="Password" labelHidden />);
      expect(console.warn).toHaveBeenLastCalledWith(LABEL_HIDDEN_DEPRECATED);
    });

    it('should have `amplify-visually-hidden` class when labelHidden is true', async () => {
      render(<PasswordField label="Password" labelHidden />);
      const label = await screen.findByText('Password');
      expect(label).toHaveClass('amplify-visually-hidden');
      expect(console.warn).toHaveBeenLastCalledWith(LABEL_HIDDEN_DEPRECATED);
    });

    it('should have `amplify-visually-hidden` class when isLabelHidden is true', async () => {
      render(<PasswordField label="Password" isLabelHidden />);
      const label = await screen.findByText('Password');
      expect(label).toHaveClass('amplify-visually-hidden');
    });
  });
});
