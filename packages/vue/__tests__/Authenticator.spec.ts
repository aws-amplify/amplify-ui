import Authenticator from '../src/components/Authenticator.vue';
import { components } from '../global-spec';
import { render } from '@testing-library/vue';

describe('Authenticator', () => {
  it('Authenticator Exists', () => {
    const wrapper = render(Authenticator, {
      global: {
        components,
      },
    });

    expect(wrapper).toBeTruthy();
  });
});
