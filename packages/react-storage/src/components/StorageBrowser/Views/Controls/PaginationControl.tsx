import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, Icon, ListItem, Nav, OrderedList } = StorageBrowserElements;

const BLOCK_NAME = 'pagination';

export interface PaginationControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['Nav'];
  Item: T['ListItem'];
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

const ContainerBase = withBaseElementProps(Nav, {
  className: `${BLOCK_NAME}__container`,
  'aria-label': 'Pagination',
});

const List = withBaseElementProps(OrderedList, {
  className: `${BLOCK_NAME}__list`,
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

const Item = withBaseElementProps(ListItem, {
  className: `${BLOCK_NAME}__list__item`,
});

const NextButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
  'aria-label': 'Go to next page',
});

const PreviousButton = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
  'aria-label': 'Go to previous page',
});

const CurrentPage = withBaseElementProps(Button, {
  className: `${BLOCK_NAME}__button`,
});

export const PaginationControl: PaginationControl = () => (
  <Container>
    <Item>
      <PreviousButton>
        <PreviousIcon />
      </PreviousButton>
    </Item>
    <Item>
      {/* TODO: This needs to come from context */}
      <CurrentPage>1 </CurrentPage>
    </Item>
    <ListItem>
      <NextButton>
        <NextIcon />
      </NextButton>
    </ListItem>
  </Container>
);

PaginationControl.Container = Container;
PaginationControl.Item = Item;
PaginationControl.CurrentPage = CurrentPage;
PaginationControl.NextButton = NextButton;
PaginationControl.NextIcon = NextIcon;
PaginationControl.PreviousButton = PreviousButton;
