import { mount } from '@vue/test-utils';
import { Authenticator } from '../dist';

describe('Authenticator', () => {
  it('Authenticator Exists', () => {
    const wrapper = mount(Authenticator);

    expect(wrapper).toBeTruthy();
  });
});
