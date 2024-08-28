import React, { AriaAttributes } from 'react';

import {
  ButtonElementProps,
  NavElement,
  OrderedListElement,
  PaginateVariant,
  SpanElement,
  StorageBrowserElements,
} from '../../context/elements';
import type { OmitElements } from '../types';
import { CLASS_BASE } from '../constants';

const {
  Button: ButtonElement,
  Icon: IconElement,
  ListItem,
} = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__paginate`;
const DEFAULT_VARIANTS = [
  'paginate-previous',
  'paginate-current',
  'paginate-next',
] as const;

interface PaginateItemProps extends ButtonElementProps {}

interface _PaginateItemControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (props: PaginateItemProps): React.JSX.Element;
  Container: T['ListItem'];
}
export interface PaginateItemControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_PaginateItemControl<T>, 'Container'> {
  (props: PaginateItemProps): React.JSX.Element;
}

export interface _PaginateControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  Container: T['Nav'];
  Current: PaginateItemControl<T>;
  Next: PaginateItemControl<T>;
  Previous: PaginateItemControl<T>;
}

export interface PaginateControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends OmitElements<_PaginateControl<T>, 'Container'> {
  (): React.JSX.Element;
}

const getButtonVariantProps = (
  variant: PaginateVariant,
  props: PaginateProps
): ButtonElementProps => {
  const {
    currentPage,
    disableNext,
    disablePrevious,
    handleNext,
    handlePrevious,
  } = props;

  let ariaCurrent: AriaAttributes['aria-current'];
  let ariaLabel, className, disabled, onClick, children;

  switch (variant) {
    case 'paginate-current':
      ariaCurrent = 'page';
      ariaLabel = `Page ${currentPage}`;
      children = (
        <SpanElement className={`${BLOCK_NAME}__text`}>
          {currentPage}
        </SpanElement>
      );
      className = `${BLOCK_NAME}__button-current`;
      break;
    case 'paginate-next':
      ariaLabel = 'Go to next page';
      className = `${BLOCK_NAME}__button-next`;
      disabled = disableNext;
      onClick = handleNext;
      children = (
        <IconElement variant={variant} className={`${BLOCK_NAME}__icon`} />
      );
      break;
    case 'paginate-previous':
      ariaLabel = 'Go to previous page';
      className = `${BLOCK_NAME}__button-next`;
      disabled = disablePrevious;
      onClick = handlePrevious;
      children = (
        <IconElement variant={variant} className={`${BLOCK_NAME}__icon`} />
      );
      break;
  }

  return {
    'aria-current': ariaCurrent,
    'aria-label': ariaLabel,
    children,
    className,
    disabled,
    onClick,
    type: 'button',
    variant,
  };
};

const PaginateItem = (props: PaginateItemProps) => (
  <ListItem className={`${BLOCK_NAME}__item`}>
    <ButtonElement {...props} />
  </ListItem>
);

export interface PaginateProps {
  currentPage?: string;
  disableNext?: boolean;
  disablePrevious?: boolean;
  handleNext?: () => void;
  handlePrevious?: () => void;
}

export const PaginateControl = (props: PaginateProps): React.JSX.Element => {
  // const data = DEFAULT_VARIANTS.map((variant) =>
  //   getButtonVariantProps(variant, props)
  // );
  return (
    <NavElement {...props} aria-label={'Pagination'}>
      <OrderedListElement className={`${BLOCK_NAME}__list`}>
        <PaginateItem {...getButtonVariantProps('paginate-previous', props)} />
        <PaginateItem {...getButtonVariantProps('paginate-current', props)} />
        <PaginateItem {...getButtonVariantProps('paginate-next', props)} />
      </OrderedListElement>
    </NavElement>
  );
};
