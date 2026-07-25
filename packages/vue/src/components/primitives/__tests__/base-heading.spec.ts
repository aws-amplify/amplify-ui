import { h } from 'vue';
import { render } from '@testing-library/vue';

import BaseHeading from '../base-heading.vue';

describe('BaseHeading', () => {
  it('renders a default-level heading from the default slot', () => {
    const { container } = render(BaseHeading, {
      slots: {
        default: () => 'Sign in',
      },
    });

    const heading = container.querySelector('h1');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Sign in');
  });

  it('renders the requested heading level', () => {
    const { container } = render(BaseHeading, {
      props: { level: 3 },
      slots: {
        default: () => 'Create account',
      },
    });

    expect(container.querySelector('h3')).toBeTruthy();
  });

  it('wraps default slot content when the headingI slot has no children', () => {
    const { container } = render(BaseHeading, {
      props: { level: 2 },
      slots: {
        default: () => 'Wrapped content',
        // an element vnode with an empty children array hits the wrap branch
        headingI: () => h('span', {}, []),
      },
    });

    const heading = container.querySelector('h2');
    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Wrapped content');
  });

  it('renders provided headingI slot content when it has children', () => {
    const { getByText } = render(BaseHeading, {
      props: { level: 2 },
      slots: {
        default: () => 'fallback',
        headingI: () => h('span', {}, [h('em', 'Custom heading')]),
      },
    });

    expect(getByText('Custom heading')).toBeTruthy();
  });
});
