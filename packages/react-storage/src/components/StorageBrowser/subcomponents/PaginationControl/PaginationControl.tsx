import * as React from 'react';
import { NavElementProps } from '@aws-amplify/ui-react/internal';
import { NextButton } from './NextButton';
import { PreviousButton } from './PreviousButton';
import { Container } from './Container';
import { CurrentPage } from './CurrentPage';
import { Item } from './Item';
import { List } from './List';

const Pagination = <T extends NavElementProps>({
  ariaLabel,
  className,
  children,
  ...rest
}: T): JSX.Element => {
  return (
    <Container ariaLabel={ariaLabel} className={className} {...rest}>
      <List>
        <Item>
          <PreviousButton />
        </Item>
        <Item>
          <CurrentPage />
        </Item>
        <Item>
          <NextButton />
        </Item>
      </List>
    </Container>
  );
};

const PaginationControl = Object.assign(Pagination, {
  Container,
  Item,
  List,
  NextButton,
  CurrentPage,
  PreviousButton,
});

export { PaginationControl };
