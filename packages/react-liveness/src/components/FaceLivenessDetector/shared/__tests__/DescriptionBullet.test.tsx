import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { DescriptionBullet } from '../DescriptionBullet';

describe('DescriptionBullet', () => {
  it('should render the component content appropriately', () => {
    const children = 'some-desc';
    const index = 2;

    render(<DescriptionBullet index={index}>{children}</DescriptionBullet>);

    expect(screen.getByText(children)).toBeInTheDocument();
    expect(screen.getByText(`${index}.`)).toBeInTheDocument();
  });
});
