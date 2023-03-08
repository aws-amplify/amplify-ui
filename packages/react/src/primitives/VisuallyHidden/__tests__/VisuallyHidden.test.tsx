import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { VisuallyHidden } from '../VisuallyHidden';
import { ComponentClassNames } from '../../shared/constants';

const hiddenContent = 'A hidden text';

describe('VisuallyHidden test suite', () => {
  it('should render classname correctly', async () => {
    render(<VisuallyHidden>{hiddenContent}</VisuallyHidden>);

    const visuallyHidden = await screen.findByText(hiddenContent);
    expect(visuallyHidden).toHaveClass(ComponentClassNames.VisuallyHidden);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLSpanElement>();
    render(<VisuallyHidden ref={ref}>{hiddenContent}</VisuallyHidden>);

    await screen.findByText(hiddenContent);
    expect(ref.current?.nodeName).toBe('SPAN');
  });
});
