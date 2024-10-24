import React from 'react';
import { CLASS_BASE } from '../views/constants';
import {
  ButtonElement,
  ButtonElementProps,
  IconElement,
  ListItemElement,
  NavElement,
  OrderedListElement,
  SpanElement,
} from '../context/elements';
import { DataListProps } from '../components/types';

export interface PaginationProps {
  currentPage: number;
  disableNext: boolean;
  disablePrevious: boolean;
  handlePaginateNext: () => void;
  handlePaginatePrevious: () => void;
}

export type PaginationVariant = `paginate-${'next' | 'current' | 'previous'}`;

const BLOCK_NAME = `${CLASS_BASE}__pagination`;
const DEFAULT_VARIANTS: PaginationVariant[] = [
  'paginate-previous',
  'paginate-current',
  'paginate-next',
];

const getButtonVariantProps = (
  variant: PaginationVariant,
  props: PaginationProps
): ButtonElementProps => {
  const {
    currentPage,
    disableNext,
    disablePrevious,
    handlePaginateNext,
    handlePaginatePrevious,
  } = props;

  let ariaCurrent, ariaLabel, className, disabled, onClick, children;

  switch (variant) {
    case 'paginate-current': {
      const page = `${currentPage}`;

      ariaCurrent = 'page' as const;
      ariaLabel = `Page ${page}`;
      children = (
        <SpanElement className={`${BLOCK_NAME}__text`}>{page}</SpanElement>
      );
      className = `${BLOCK_NAME}__button-current`;
      break;
    }
    case 'paginate-next':
      ariaLabel = 'Go to next page';
      className = `${BLOCK_NAME}__button-next`;
      disabled = disableNext;
      onClick = handlePaginateNext;
      children = (
        <IconElement variant={variant} className={`${BLOCK_NAME}__icon`} />
      );
      break;
    case 'paginate-previous':
      ariaLabel = 'Go to previous page';
      className = `${BLOCK_NAME}__button-next`;
      disabled = disablePrevious;
      onClick = handlePaginatePrevious;
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

export interface PaginationItemProps extends ButtonElementProps {}

export interface PaginateProps extends DataListProps<PaginationItemProps> {}

function PaginationItem(props: PaginationItemProps, index: number) {
  return (
    <ListItemElement
      className={`${BLOCK_NAME}__item`}
      key={props?.key ?? index}
    >
      <ButtonElement {...props} />
    </ListItemElement>
  );
}

export const Pagination = ({
  currentPage,
  handlePaginateNext,
  handlePaginatePrevious,
  disableNext,
  disablePrevious,
}: PaginationProps): React.JSX.Element | null => {
  const props = {
    currentPage,
    disableNext,
    disablePrevious,
    handlePaginateNext,
    handlePaginatePrevious,
  };

  const data = DEFAULT_VARIANTS.map((variant: PaginationVariant) =>
    getButtonVariantProps(variant, props)
  );
  return (
    <NavElement aria-label={'Pagination'} className={BLOCK_NAME}>
      <OrderedListElement className={`${BLOCK_NAME}__list`}>
        {data.map((item, index) => (
          <PaginationItem key={index} {...item} />
        ))}
      </OrderedListElement>
    </NavElement>
  );
};
