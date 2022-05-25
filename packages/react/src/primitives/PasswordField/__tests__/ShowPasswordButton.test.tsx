import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ShowPasswordButton } from '../ShowPasswordButton';
import { ComponentClassNames, ComponentText } from '../../shared/constants';

const ariaLabelText = ComponentText.PasswordField;

describe('ShowPasswordButton component', () => {
  const testId = 'testId';

  it('should render default classname for ShowPasswordButton', async () => {
    render(<ShowPasswordButton fieldType="password" />);

    const button = await screen.findByRole('button');

    expect(button).toHaveClass(ComponentClassNames.FieldShowPassword);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ShowPasswordButton fieldType="password" ref={ref} />);

    await screen.findByRole('button');

    expect(ref.current.nodeName).toBe('BUTTON');
  });

  it('should set correct ariaLabel for fieldType password', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<ShowPasswordButton fieldType="password" ref={ref} />);

    await screen.findByLabelText(ariaLabelText.showPasswordButtonLabel);

    expect(ref.current.nodeName).toBe('BUTTON');
  });

  it('should set correct ariaLabel for fieldType text', async () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(
      <ShowPasswordButton
        fieldType="text"
        className="custom-class"
        ref={ref}
        testId={testId}
      />
    );

    await screen.findByLabelText(ariaLabelText.hidePasswordButtonLabel);

    expect(ref.current.nodeName).toBe('BUTTON');
  });
});
