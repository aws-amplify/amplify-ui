import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Button } from '../../Button';
import { ButtonGroup } from '../ButtonGroup';
import { ButtonGroupProps, PrimitivePropsWithRef } from '../../types';
import { ComponentClassNames } from '../../shared/constants';
import {
  testFlexProps,
  expectFlexContainerStyleProps,
} from '../../Flex/__tests__/Flex.test';

describe('ButtonGroup: ', () => {
  const getButtonGroup = (
    props: Partial<PrimitivePropsWithRef<ButtonGroupProps, 'div'>>
  ) => {
    return (
      <ButtonGroup {...props}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </ButtonGroup>
    );
  };
  it('should render classname and custom classname', async () => {
    const className = 'class-test';
    render(getButtonGroup({ className }));

    const buttonGroup = await screen.findByRole('group');
    expect(buttonGroup).toHaveClass(ComponentClassNames.ButtonGroup, className);
  });

  it('should render all flex style props', async () => {
    render(getButtonGroup(testFlexProps));
    const buttonGroup = await screen.findByRole('group');
    expectFlexContainerStyleProps(buttonGroup);
  });

  it('should set size for each child button correctly', async () => {
    const size = 'large';
    render(getButtonGroup({ size }));

    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('data-size', size);
    expect(buttons[1]).toHaveAttribute('data-size', size);
    expect(buttons[2]).toHaveAttribute('data-size', size);
  });

  it('should set variation for each child button correctly', async () => {
    const variation = 'primary';
    render(getButtonGroup({ variation }));

    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('data-variation', variation);
    expect(buttons[1]).toHaveAttribute('data-variation', variation);
    expect(buttons[2]).toHaveAttribute('data-variation', variation);
  });

  it('should forward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(getButtonGroup({ ref }));

    await screen.findAllByRole('group');
    expect(ref.current.nodeName).toBe('DIV');
  });
});
