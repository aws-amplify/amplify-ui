import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { ExpanderGroup } from '../ExpanderGroup';
import { Expander } from '../Expander';
import { ExpanderGroupProps } from '../types';
import { ComponentClassName } from '@aws-amplify/ui';

function UncontrolledExpander(props: ExpanderGroupProps) {
  return (
    <ExpanderGroup {...props}>
      <Expander title="Section 1 title" value="item-1">
        content 1
      </Expander>
      <Expander title="Section 2 title" value="item-2">
        content 2
      </Expander>
      <Expander title="Section 3 title" value="item-3">
        content 3
      </Expander>
    </ExpanderGroup>
  );
}

function ControlledExpander({
  value: initialValue,
  ...rest
}: ExpanderGroupProps) {
  const [value, setValue] = React.useState(initialValue);
  return (
    <ExpanderGroup value={value} onValueChange={setValue} {...rest}>
      <Expander title="Section 1 title" value="item-1">
        content 1
      </Expander>
      <Expander title="Section 2 title" value="item-2">
        content 2
      </Expander>
      <Expander title="Section 3 title" value="item-3">
        content 3
      </Expander>
    </ExpanderGroup>
  );
}

describe('ExpanderGroup:', () => {
  it('should set default and custom classnames', async () => {
    const testId = 'expander';
    const className = 'class-test';
    render(
      <UncontrolledExpander
        className={className}
        defaultValue="item-1"
        type="single"
        testId={testId}
      />
    );
    const expander = await screen.findByTestId(testId);
    expect(expander).toHaveClass(ComponentClassName.Expander, className);
  });

  it('should be collapsible', async () => {
    render(
      <UncontrolledExpander defaultValue="item-1" type="single" isCollapsible />
    );
    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    userEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('should work as uncontrolled component with type single', async () => {
    render(<UncontrolledExpander defaultValue="item-1" type="single" />);

    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(buttons[2]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
  });

  it('should work as uncontrolled component with type multiple', async () => {
    render(<UncontrolledExpander defaultValue={['item-1']} type="multiple" />);

    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(buttons[2]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
  });

  it('should work as controlled component with type single', async () => {
    render(<ControlledExpander value="item-1" type="single" />);

    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(buttons[2]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
  });

  it('should work as controlled component with type multiple', async () => {
    render(<ControlledExpander value={['item-1']} type="multiple" />);

    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(buttons[1]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'false');

    userEvent.click(buttons[2]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true');
    expect(buttons[2]).toHaveAttribute('aria-expanded', 'true');
  });

  it('should forward ref support on DOM element', async () => {
    const testId = 'expander';
    const ref = React.createRef<HTMLDivElement>();
    render(
      <ExpanderGroup testId={testId} ref={ref}>
        <Expander title="Section 1 title" value="item-1">
          content 1
        </Expander>
        <Expander title="Section 2 title" value="item-2">
          content 2
        </Expander>
        <Expander title="Section 3 title" value="item-3">
          content 3
        </Expander>
      </ExpanderGroup>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });
});
