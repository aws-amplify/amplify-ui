import React from 'react';

import {
  ButtonElementProps,
  PaginateVariant,
  SpanElement,
  StorageBrowserElements,
} from '../../context/elements';
import { Paginate } from '../../components/Paginate';

import { CLASS_BASE } from '../constants';

const { Icon: IconElement } = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__paginate`;
const DEFAULT_VARIANTS = [
  'paginate-previous',
  'paginate-current',
  'paginate-next',
] as const;

const getButtonVariantProps = (
  variant: PaginateVariant,
  props: PaginateControlProps
): ButtonElementProps => {
  const {
    currentPage,
    disableNext,
    disablePrevious,
    handleNext,
    handlePrevious,
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

// all props below are used but eslint is erroring as they are passed to
// `getButtonVariantProps` instead of a React component
export interface PaginateControlProps {
  // eslint-disable-next-line react/no-unused-prop-types
  currentPage?: number;
  // eslint-disable-next-line react/no-unused-prop-types
  disableNext?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  disablePrevious?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types
  handleNext?: () => void;
  // eslint-disable-next-line react/no-unused-prop-types
  handlePrevious?: () => void;
}

export const PaginateControl = (
  props: PaginateControlProps
): React.JSX.Element => {
  const data = DEFAULT_VARIANTS.map((variant) =>
    getButtonVariantProps(variant, props)
  );
  return <Paginate data={data} />;
};
