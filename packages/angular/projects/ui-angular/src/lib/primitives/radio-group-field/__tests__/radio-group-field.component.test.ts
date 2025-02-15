import { render, screen } from '@testing-library/angular';

import { RadioGroupFieldComponent } from '../radio-group-field.component';
import { ComponentClassName } from '@aws-amplify/ui';

jest.mock('nanoid', () => ({ nanoid: jest.fn(() => 'static') }));

const fieldProps = {
  name: 'mfa_type',
  label: 'Select MFA Type',
  required: true,
  radioOptions: [
    {
      label: 'EMAIL',
      value: 'EMAIL',
    },
    {
      label: 'TOTP',
      value: 'TOTP',
    },
  ],
};

describe('amplify-radio-group-field', () => {
  it('renders as expected', async () => {
    const { container } = await render(RadioGroupFieldComponent, {
      componentProperties: fieldProps,
      declarations: [RadioGroupFieldComponent],
    });
    expect(container).toMatchSnapshot();
  });

  it('renders a label with the default class', async () => {
    await render(RadioGroupFieldComponent, {
      componentProperties: fieldProps,
      declarations: [RadioGroupFieldComponent],
    });
    const label = await screen.findByText(fieldProps.label);
    expect(label).toHaveClass(ComponentClassName.Label);
  });

  it('renders a radiogroup with default class and attributes', async () => {
    await render(RadioGroupFieldComponent, {
      componentProperties: fieldProps,
      declarations: [RadioGroupFieldComponent],
    });
    const label = await screen.findByText(fieldProps.label);
    expect(label).toHaveClass(ComponentClassName.Label);
  });

  it('should add `amplify-visually-hidden` class to label when labelHidden is true', async () => {
    await render(RadioGroupFieldComponent, {
      componentProperties: { ...fieldProps, labelHidden: true },
      declarations: [RadioGroupFieldComponent],
    });

    const radioGroup = await screen.findByText(fieldProps.label);
    expect(radioGroup).toHaveClass(ComponentClassName.VisuallyHidden);
  });

  it('should add aria-invalid attribute to radio group field when hasError is true', async () => {
    await render(RadioGroupFieldComponent, {
      componentProperties: { ...fieldProps, hasError: true },
      declarations: [RadioGroupFieldComponent],
    });

    const radioGroup = await screen.findByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-invalid');
  });

  it('renders radio field with correct number of options', async () => {
    await render(RadioGroupFieldComponent, {
      componentProperties: fieldProps,
      declarations: [RadioGroupFieldComponent],
    });

    const radioOptions = await screen.findAllByRole('radio');

    expect(radioOptions).toHaveLength(2);
  });

  it('renders radio field options with correct classes and attributes', async () => {
    await render(RadioGroupFieldComponent, {
      componentProperties: fieldProps,
      declarations: [RadioGroupFieldComponent],
    });
    const radioOptions = await screen.findAllByRole('radio');

    for (const radioOption of radioOptions) {
      expect(radioOption).toHaveAttribute('aria-labelledby');
      expect(radioOption).toHaveAttribute('value');
      expect(radioOption).toHaveAttribute('name', fieldProps.name);
    }
  });
});
