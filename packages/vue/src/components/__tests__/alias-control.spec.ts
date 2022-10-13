import AliasControl from '../alias-control.vue';
import { components } from '../../../global-spec';
import { render, screen } from '@testing-library/vue';

// mock Math.random so that ids are statically generated
jest.spyOn(global.Math, 'random').mockReturnValue(0.123456789);

describe('AliasControl', () => {
  it('renders a label with the default class', async () => {
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

  it('label should have `amplify-visually-hidden` class when labelHidden is true', async () => {
    render(AliasControl, {
      global: {
        components,
      },
      props: {
        label: 'Username',
        name: 'username',
        placeholder: 'Username',
        labelHidden: true,
      },
    });

    const label = await screen.findByText('Username');
    expect(label).toHaveClass('amplify-visually-hidden');
  });

  it('renders text field with default classnames and attributes', async () => {
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

  it('field should add aria-invalid attribute to input when hasError is true', async () => {
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
