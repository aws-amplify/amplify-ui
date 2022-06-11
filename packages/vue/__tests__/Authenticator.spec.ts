import { mount } from '@vue/test-utils';
import { Authenticator } from '../dist';
import crypto from 'crypto';

// This is needed for jest to get crypto module needed by nanoid
Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr: Array<any>) => crypto.randomBytes(arr.length),
  },
});

describe('Authenticator', () => {
  it('Authenticator Exists', () => {
    const wrapper = mount(Authenticator);

    expect(wrapper).toBeTruthy();
  });
});
