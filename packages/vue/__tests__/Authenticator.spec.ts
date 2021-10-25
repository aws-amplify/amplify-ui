import { shallowMount } from '@vue/test-utils';
import { Authenticator } from '../dist';

describe('Authenticator', () => {
  it('Authenticator Exists', () => {
    const wrapper = shallowMount(Authenticator);

    expect(wrapper).toBeTruthy();
  });
});
