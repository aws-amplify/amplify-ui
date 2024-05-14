import { render, screen } from '@testing-library/vue';

import { components } from '../../../global-spec';
import AliasControl from '../alias-control.vue';

describe('AliasControl', () => {
  it('renders a label with default class', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Username',
        name: 'username',
        placeholder: 'Username',
      },
    });
    const label = await screen.findByText('Username');
    expect(label).toHaveClass('amplify-label');
  });

  it('should add `amplify-visually-hidden` class to label when labelHidden is true', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Username',
        labelHidden: true,
        name: 'username',
        placeholder: 'Username',
      },
    });

    const label = await screen.findByText('Username');
    expect(label).toHaveClass('amplify-visually-hidden');
  });

  it('renders text field with default class and attributes', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Username',
        name: 'username',
        placeholder: 'Username',
      },
    });
    const field = await screen.findByRole('textbox');
    expect(field).toHaveClass('amplify-input', 'amplify-field-group__control');
    expect(field).toHaveAttribute('type', 'text');
  });

  it('renders phone number field with default class and attributes', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Phone Number',
        name: 'phone_number',
        placeholder: 'Phone Number',
        type: 'tel',
      },
    });
    const field = await screen.findByLabelText('Phone Number');
    expect(field).toHaveAttribute('type', 'tel');
  });

  it('does not add required attribute if field is optional', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Username',
        name: 'username',
        placeholder: 'Username',
        required: false,
      },
    });
    const field = await screen.findByLabelText('Username');
    expect(field).not.toHaveAttribute('required');
  });

  it('hides label if labelHidden is true', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Enter your Username',
        name: 'username',
        placeholder: 'Username',
        labelHidden: true,
      },
    });
    expect(screen.queryByText('Enter your Username')).toHaveClass(
      'amplify-visually-hidden'
    );
  });

  it('should add aria-invalid attribute to text field when hasError is true', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Username',
        name: 'username',
        placeholder: 'Username',
        hasError: true,
      },
    });

    const field = await screen.findByRole('textbox');
    expect(field).toHaveAttribute('aria-invalid');
  });

  it('renders text field with autocapitalize disabled by default', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Username',
        name: 'username',
        placeholder: 'Username',
      },
    });
    const field = await screen.findByRole('textbox');
    expect(field).toHaveAttribute('autocapitalize', 'off');
  });
});
