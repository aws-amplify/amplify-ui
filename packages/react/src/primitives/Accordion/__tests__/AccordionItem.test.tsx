import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Accordion } from '../Accordion';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Accordion.Item:', () => {
  it('should render default and custom classnames', async () => {
    const className = 'class-test';
    const testId = 'test-id';
    const { container } = render(
      <Accordion.Container defaultValue={['item-value']}>
        <Accordion.Item
          testId={testId}
          className={className}
          value="item-value"
        >
          <Accordion.Trigger>
            item title <Accordion.Icon />
          </Accordion.Trigger>
          <Accordion.Content>content</Accordion.Content>
        </Accordion.Item>
      </Accordion.Container>
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

  it('should set aria-hidden on icon', async () => {
    const { container } = render(
      <Accordion.Container>
        <Accordion.Item value="item-value">
          <Accordion.Trigger>
            content
            <Accordion.Icon />
          </Accordion.Trigger>
        </Accordion.Item>
      </Accordion.Container>
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
      <Accordion.Container>
        <Accordion.Item testId={testId} value="item-value" ref={ref}>
          content
        </Accordion.Item>
      </Accordion.Container>
    );

    await screen.findByTestId(testId);
    expect(ref.current?.nodeName).toBe('DETAILS');
  });
});
