import React from 'react';
import { render } from '@testing-library/react';
import { PromptControl } from '../PromptControl';

describe('PromptControl', () => {
  it('renders a PromptControl element', () => {
    const ref = React.createRef<HTMLInputElement | undefined>();
    const result = render(<PromptControl textInputRef={ref} />);
    expect(result.container).toBeDefined();
  });
});
