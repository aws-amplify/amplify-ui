import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { ComponentClassNames } from '../../shared';
import { Rating } from '../Rating';

const CustomIcon = ({ className }: { className: string }) => (
  <svg className={className}></svg>
);

describe('Rating', () => {
  it('should render a classname for Rating', async () => {
    render(<Rating testId="testId" className="my-rating-component" />);

    const rating = await screen.findByTestId('testId');
    expect(rating.className).toContain('my-rating-component');
  });

  it('should render size classes for Rating', async () => {
    render(
      <div>
        <Rating testId="small" size="small" />
        <Rating testId="large" size="large" />
      </div>
    );

    const small = await screen.findByTestId('small');
    const large = await screen.findByTestId('large');

    expect(small.classList).toContain(
      `${ComponentClassNames['Rating']}--small`
    );
    expect(large.classList).toContain(
      `${ComponentClassNames['Rating']}--large`
    );
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Rating testId="testId" ref={ref} />);

    await screen.findByTestId('testId');
    expect(ref.current?.nodeName).toBe('DIV');
  });

  it('should render the data-size attribute', async () => {
    render(<Rating testId="testId" size="small" />);

    const rating = await screen.findByTestId('testId');
    expect(rating.dataset['size']).toBe('small');
  });

  it('should render the empty icon color', () => {
    const { container } = render(<Rating testId="testId" emptyColor="red" />);

    const emptyIcon = container.getElementsByClassName(
      'amplify-rating-icon-empty'
    )[0];
    expect((emptyIcon['style'] as React.CSSProperties).color).toBe('red');
  });

  it('should render the filled icon color', () => {
    const { container } = render(
      <Rating testId="testId" value={2} fillColor="blue" />
    );

    const filledIcon = container.getElementsByClassName(
      'amplify-rating-icon-filled'
    )[0];
    expect((filledIcon['style'] as React.CSSProperties).color).toBe('blue');
  });

  it('should render filled icons when the value prop is used', () => {
    const { container } = render(<Rating testId="testId" value={2} />);

    const filledIcons = container.getElementsByClassName(
      'amplify-rating-icon-filled'
    );
    expect(filledIcons.length).toBe(2);
  });

  it('should render 2 filled and 3 empty icons', () => {
    const { container } = render(<Rating value={2} />);
    const filledIcons = container.getElementsByClassName(
      'amplify-rating-icon-filled'
    );
    const emptyIcons = container.getElementsByClassName(
      'amplify-rating-icon-empty'
    );
    expect(filledIcons.length).toBe(2);
    expect(emptyIcons.length).toBe(3);
  });

  it('should render 7 icons when the maxValue is set to 7', () => {
    const { container } = render(<Rating maxValue={7} />);
    const emptyIcons = container.getElementsByClassName(
      'amplify-rating-icon-empty'
    );
    expect(emptyIcons.length).toBe(7);
  });

  it('should render the passed in icon component', () => {
    const { container } = render(
      <Rating icon={<CustomIcon className="my-custom-component" />} />
    );
    const emptyIcons = container.getElementsByClassName('my-custom-component');
    expect(emptyIcons.length).toBe(5);
  });

  it('should render the passed in empty icon', () => {
    const { container } = render(
      <Rating
        emptyIcon={<CustomIcon className="my-custom-empty-icon" />}
        value={3}
      />
    );
    const emptyIcons = container.getElementsByClassName('my-custom-empty-icon');
    expect(emptyIcons.length).toBe(2);
  });

  it('should render both the passed in icon and empty icons', () => {
    const { container } = render(
      <Rating
        icon={<CustomIcon className="my-custom-filled-icon" />}
        emptyIcon={<CustomIcon className="my-custom-empty-icon" />}
        value={3}
      />
    );
    const emptyIcons = container.getElementsByClassName('my-custom-empty-icon');
    const filledIcons = container.getElementsByClassName(
      'my-custom-filled-icon'
    );
    expect(emptyIcons.length).toBe(2);
    expect(filledIcons.length).toBe(3);
  });
});
