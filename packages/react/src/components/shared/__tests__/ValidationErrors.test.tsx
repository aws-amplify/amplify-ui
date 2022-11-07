import React from 'react';
import { render, screen } from '@testing-library/react';
import { ValidationErrors } from '../ValidationErrors';

describe('ValidationErrors', () => {
  it('renders errors as expected', async () => {
    const { container } = render(
      <ValidationErrors errors={['mock error 1', 'mock error 2']} />
    );
    expect(container).toMatchSnapshot();
    expect(await screen.findByText('mock error 1')).toBeDefined();
    expect(await screen.findByText('mock error 2')).toBeDefined();
  });

  it('renders nothing if there are no errors', async () => {
    const { container } = render(<ValidationErrors errors={[]} />);
    expect(container).toMatchInlineSnapshot(`<div />`);
  });

  it('renders dataAttr as expected', () => {
    const dataAttr = 'data-amplify-sign-up-errors';
    const { container } = render(
      <ValidationErrors
        dataAttr={dataAttr}
        errors={['mock error 1', 'mock error 2']}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
