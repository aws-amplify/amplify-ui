import React from 'react';
import { render } from '@testing-library/react';

import FormProvider from '../FormProvider';
import { FormHandle } from '../types';

describe('FormProvider', () => {
  it('exposes the FormHandle API', () => {
    const ref = React.createRef<FormHandle>();
    render(<FormProvider ref={ref} />);

    expect(ref.current?.getValues).toEqual(expect.any(Function));
    expect(ref.current?.reset).toEqual(expect.any(Function));
  });
});
