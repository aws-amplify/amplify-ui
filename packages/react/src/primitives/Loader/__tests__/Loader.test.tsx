import * as React from 'react';

import { render, screen } from '@testing-library/react';

import {
  Loader,
  CIRCULAR_EMPTY,
  CIRCULAR_FILLED,
  CIRCUMFERENCE,
  LINEAR_EMPTY,
  LINEAR_FILLED,
} from '../Loader';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Loader:', () => {
  it('should render default and custom classname', async () => {
    const className = 'class-test';
    render(<Loader className={className} />);
    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveClass(ComponentClassName.Loader, className);
  });

  it('should render size classes for Loader', async () => {
    render(
      <div>
        <Loader testId="small" size="small" />
        <Loader testId="large" size="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(`${ComponentClassName['Loader']}--small`);
    expect(large.classList).toContain(`${ComponentClassName['Loader']}--large`);
  });

  it('should render variation classes for Loader', async () => {
    render(
      <div>
        <Loader testId="linear" variation="linear" />
      </div>
    );

    const linear = await screen.findByTestId('linear');

    expect(linear.classList).toContain(
      `${ComponentClassName['Loader']}--linear`
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<SVGSVGElement>();
    render(<Loader ref={ref} />);

    await screen.findByRole('progressbar');
    expect(ref.current?.nodeName).toBe('svg');
  });

  it('should set size attribute', async () => {
    render(<Loader size="large" />);
    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveClass(`${ComponentClassName.Loader}--large`);
  });

  it('should set variation attribute', async () => {
    render(<Loader variation="linear" />);
    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveClass(`${ComponentClassName.Loader}--linear`);
  });

  it('should set ariaLabel', async () => {
    const ariaLabel = 'This is a label.';
    render(<Loader ariaLabel={ariaLabel} />);
    const loader = await screen.findByRole('progressbar');
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

  it('should render circular determinate loader correctly', async () => {
    const percentage = 80;
    render(<Loader percentage={percentage} isDeterminate />);

    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveClass(`${ComponentClassName.Loader}--determinate`);

    const circularFilled = await screen.findByTestId(CIRCULAR_FILLED);
    expect(circularFilled).toHaveStyle({
      strokeDasharray: `${CIRCUMFERENCE}% ${CIRCUMFERENCE}%`,
      strokeDashoffset: `${
        CIRCUMFERENCE - (CIRCUMFERENCE * percentage) / 100
      }%`,
    });

    const textContent = `${percentage}%`;
    const percentageText = await screen.findByText(textContent);
    expect(percentageText).toHaveClass(ComponentClassName.LoaderLabel);
    expect(percentageText).toHaveAttribute('aria-live', 'polite');
    expect(percentageText).toHaveTextContent(textContent);
  });

  it('should add visually hidden class to circular loader if isPercentageHidden is set to true', async () => {
    const percentage = 80;
    render(<Loader percentage={80} isDeterminate isPercentageTextHidden />);

    const textContent = `${percentage}%`;
    const percentageText = await screen.findByText(textContent);
    expect(percentageText).toHaveClass(ComponentClassName.VisuallyHidden);
  });

  it('should render linear determinate loader correctly', async () => {
    const percentage = 80;
    render(<Loader percentage={percentage} variation="linear" isDeterminate />);

    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveClass(`${ComponentClassName.Loader}--determinate`);

    const linearFilled = await screen.findByTestId(LINEAR_FILLED);
    expect(linearFilled).toHaveAttribute('x2', `${percentage}%`);

    const textContent = `${percentage}%`;
    const percentageText = await screen.findByText(textContent);
    expect(percentageText).toHaveClass(ComponentClassName.LoaderLabel);
    expect(percentageText).toHaveAttribute('aria-live', 'polite');
    expect(percentageText).toHaveTextContent(textContent);
  });

  it('should add visually hidden class to linear loader if isPercentageHidden is set to true', async () => {
    const percentage = 80;
    render(
      <Loader
        percentage={80}
        variation="linear"
        isDeterminate
        isPercentageTextHidden
      />
    );

    const textContent = `${percentage}%`;
    const percentageText = await screen.findByText(textContent);
    expect(percentageText).toHaveClass(ComponentClassName.VisuallyHidden);
  });

  it('should render without aria-valuenow if not determinate state', async () => {
    render(<Loader />);

    const loader = await screen.findByRole('progressbar');
    expect(loader).not.toHaveAttribute('aria-valuenow');
  });

  it('should render with aria-valuenow attribute if in determinate state', async () => {
    render(<Loader isDeterminate percentage={50} />);
    const loader = await screen.findByRole('progressbar');
    expect(loader).toHaveAttribute('aria-valuenow', '50');
  });
});
