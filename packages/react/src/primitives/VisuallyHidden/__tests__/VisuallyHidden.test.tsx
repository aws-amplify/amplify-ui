import { render, screen } from '@testing-library/react';

import { VisuallyHidden } from '../VisuallyHidden';
import { ComponentClassNames } from '../../shared/constants';

describe('VisuallyHidden test suite', () => {
  it('should render classname correctly', async () => {
    const hiddenContent = 'A hidden text';
    render(<VisuallyHidden>{hiddenContent}</VisuallyHidden>);

    const visuallyHidden = await screen.findByText(hiddenContent);
    expect(visuallyHidden).toHaveClass(ComponentClassNames.VisuallyHidden);
  });
});
