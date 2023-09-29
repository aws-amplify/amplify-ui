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
        testId={testId}
      />
    );
    const accordion = await screen.findByTestId(testId);
    expect(accordion).toHaveClass(ComponentClassName.Accordion, className);
  });

  it('should be collapsible', async () => {
    const { container } = render(
      <UncontrolledAccordion defaultValue={['item-1']} allowToggle />
    );
    const details = container.getElementsByTagName('details');
    const summaries = container.getElementsByTagName('summary');
    expect(details[0]).toHaveAttribute('open');
    userEvent.click(summaries[0]);
    expect(details[0]).not.toHaveAttribute('open');
  });

  it('should work as uncontrolled component', async () => {
    const { container } = render(
      <UncontrolledAccordion defaultValue={['item-1']} />
    );

    const details = container.getElementsByTagName('details');
    const summaries = container.getElementsByTagName('summary');
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).not.toHaveAttribute('open');
    expect(details[2]).not.toHaveAttribute('open');

    userEvent.click(summaries[1]);
    expect(details[0]).not.toHaveAttribute('open');
    expect(details[1]).toHaveAttribute('open');
    expect(details[2]).not.toHaveAttribute('open');

    userEvent.click(summaries[2]);
    expect(details[0]).not.toHaveAttribute('open');
    expect(details[1]).not.toHaveAttribute('open');
    expect(details[2]).toHaveAttribute('open');
  });

  it('should work as uncontrolled component with allowMultiple', async () => {
    const { container } = render(
      <UncontrolledAccordion allowMultiple defaultValue={['item-1']} />
    );
    const details = container.getElementsByTagName('details');
    const summaries = container.getElementsByTagName('summary');
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).not.toHaveAttribute('open');
    expect(details[2]).not.toHaveAttribute('open');

    userEvent.click(summaries[1]);
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).toHaveAttribute('open');
    expect(details[2]).not.toHaveAttribute('open');

    userEvent.click(summaries[2]);
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).toHaveAttribute('open');
    expect(details[2]).toHaveAttribute('open');
  });

  it('should work as controlled component', async () => {
    const { container } = render(<ControlledAccordion value={['item-1']} />);
    const details = container.getElementsByTagName('details');
    const summaries = container.getElementsByTagName('summary');
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).not.toHaveAttribute('open');
    expect(details[2]).not.toHaveAttribute('open');

    userEvent.click(summaries[1]);
    expect(details[0]).not.toHaveAttribute('open');
    expect(details[1]).toHaveAttribute('open');
    expect(details[2]).not.toHaveAttribute('open');

    userEvent.click(summaries[2]);
    expect(details[0]).not.toHaveAttribute('open');
    expect(details[1]).not.toHaveAttribute('open');
    expect(details[2]).toHaveAttribute('open');
  });

  it('should work as controlled component with allowMultiple', async () => {
    const { container } = render(
      <ControlledAccordion allowMultiple value={['item-1']} />
    );
    const details = container.getElementsByTagName('details');
    const summaries = container.getElementsByTagName('summary');
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).not.toHaveAttribute('open');
    expect(details[2]).not.toHaveAttribute('open');

    userEvent.click(summaries[1]);
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).toHaveAttribute('open');
    expect(details[2]).not.toHaveAttribute('open');

    userEvent.click(summaries[2]);
    expect(details[0]).toHaveAttribute('open');
    expect(details[1]).toHaveAttribute('open');
    expect(details[2]).toHaveAttribute('open');
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
