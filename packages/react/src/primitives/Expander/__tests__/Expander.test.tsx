import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { ExpanderGroup } from '../ExpanderGroup';
import {
  Expander,
  EXPANDER_CONTENT_TEXT_TEST_ID,
  EXPANDER_HEADER_TEST_ID,
  EXPANDER_ICON_TEST_ID,
  EXPANDER_ITEM_TEST_ID,
} from '../Expander';
import { ComponentClassName } from '@aws-amplify/ui';

describe('Expander:', () => {
  it('should render default and custom classnames', async () => {
    const className = 'class-test';
    render(
      <ExpanderGroup type="single" defaultValue="item-value">
        <Expander className={className} title="item-title" value="item-value">
          content
        </Expander>
      </ExpanderGroup>
    );

    const item = await screen.findByTestId(EXPANDER_ITEM_TEST_ID);
    expect(item).toHaveClass(ComponentClassName.ExpanderItem, className);

    const header = await screen.findByTestId(EXPANDER_HEADER_TEST_ID);
    expect(header).toHaveClass(ComponentClassName.ExpanderHeader);

    const icon = await screen.findByTestId(EXPANDER_ICON_TEST_ID);
    expect(icon).toHaveClass(ComponentClassName.ExpanderIcon);

    const contentText = await screen.findByTestId(
      EXPANDER_CONTENT_TEXT_TEST_ID
    );
    expect(contentText).toHaveClass(ComponentClassName.ExpanderContentText);

    const content = await screen.findByRole('region');
    expect(content).toHaveClass(ComponentClassName.ExpanderContent);

    const trigger = await screen.findByRole('button');
    expect(trigger).toHaveClass(ComponentClassName.ExpanderTrigger);
  });

  it('should pass string as title', async () => {
    const title = 'item-title';
    render(
      <ExpanderGroup type="single" defaultValue="item-value">
        <Expander title={title} value="item-value">
          content
        </Expander>
      </ExpanderGroup>
    );

    const header = await screen.findByTestId(EXPANDER_HEADER_TEST_ID);
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
    render(
      <ExpanderGroup type="single" defaultValue="item-value">
        <Expander
          title={<ExpanderTitle title={titleText} />}
          value="item-value"
        >
          content
        </Expander>
      </ExpanderGroup>
    );

    const header = await screen.findByTestId(EXPANDER_HEADER_TEST_ID);
    expect(header).toHaveTextContent(titleText);
  });

  it('should set aria-controls on trigger and have matching id on content', async () => {
    render(
      <ExpanderGroup type="single" defaultValue="item-value">
        <Expander title="item-title" value="item-value">
          content
        </Expander>
      </ExpanderGroup>
    );

    const trigger = await screen.findByRole('button');
    const content = await screen.findByRole('region');
    expect(trigger).toHaveAttribute('aria-controls', content.id);
  });

  it('should set aria-labelledby on content and have matching id on trigger', async () => {
    render(
      <ExpanderGroup type="single" defaultValue="item-value">
        <Expander title="item-title" value="item-value">
          content
        </Expander>
      </ExpanderGroup>
    );

    const content = await screen.findByRole('region');
    const trigger = await screen.findByRole('button');
    expect(content).toHaveAttribute('aria-labelledby', trigger.id);
  });

  it('should set aria-hidden on icon', async () => {
    render(
      <ExpanderGroup type="single" defaultValue="item-value">
        <Expander title="item-title" value="item-value">
          content
        </Expander>
      </ExpanderGroup>
    );

    const icon = await screen.findByTestId(EXPANDER_ICON_TEST_ID);
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should foward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDetailsElement>();
    render(
      <ExpanderGroup type="single" defaultValue="item-value">
        <Expander title="item-title" value="item-value" ref={ref}>
          content
        </Expander>
      </ExpanderGroup>
    );

    await screen.findByTestId(EXPANDER_ITEM_TEST_ID);
    expect(ref.current?.nodeName).toBe('DIV');
  });
});
