import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassNames } from '../../shared';
import { ShowPasswordButton } from '../ShowPasswordButton';

import { SharedText } from '../../shared/i18n';
const ariaLabelText = SharedText.ShowPasswordButton.ariaLabel;

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

    await screen.findByLabelText(ariaLabelText.showPassword);

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

    await screen.findByLabelText(ariaLabelText.hidePassword);

    expect(ref.current.nodeName).toBe('BUTTON');
  });
});
