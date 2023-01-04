import PasswordControl from '../password-control.vue';
import { components } from '../../../global-spec';
import { render } from '@testing-library/vue';

describe('PasswordControl', () => {
  it('should render as expected', () => {
    const { container } = render(PasswordControl, {
      global: { components },
      props: {
        name: 'my-password',
        label: 'Password',
        autocomplete: 'new-password',
        hasError: false,
      },
    });

    expect(container).toMatchSnapshot();
  });
});
