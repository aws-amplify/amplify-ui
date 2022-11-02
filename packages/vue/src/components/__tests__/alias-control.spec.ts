import AliasControl from '../alias-control.vue';
import { components } from '../../../global-spec';
import { render, screen } from '@testing-library/vue';

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
});
