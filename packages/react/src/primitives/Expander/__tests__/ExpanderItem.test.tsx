import { render, screen } from '@testing-library/react';
import * as React from 'react';

import { Expander } from '../Expander';
import {
  ExpanderItem,
  EXPANDER_CONTENT_TEXT_TEST_ID,
  EXPANDER_HEADER_TEST_ID,
  EXPANDER_ICON_TEST_ID,
  EXPANDER_ITEM_TEST_ID,
} from '../ExpanderItem';
import { ComponentClassNames } from '../../shared/constants';

describe('ExpanderItem: ', () => {
  it('should render default and custom classnames', async () => {
    const className = 'class-test';
    render(
      <Expander type="single" defaultValue="item-value">
        <ExpanderItem
          className={className}
          title="item-title"
          value="item-value"
        >
          content
        </ExpanderItem>
      </Expander>
    );

    const item = await screen.findByTestId(EXPANDER_ITEM_TEST_ID);
    expect(item).toHaveClass(ComponentClassNames.ExpanderItem, className);

    const header = await screen.findByTestId(EXPANDER_HEADER_TEST_ID);
    expect(header).toHaveClass(ComponentClassNames.ExpanderHeader);

    const icon = await screen.findByTestId(EXPANDER_ICON_TEST_ID);
    expect(icon).toHaveClass(ComponentClassNames.ExpanderIcon);

    const contentText = await screen.findByTestId(
      EXPANDER_CONTENT_TEXT_TEST_ID
    );
    expect(contentText).toHaveClass(ComponentClassNames.ExpanderContentText);

    const content = await screen.findByRole('region');
    expect(content).toHaveClass(ComponentClassNames.ExpanderContent);

    const trigger = await screen.findByRole('button');
    expect(trigger).toHaveClass(ComponentClassNames.ExpanderTrigger);
  });

  it('should pass title', async () => {
    const title = 'item-title';
    render(
      <Expander type="single" defaultValue="item-value">
        <ExpanderItem title={title} value="item-value">
          content
        </ExpanderItem>
      </Expander>
    );

    const header = await screen.findByTestId(EXPANDER_HEADER_TEST_ID);
    expect(header).toHaveTextContent(title);
  });

  it('should set aria-controls on trigger and have matching id on content', async () => {
    render(
      <Expander type="single" defaultValue="item-value">
        <ExpanderItem title="item-title" value="item-value">
          content
        </ExpanderItem>
      </Expander>
    );

    const trigger = await screen.findByRole('button');
    const content = await screen.findByRole('region');
    expect(trigger).toHaveAttribute('aria-controls', content.id);
  });

  it('should set aria-labelledby on content and have matching id on trigger', async () => {
    render(
      <Expander type="single" defaultValue="item-value">
        <ExpanderItem title="item-title" value="item-value">
          content
        </ExpanderItem>
      </Expander>
    );

    const content = await screen.findByRole('region');
    const trigger = await screen.findByRole('button');
    expect(content).toHaveAttribute('aria-labelledby', trigger.id);
  });

  it('should set aria-hidden on icon', async () => {
    render(
      <Expander type="single" defaultValue="item-value">
        <ExpanderItem title="item-title" value="item-value">
          content
        </ExpanderItem>
      </Expander>
    );

    const icon = await screen.findByTestId(EXPANDER_ICON_TEST_ID);
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should foward ref to DOM element', async () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Expander type="single" defaultValue="item-value">
        <ExpanderItem title="item-title" value="item-value" ref={ref}>
          content
        </ExpanderItem>
      </Expander>
    );

    await screen.findByTestId(EXPANDER_ITEM_TEST_ID);
    expect(ref.current.nodeName).toBe('DIV');
  });
});
