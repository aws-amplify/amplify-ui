import { render, screen } from '@testing-library/react';

import { Loader } from '../Loader';
import { ComponentClassNames } from '../../shared';

describe('Loader: ', () => {
  it('should render default and custom classname', async () => {
    const className = 'class-test';
    render(<Loader className={className} />);
    const loader = await screen.findByRole('img');
    expect(loader).toHaveClass(ComponentClassNames.Loader, className);
  });

  it('should set size attribute', async () => {
    render(<Loader size="large" />);
    const loader = await screen.findByRole('img');
    expect(loader).toHaveAttribute('data-size', 'large');
  });

  it('should set variation attribute', async () => {
    render(<Loader variation="linear" />);
    const loader = await screen.findByRole('img');
    expect(loader).toHaveAttribute('data-variation', 'linear');
  });

  it('should set ariaLabel', async () => {
    const ariaLabel = 'This is a label.';
    render(<Loader ariaLabel={ariaLabel} />);
    const loader = await screen.findByRole('img');
    expect(loader).toHaveAttribute('aria-label', ariaLabel);
  });
});
