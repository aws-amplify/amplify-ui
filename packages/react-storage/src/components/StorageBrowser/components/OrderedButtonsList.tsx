import React from 'react';

import {
  ButtonElement,
  ButtonElementProps,
  ListItemElement,
  OrderedListElement,
} from '../context/elements';

import { CLASS_BASE } from '../views/constants';
const BLOCK_NAME = `${CLASS_BASE}__pagination`;

type OrderedButtonsListProps = {
  buttonList: ButtonElementProps[];
};

export function OrderedButtonsList({
  buttonList,
}: OrderedButtonsListProps): React.JSX.Element | null {
  if (!buttonList?.length) {
    return null;
  }

  return (
    <OrderedListElement className={`${BLOCK_NAME}__list`}>
      {buttonList.map((buttonProps, index) => (
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
