import { render, screen } from '@testing-library/vue';
import { components } from '../../../global-spec';

import RadioControl from '../radio-control.vue';

const fieldProps = {
  label: 'Select MFA Type',
  name: 'mfa_type',
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

describe('RadioControl', () => {
  it('renders a label with default class', async () => {
    render(RadioControl, {
      global: {
        components,
      },
      props: fieldProps,
    });

    const label = await screen.findByText(fieldProps.label);
    expect(label).toHaveClass('amplify-label');
  });

  it('renders radio field with default class and attributes', async () => {
    render(RadioControl, {
      global: {
        components,
      },
      props: fieldProps,
    });

    const radioGroup = await screen.findByRole('radiogroup');
    expect(radioGroup).toHaveClass('amplify-field', 'amplify-radiogroupfield');
  });

  it('should add `amplify-visually-hidden` class to label when labelHidden is true', async () => {
    render(RadioControl, {
      global: {
        components,
      },
      props: { ...fieldProps, labelHidden: true },
    });

    const radioGroup = await screen.findByText(fieldProps.label);
    expect(radioGroup).toHaveClass('amplify-visually-hidden');
  });
  it('should add aria-invalid attribute to radio group field when hasError is true', async () => {
    render(RadioControl, {
      global: {
        components,
      },
      props: { ...fieldProps, hasError: true },
    });

    const radioGroup = await screen.findByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-invalid');
  });
  it('renders radio field with correct number of options', async () => {
    render(RadioControl, {
      global: { components },
      props: fieldProps,
    });

    const radioOptions = await screen.findAllByRole('radio');

    expect(radioOptions).toHaveLength(2);
  });

  it('renders radio field options with correct classes and attributes', async () => {
    render(RadioControl, {
      global: { components },
      props: fieldProps,
    });

    const radioOptions = await screen.findAllByRole('radio');

    for (const radioOption of radioOptions) {
      expect(radioOption).toHaveAttribute('aria-labelledby');
      expect(radioOption).toHaveAttribute('value');
      expect(radioOption).toHaveAttribute('name', fieldProps.name);
    }
  });
});
