import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, ListItem, Nav, OrderedList, Span } = StorageBrowserElements;

const BLOCK_NAME = `breadcrumbs`;

export interface BreadcrumbItem {
  label?: string;
}

export interface BreadcrumbsControlProps {
  items?: BreadcrumbItem[];
}

export interface BreadcrumbsControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  ({ items }: BreadcrumbsControlProps): React.JSX.Element;
  Container: T['Nav'];
  Item: T['ListItem'];
  List: T['OrderedList'];
  BreadcrumbButton: T['Button'];
  Separator: T['Span'];
}

const Container = withBaseElementProps(Nav, {
  className: `${BLOCK_NAME}__container`,
  'aria-label': `Breadcrumbs`,
});

const List = withBaseElementProps(OrderedList, {
  className: `${BLOCK_NAME}__list`,
});

const Item = withBaseElementProps(ListItem, {
  className: `${BLOCK_NAME}__item`,
});

const Separator = withBaseElementProps(Span, {
  className: `${BLOCK_NAME}__separator`,
  children: '/',
});

const BreadcrumbButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
});

export const BreadcrumbsControl: BreadcrumbsControl = ({ items }) => (
  <Container>
    <List>
      {items?.map(({ label }, index) => {
        const isLastItem = index === items.length - 1;
        return (
          <Item key={`breadcrumb-item-${index}`}>
            <BreadcrumbButton aria-current={isLastItem ? 'page' : undefined}>
              {label}
            </BreadcrumbButton>
            {isLastItem ? null : <Separator />}
          </Item>
        );
      })}
    </List>
  </Container>
);

BreadcrumbsControl.Container = Container;
BreadcrumbsControl.List = List;
BreadcrumbsControl.Item = Item;
BreadcrumbsControl.BreadcrumbButton = BreadcrumbButton;
BreadcrumbsControl.Separator = Separator;
