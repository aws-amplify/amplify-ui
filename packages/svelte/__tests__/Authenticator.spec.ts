import { describe, expect, it } from 'vitest';
import Authenticator from '../src/lib/components/Authenticator/Authenticator.svelte';
import { render } from '@testing-library/svelte';

describe('Authenticator', () => {
  it('Authenticator Exists', () => {
    const wrapper = render(Authenticator);

    expect(wrapper).toBeTruthy();
  });
});
