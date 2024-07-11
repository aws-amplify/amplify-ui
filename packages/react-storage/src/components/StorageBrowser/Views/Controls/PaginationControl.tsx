import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, Icon, ListItem, Nav, OrderedList } = StorageBrowserElements;

const BLOCK_NAME = `pagination`;

export interface PaginationControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['Nav'];
  Item: T['ListItem'];
  List: T['OrderedList'];
  NextButton: T['Button'];
  NextIcon: T['Icon'];
  PreviousButton: T['Button'];
  CurrentPage: T['Button'];
}

const iconAttributes = {
  className: `${BLOCK_NAME}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const nextIconProps = () => ({
  children: <text fill="currentColor">next</text>,
  ...iconAttributes,
});

const previousIconProps = () => ({
  children: <text fill="currentColor">prev</text>,
  ...iconAttributes,
});

const NextIcon = withBaseElementProps(Icon, nextIconProps);
const PreviousIcon = withBaseElementProps(Icon, previousIconProps);

const Container = withBaseElementProps(Nav, {
  className: `${BLOCK_NAME}__container`,
});

const List = withBaseElementProps(OrderedList, {
  className: `${BLOCK_NAME}__list`,
});

const Item = withBaseElementProps(ListItem, {
  className: `${BLOCK_NAME}__list__item`,
});

const NextButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
  'aria-label': 'Go to next page',
});

const PreviousButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
});

const CurrentPage = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
});

export const PaginationControl: PaginationControl = () => (
  <Container>
    <List>
      <Item>
        <PreviousButton>
          <PreviousIcon />
        </PreviousButton>
      </Item>
      <Item>
        <CurrentPage>1 {/* temp */}</CurrentPage>
      </Item>
      <ListItem>
        <NextButton>
          <NextIcon />
        </NextButton>
      </ListItem>
    </List>
  </Container>
);

PaginationControl.Container = Container;
PaginationControl.List = List;
PaginationControl.Item = Item;
PaginationControl.CurrentPage = CurrentPage;
PaginationControl.NextButton = NextButton;
PaginationControl.NextIcon = NextIcon;
PaginationControl.PreviousButton = PreviousButton;
