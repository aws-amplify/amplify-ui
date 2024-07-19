import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, ListItem, Nav, OrderedList, Span } = StorageBrowserElements;

const BLOCK_NAME = 'navigate';

type PermissionType = 'READ' | 'READWRITE' | 'WRITE';
type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';
interface LocationData {
  name: string;
  permissionType: PermissionType;
  locationType: LocationType;
}

/**
 * <NavigateItem />
 */

type RenderNavigateItem = (props: { item: LocationData }) => React.JSX.Element;

interface NavigateItem<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends RenderNavigateItem {
  Separator: T['Span'];
  Button: T['Button'];
  ListItem: T['ListItem'];
}

const Item = withBaseElementProps(ListItem, {
  className: `${BLOCK_NAME}__list__item`,
});

const NavigateButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
});

const Separator = withBaseElementProps(Span, {
  'aria-hidden': true,
  className: `${BLOCK_NAME}__separator`,
  children: '/',
});

const NavigateItem: NavigateItem = () => (
  <ListItem>
    <NavigateButton></NavigateButton>
    <Separator />
  </ListItem>
);

NavigateItem.Separator = Separator;
NavigateItem.Button = Button;
NavigateItem.ListItem = Item;

/**
 * <Container />
 */

const List = withBaseElementProps(OrderedList, {
  className: `${BLOCK_NAME}__list`,
});

const ContainerBase = withBaseElementProps(Nav, {
  className: `${BLOCK_NAME}`,
  'aria-label': 'Breadcrumbs',
});

const Container: typeof ContainerBase = React.forwardRef(function Container(
  { children, ...rest },
  ref
) {
  return (
    <ContainerBase ref={ref} {...rest}>
      <List>{children}</List>
    </ContainerBase>
  );
});

/**
 * <NavigateControl />
 */
export interface NavigateControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { renderNavigateItem?: RenderNavigateItem }): React.JSX.Element;
  Container: T['Nav'];
  NavigateItem: NavigateItem<T>;
}

export const NavigateControl: NavigateControl = () => (
  <Container>
    <NavigateItem />;
  </Container>
);

NavigateControl.Container = Container;
NavigateControl.NavigateItem = NavigateItem;
