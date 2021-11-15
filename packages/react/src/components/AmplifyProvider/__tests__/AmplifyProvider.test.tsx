import { render, screen } from '@testing-library/react';

import { AmplifyProvider } from '../index';
import { Heading } from '../../../primitives';

const App = () => {
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

  it('wraps the App in [data-amplify-theme="default-theme"]', () => {
    const { container } = render(
      <AmplifyProvider>
        <App />
      </AmplifyProvider>
    );

    const wrapper = container.querySelector('[data-amplify-theme]');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute('data-amplify-theme', 'default-theme');
  });
});
