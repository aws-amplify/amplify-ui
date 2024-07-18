import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import { StorageBrowserElements } from '../../context/elements';

const { Button, Icon, ListItem, Nav, OrderedList } = StorageBrowserElements;

const BLOCK_NAME = 'pagination';

export interface PaginateControl<
  T extends Partial<StorageBrowserElements> = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['Nav'];
  Item: T['ListItem'];
  Next: T['Button'];
  NextIcon: T['Icon'];
  PreviousIcon: T['Icon'];
  Previous: T['Button'];
  Current: T['Button'];
}

const iconAttributes = {
  'aria-hidden': true,
  className: `${BLOCK_NAME}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const nextIconProps = () => ({
  children: (
    <path
      d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
      fill="currentColor"
    ></path>
  ),
  ...iconAttributes,
});

const previousIconProps = () => ({
  children: (
    <path
      d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
      fill="currentColor"
    ></path>
  ),
  ...iconAttributes,
});

const NextIcon = withBaseElementProps(Icon, nextIconProps);
const PreviousIcon = withBaseElementProps(Icon, previousIconProps);

const ContainerBase = withBaseElementProps(Nav, {
  className: `${BLOCK_NAME}`,
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

export const PaginateControl: PaginateControl = () => (
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

PaginateControl.Container = Container;
PaginateControl.Item = Item;
PaginateControl.Current = CurrentPage;
PaginateControl.Next = NextButton;
PaginateControl.NextIcon = NextIcon;
PaginateControl.Previous = PreviousButton;
PaginateControl.PreviousIcon = PreviousIcon;
