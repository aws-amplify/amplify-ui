import { render, screen } from '@testing-library/react';
import { useAmplify } from '../../../hooks';

import { AmplifyProvider } from '..';

const App = () => {
  const {
    components: { Heading },
  } = useAmplify();

  return <Heading>Howdy</Heading>;
};

describe('AmplifyProvider', () => {
  it('does not require props', async () => {
    render(
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    );

    const heading = await screen.getByText('Howdy');
    expect(heading.nodeName).toBe('H6');
  });

  it('wraps the APp in [data-amplify-theme="default-theme"]', () => {
    const { container } = render(
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    );

    const wrapper = container.querySelector('[data-amplify-theme]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper.getAttribute('data-amplify-theme')).toBe('default-theme');
  });

  it('accepts custom primitives as components', async () => {
    render(
      <AmplifyProvider
        components={{
          Heading({ children }) {
            return <h1>Custom {children}</h1>;
          },
        }}
      >
        <App />
      </AmplifyProvider>
    );

    const heading = await screen.getByText('Custom Howdy');
    expect(heading.nodeName).toBe('H1');
  });
});
