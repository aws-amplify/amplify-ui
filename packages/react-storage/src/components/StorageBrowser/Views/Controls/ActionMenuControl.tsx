import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, View } = StorageBrowserElements;
const BLOCK_NAME = 'action-menu';

const Toggle = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__toggle`,
});

const Container = withBaseElementProps(View, {
  className: `${BLOCK_NAME}__container`,
});

const MenuContainer = withBaseElementProps(View, {
  className: `${BLOCK_NAME}__menu`,
});

const MenuControl: MenuControl = () => <MenuContainer></MenuContainer>;

MenuControl.Container = MenuContainer;

interface MenuControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): JSX.Element;
  Container: T['View'];
}

export const ActionMenuControl: ActionMenuControl = () => (
  <Container>
    <Toggle />
    <MenuControl />
  </Container>
);

ActionMenuControl.Container = Container;
ActionMenuControl.Toggle = Toggle;
ActionMenuControl.Menu = MenuControl;

export interface ActionMenuControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['View'];
  Toggle: T['Button'];
  Menu: MenuControl<T>;
}
