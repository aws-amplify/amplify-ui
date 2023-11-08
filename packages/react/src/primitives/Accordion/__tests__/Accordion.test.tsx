import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';

import { Accordion } from '../Accordion';
import { AccordionProps } from '../types';
import { ComponentClassName } from '@aws-amplify/ui';

const accordionItems = [
  {
    value: 'item-1',
    header: 'Section 1 title',
    body: 'content 2',
  },
  {
    value: 'item-2',
    header: 'Section 2 title',
    body: 'content 2',
  },
  {
    value: 'item-3',
    header: 'Section 3 title',
    body: 'content 3',
  },
];

function UncontrolledAccordion(props: AccordionProps) {
  return (
    <Accordion.Container {...props}>
      {accordionItems.map(({ value, header, body }) => (
        <Accordion.Item value={value} key={value}>
          <Accordion.Trigger>
            {header}
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>{body}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Container>
  );
}

function ControlledAccordion({ value: initialValue, ...rest }: AccordionProps) {
  const [value, setValue] = React.useState(initialValue);
  return (
    <Accordion.Container value={value} onValueChange={setValue} {...rest}>
      {accordionItems.map(({ value, header, body }) => (
        <Accordion.Item value={value} key={value}>
          <Accordion.Trigger>
            {header}
            <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>{body}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Container>
  );
}

describe('Accordion:', () => {
  it('should handle a non-composed use-case', async () => {
    const testId = 'accordion';
    render(
      <Accordion
        testId={testId}
        items={[
          {
            value: '1',
            trigger: 'Section 1 title',
            content: 'content 1',
          },
          {
            value: '2',
            trigger: 'Section 2 title',
            content: 'content 2',
          },
          {
            value: '3',
            trigger: 'Section 3 title',
            content: 'content 3',
          },
        ]}
      />
    );
    const accordion = await screen.findByTestId(testId);
    expect(accordion).toBeInTheDocument();
    expect(accordion.children).toHaveLength(3);
  });
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
      <UncontrolledAccordion defaultValue={['item-1']} />
    );
    const details = container.getElementsByTagName('details');
    const summaries = container.getElementsByTagName('summary');
    expect(details[0]).toHaveAttribute('open');
    userEvent.click(summaries[0]);
    expect(details[0]).not.toHaveAttribute('open');
  });

  it('should be un-collapsible with preventCollapse', async () => {
    const { container } = render(
      <UncontrolledAccordion defaultValue={['item-1']} preventCollapse />
    );
    const details = container.getElementsByTagName('details');
    const summaries = container.getElementsByTagName('summary');
    expect(details[0]).toHaveAttribute('open');
    userEvent.click(summaries[0]);
    expect(details[0]).toHaveAttribute('open');
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
      <Accordion.Container testId={testId} ref={ref}>
        {accordionItems.map(({ value, header, body }) => (
          <Accordion.Item value={value} key={value}>
            <Accordion.Trigger>
              {header}
              <Accordion.Icon />
            </Accordion.Trigger>
            <Accordion.Content>{body}</Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Container>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DIV');
  });
});
