import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';
import { CLASS_BASE } from '../constants';

const { Span, Button, Nav, OrderedList, ListItem } = StorageBrowserElements;
const BLOCK_NAME = `${CLASS_BASE}__navigate`;

type PermissionType = 'READ' | 'READWRITE' | 'WRITE';
type LocationType = 'OBJECT' | 'PREFIX' | 'BUCKET';
interface LocationData {
  name: string;
  permissionType: PermissionType;
  locationType: LocationType;
}

/* <Separator /> */
const Separator = withBaseElementProps(
  Span,
  ({ className = `${BLOCK_NAME}__separator`, children = `/`, ...props }) => ({
    ...props,
    children,
    className,
  })
);

/* <NavigateItem /> */
type RenderNavigateItem = (props: {
  item: LocationData;
  current?: boolean;
}) => React.JSX.Element;

interface NavigateItem<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends RenderNavigateItem,
    Pick<T, 'Button' | 'ListItem'> {
  Separator: T['Span'];
}

const NavigateItemContainer = withBaseElementProps(
  ListItem,
  ({ className = `${BLOCK_NAME}__item`, ...props }) => ({ ...props, className })
);

const NavigateButton = withBaseElementProps(
  Button,
  ({ className = `${BLOCK_NAME}__button`, ...props }) => ({
    ...props,
    className,
  })
);

const NavigateItem: NavigateItem = ({ item, current }) => {
  const { name } = item;
  return (
    <NavigateItemContainer>
      <NavigateButton>{name}</NavigateButton>
      {current ? null : <Separator />}
    </NavigateItemContainer>
  );
};

NavigateItem.Button = Button;
NavigateItem.Separator = Separator;
NavigateItem.ListItem = ListItem;

/* <NavigateContainer /> */
const NavigateContainer: NavigateControl['Container'] = React.forwardRef(
  function Container({ children, ...props }, ref) {
    return (
      <Nav
        {...props}
        aria-label={props['aria-label'] ?? 'Breadcrumbs'}
        className={props.className ?? `${BLOCK_NAME}__container`}
        ref={ref}
      >
        <OrderedList className={`${props.className ?? BLOCK_NAME}__list`}>
          {children}
        </OrderedList>
      </Nav>
    );
  }
);

/* <NavigateControl /> */
export interface NavigateControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: { renderNavigateItem?: RenderNavigateItem }): React.JSX.Element;
  Container: T['Nav'];
  NavigateItem: NavigateItem<T>;
}

export const NavigateControl: NavigateControl = (_props) => {
  return (
    <NavigateContainer>
      <NavigateItem
        item={{
          name: 'Home',
          permissionType: 'READ',
          locationType: 'OBJECT',
        }}
      />
      <NavigateItem
        item={{
          name: 'Location01',
          permissionType: 'READ',
          locationType: 'OBJECT',
        }}
        current
      />
    </NavigateContainer>
  );
};
NavigateControl.Container = NavigateContainer;
NavigateControl.NavigateItem = NavigateItem;
