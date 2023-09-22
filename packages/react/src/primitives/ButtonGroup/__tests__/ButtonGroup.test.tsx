import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Button } from '../../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ButtonGroupProps, PrimitiveProps } from '../../types';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';

const ButtonGroupWithChildren = React.forwardRef<
  HTMLDivElement,
  ButtonGroupProps
>((props, ref) => {
  return (
    <ButtonGroup {...props} ref={ref}>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </ButtonGroup>
  );
});

describe('ButtonGroup', () => {
  it('should render classname and custom classname', async () => {
    const className = 'class-test';
    render(<ButtonGroupWithChildren className={className} />);

    const buttonGroup = await screen.findByRole('group');
    expect(buttonGroup).toHaveClass(ComponentClassName.ButtonGroup, className);
  });

  it('should render all flex style props', async () => {
    render(<ButtonGroupWithChildren {...testFlexProps} />);
    const buttonGroup = await screen.findByRole('group');
    expectFlexContainerStyleProps(buttonGroup);
  });

  it('should set size for each child button correctly', async () => {
    const size = 'large';
    render(<ButtonGroupWithChildren size={size} />);

    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('data-size', size);
    expect(buttons[1]).toHaveAttribute('data-size', size);
    expect(buttons[2]).toHaveAttribute('data-size', size);
  });

  it('sets variation for each child button correctly', async () => {
    const variation = 'primary';
    render(<ButtonGroupWithChildren variation={variation} />);

    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('data-variation', variation);
    expect(buttons[1]).toHaveAttribute('data-variation', variation);
    expect(buttons[2]).toHaveAttribute('data-variation', variation);
  });

  it('respects child button size and variation props', async () => {
    const size = 'large';
    const variation = 'primary';
    render(
      <ButtonGroup size={size} variation={variation}>
        <Button size="small">Button 1</Button>
        <Button>Button 2</Button>
        <Button variation="link">Button 3</Button>
      </ButtonGroup>
    );
    const [first, second, third] = await screen.findAllByRole('button');

    // override size prop
    expect(first).toHaveAttribute('data-size', 'small');
    expect(first).toHaveAttribute('data-variation', variation);

    // inherit parent props
    expect(second).toHaveAttribute('data-size', size);
    expect(second).toHaveAttribute('data-variation', variation);

    // override size prop
    expect(second).toHaveAttribute('data-size', size);
    expect(third).toHaveAttribute('data-variation', 'link');
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<ButtonGroupWithChildren ref={ref} />);

    await screen.findAllByRole('group');
    expect(ref.current?.nodeName).toBe('DIV');
  });
});
