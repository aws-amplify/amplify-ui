import React from 'react';

import {
  ButtonElement,
  ButtonElementProps,
  ListItemElement,
  NavElement,
  OrderedListElement,
} from '../context/elements';
import { CLASS_BASE } from '../Views/constants';
import { DataListProps } from './types';

const BLOCK_NAME = `${CLASS_BASE}__paginate`;

function PaginateItem(props: PaginateItemProps) {
  return (
    <ListItemElement className={`${BLOCK_NAME}__item`}>
      <ButtonElement {...props} />
    </ListItemElement>
  );
}

export interface PaginateItemProps extends ButtonElementProps {}

export interface PaginateProps extends DataListProps<PaginateItemProps> {}

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
