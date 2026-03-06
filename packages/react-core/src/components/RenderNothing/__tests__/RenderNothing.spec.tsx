import React from 'react';
import { render } from '@testing-library/react';

import RenderNothing from '../RenderNothing';

describe('RenderNothing', () => {
  it('renders nothing', () => {
    const { container } = render(<RenderNothing />);

    expect(container).toBeEmptyDOMElement();
  });
});
