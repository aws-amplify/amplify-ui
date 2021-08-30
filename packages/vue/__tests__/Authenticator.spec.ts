import { shallowMount } from '@vue/test-utils';
import { SignIn } from '../src/components/index';

describe('Authenticator', () => {
  it('Authenticator Exists', () => {
    const wrapper = shallowMount(SignIn);

    expect(wrapper).toBeTruthy();
  });
});
