import React from 'react';
import { render } from '@testing-library/react';

import { withFormProvider } from '..';

const Form = ({ pretend }: { pretend: string }) => <>{pretend}</>;

describe('withFormProvider', () => {
  it('renders a Provider wrapped Form as expected', () => {
    const WrappedForm = withFormProvider(Form);

    const { container } = render(<WrappedForm pretend="value" />);

    expect(container).toMatchSnapshot();
  });
});
