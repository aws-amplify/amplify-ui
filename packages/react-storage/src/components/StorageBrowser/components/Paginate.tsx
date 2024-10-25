import React from 'react';

import {
  ButtonElement,
  ButtonElementProps,
  ListItemElement,
  NavElement,
  OrderedListElement,
} from '../context/elements';
import { CLASS_BASE } from '../views/constants';
import { DataListProps } from './types';

const BLOCK_NAME = `${CLASS_BASE}__paginate`;

export interface PaginateItemProps extends ButtonElementProps {}

export interface PaginateProps extends DataListProps<PaginateItemProps> {}

function PaginateItem(props: PaginateItemProps, index: number) {
  return (
    <ListItemElement
      className={`${BLOCK_NAME}__item`}
      key={props?.key ?? index}
    >
      <ButtonElement {...props} />
    </ListItemElement>
  );
}

export function Paginate({
  data,
  renderItem = PaginateItem,
}: PaginateProps): React.JSX.Element {
  return (
    <NavElement aria-label={'Pagination'} className={BLOCK_NAME}>
      <OrderedListElement className={`${BLOCK_NAME}__list`}>
        {data?.map(renderItem)}
      </OrderedListElement>
    </NavElement>
  );
}
