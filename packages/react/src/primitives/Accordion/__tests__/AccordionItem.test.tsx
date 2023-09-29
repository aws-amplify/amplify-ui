import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Accordion } from '../Accordion';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Accordion.Item:', () => {
  it('should render default and custom classnames', async () => {
    const className = 'class-test';
    const testId = 'test-id';
    const { container } = render(
      <Accordion defaultValue={['item-value']}>
        <Accordion.Item
          testId={testId}
          className={className}
          title="item-title"
          value="item-value"
        >
          content
        </Accordion.Item>
      </Accordion>
    );

    const item = await screen.findByTestId(testId);
    expect(item).toHaveClass(ComponentClassName.AccordionItem, className);
    const summary = container.getElementsByTagName('summary');
    expect(summary[0]).toHaveClass(ComponentClassName.AccordionItemTrigger);
    const icon = container.getElementsByClassName(
      ComponentClassName.AccordionItemIcon
    );
    expect(icon).toHaveLength(1);
    const content = container.getElementsByClassName(
      ComponentClassName.AccordionItemContent
    );
    expect(content).toHaveLength(1);
  });

  it('should pass string as title', async () => {
    const title = 'item-title';
    render(
      <Accordion>
        <Accordion.Item title={title} value="item-value">
          content
        </Accordion.Item>
      </Accordion>
    );

    const header = await screen.findByText(title);
    expect(header).toHaveTextContent(title);
  });

  it('should pass custom component as title', async () => {
    const titleText = 'item-title';
    const ExpanderTitle = ({ title }) => {
      return (
        <div>
          <span>{title}</span>
        </div>
      );
    };
    const { container } = render(
      <Accordion>
        <Accordion.Item
          title={<ExpanderTitle title={titleText} />}
          value="item-value"
        >
          content
        </Accordion.Item>
      </Accordion>
    );

    const trigger = container.getElementsByTagName('summary');
    expect(trigger[0]).toHaveTextContent(titleText);
  });

  it('should set aria-hidden on icon', async () => {
    const { container } = render(
      <Accordion>
        <Accordion.Item title="item-title" value="item-value">
          content
        </Accordion.Item>
      </Accordion>
    );

    const icon = container.getElementsByClassName(
      ComponentClassName.AccordionItemIcon
    );
    expect(icon).toHaveLength(1);
  });

  it('should foward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDetailsElement>();
    const testId = 'test-id';
    render(
      <Accordion>
        <Accordion.Item
          testId={testId}
          title="item-title"
          value="item-value"
          ref={ref}
        >
          content
        </Accordion.Item>
      </Accordion>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DETAILS');
  });
});
