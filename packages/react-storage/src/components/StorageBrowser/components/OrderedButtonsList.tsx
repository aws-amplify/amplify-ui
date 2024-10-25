import React from 'react';

import {
  ButtonElement,
  ButtonElementProps,
  ListItemElement,
  OrderedListElement,
} from '../context/elements';

import { CLASS_BASE } from '../views/constants';
const BLOCK_NAME = `${CLASS_BASE}__ol-buttons`;

interface OrderedButtonsListProps {
  items: ButtonElementProps[];
}

export function OrderedButtonsList({
  items,
}: OrderedButtonsListProps): React.JSX.Element | null {
  if (!items?.length) {
    return null;
  }

  return (
    <OrderedListElement className={`${BLOCK_NAME}__list`}>
      {items.map((buttonProps, index) => (
        <ListItemElement
          className={`${BLOCK_NAME}__item`}
          key={buttonProps?.key ?? index}
        >
          <ButtonElement {...buttonProps} />
        </ListItemElement>
      ))}
    </OrderedListElement>
  );
}
