import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { VisuallyHidden } from '../VisuallyHidden';
import { ComponentClassName } from '@aws-amplify/ui';

const hiddenContent = 'A hidden text';

describe('VisuallyHidden test suite', () => {
  it('should render classname correctly', async () => {
    render(<VisuallyHidden>{hiddenContent}</VisuallyHidden>);

    const visuallyHidden = await screen.findByText(hiddenContent);
    expect(visuallyHidden).toHaveClass(ComponentClassName.VisuallyHidden);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<VisuallyHidden ref={ref}>{hiddenContent}</VisuallyHidden>);

    await screen.findByText(hiddenContent);
    expect(ref.current?.nodeName).toBe('SPAN');
  });
});
