import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { DescriptionBullet } from '../DescriptionBullet';

describe('DescriptionBullet', () => {
  it('should render the component content appropriately', () => {
    const desc = 'some-desc';
    const index = 2;

    render(<DescriptionBullet desc={desc} index={index} />);

    expect(screen.getByText(desc)).toBeInTheDocument();
    expect(screen.getByText(index)).toBeInTheDocument();
  });
});
