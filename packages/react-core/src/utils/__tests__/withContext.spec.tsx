import React from 'react';
import { render } from '@testing-library/react';

import { withContext } from '../withContext';

const Btn = ({ children, id }: any) => (
  <button data-testid="btn" id={id}>
    {children}
  </button>
);
const Context = React.createContext('Hello!');

describe('withContext', () => {
  it('returns a wrapped component', async () => {
    const WrappedBtn = withContext(Btn, Context);

    const { findByTestId } = render(<WrappedBtn id="hehe" />);

    const btnElement = await findByTestId('btn');
    expect(btnElement).toBeDefined();
    expect(btnElement.id).toBe('hehe');
  });

  it('provides the result of `resolveProps` to the target component', async () => {
    const WrappedBtn = withContext(Btn, Context, {
      resolveProps: (_props, id) => ({ id }),
    });

    const { findByTestId } = render(<WrappedBtn />);

    const btnElement = await findByTestId('btn');
    expect(btnElement).toBeDefined();
    expect(btnElement.id).toBe('Hello!');
  });
});
