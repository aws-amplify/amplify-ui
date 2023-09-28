import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { Accordion } from '../Accordion';
import { AccordionProps } from '../types';
import { ComponentClassName } from '@aws-amplify/ui';

function UncontrolledAccordion(props: AccordionProps) {
  return (
    <Accordion {...props}>
      <Accordion.Item title="Section 1 title" value="item-1">
        content 1
      </Accordion.Item>
      <Accordion.Item title="Section 2 title" value="item-2">
        content 2
      </Accordion.Item>
      <Accordion.Item title="Section 3 title" value="item-3">
        content 3
      </Accordion.Item>
    </Accordion>
  );
}

function ControlledAccordion({ value: initialValue, ...rest }: AccordionProps) {
  const [value, setValue] = React.useState(initialValue);
  return (
    <Accordion value={value} onChange={setValue} {...rest}>
      <Accordion.Item title="Section 1 title" value="item-1">
        content 1
      </Accordion.Item>
      <Accordion.Item title="Section 2 title" value="item-2">
        content 2
      </Accordion.Item>
      <Accordion.Item title="Section 3 title" value="item-3">
        content 3
      </Accordion.Item>
    </Accordion>
  );
}

describe('Accordion:', () => {
  it('should set default and custom classnames', async () => {
    const testId = 'accordion';
    const className = 'class-test';
    render(
      <UncontrolledAccordion
        className={className}
        defaultValue={['item-1']}
        isExclusive
        testId={testId}
      />
    );
    const expander = await screen.findByTestId(testId);
    expect(expander).toHaveClass(ComponentClassName.Expander, className);
  });

  it('should be collapsible', async () => {
    render(
      <UncontrolledAccordion
        defaultValue={['item-1']}
        isExclusive
        isCollapsible
      />
    );
    const buttons = await screen.findAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'true');
    userEvent.click(buttons[0]);
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
  });

  it('should work as uncontrolled component with type single', async () => {
    render(<UncontrolledAccordion defaultValue={['item-1']} isExclusive />);

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
    render(<UncontrolledAccordion defaultValue={['item-1']} />);

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
    render(<ControlledAccordion value={['item-1']} isExclusive />);

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
    render(<ControlledAccordion value={['item-1']} />);

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
      <Accordion testId={testId} ref={ref}>
        <Accordion.Item title="Section 1 title" value="item-1">
          content 1
        </Accordion.Item>
        <Accordion.Item title="Section 2 title" value="item-2">
          content 2
        </Accordion.Item>
        <Accordion.Item title="Section 3 title" value="item-3">
          content 3
        </Accordion.Item>
      </Accordion>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });
});
