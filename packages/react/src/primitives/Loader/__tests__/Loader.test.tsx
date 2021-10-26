import { render, screen } from '@testing-library/react';

import {
  Loader,
  CIRCULAR_EMPTY,
  CIRCULAR_FILLED,
  LINEAR_EMPTY,
  LINEAR_FILLED,
} from '../Loader';
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

  it('should set emptyColor and filledColor for circular Loader', async () => {
    const emptyColor = 'gray';
    const filledColor = 'blue';
    render(<Loader emptyColor={emptyColor} filledColor={filledColor} />);
    const circularEmpty = await screen.findByTestId(CIRCULAR_EMPTY);
    const circularFilled = await screen.findByTestId(CIRCULAR_FILLED);
    expect(circularEmpty).toHaveStyle({ stroke: emptyColor });
    expect(circularFilled).toHaveStyle({ stroke: filledColor });
  });

  it('should set emptyColor and filledColor for linear Loader', async () => {
    const emptyColor = 'black';
    const filledColor = 'orange';
    render(
      <Loader
        variation="linear"
        emptyColor={emptyColor}
        filledColor={filledColor}
      />
    );
    const linearEmpty = await screen.findByTestId(LINEAR_EMPTY);
    const linearFilled = await screen.findByTestId(LINEAR_FILLED);
    expect(linearEmpty).toHaveStyle({ stroke: emptyColor });
    expect(linearFilled).toHaveStyle({ stroke: filledColor });
  });
});
