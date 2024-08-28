import React, { AriaAttributes } from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import {
  ButtonElementProps,
  PaginateVariant,
  StorageBrowserElements,
} from '../../context/elements';
import type { OmitElements } from '../types';
import { CLASS_BASE } from '../constants';

const {
  Button: ButtonElement,
  Icon: IconElement,
  ListItem,
  Nav,
  OrderedList,
  Span: SpanElement,
} = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__paginate`;

interface PaginateItemProps
  extends Pick<ButtonElementProps, 'children' | 'disabled' | 'onClick'> {
  variant?: PaginateVariant;
}

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

const PaginateContainer: _PaginateControl['Container'] = function Container({
  children,
  className = BLOCK_NAME,
  ...props
}) {
  return (
    <Nav
      {...props}
      aria-label={props['aria-label'] ?? 'Pagination'}
      className={className}
    >
      <OrderedList className={`${className}__list`}>{children}</OrderedList>
    </Nav>
  );
};

const PaginateItemContainer = withBaseElementProps(
  ListItem,
  ({ className = `${BLOCK_NAME}__item`, ...props }) => ({ ...props, className })
);

const PaginateText: typeof SpanElement = React.forwardRef(function PaginateText(
  { children, className = `${BLOCK_NAME}__text`, ...props },
  ref
) {
  return (
    <SpanElement {...props} className={className} ref={ref}>
      {children}
    </SpanElement>
  );
});

const getButtonVariantProps = (
  variant: PaginateVariant,
  props: PaginateProps
): Omit<ButtonElementProps, 'variant'> & { variant?: PaginateVariant } => {
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
      children = <PaginateText>{currentPage}</PaginateText>;
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
  <PaginateItemContainer>
    <ButtonElement {...props} />
  </PaginateItemContainer>
);

export interface PaginateProps {
  currentPage?: string;
  disableNext?: boolean;
  disablePrevious?: boolean;
  handleNext?: () => void;
  handlePrevious?: () => void;
}

export const PaginateControl = (props: PaginateProps): React.JSX.Element => {
  return (
    <PaginateContainer>
      <PaginateItem {...getButtonVariantProps('paginate-previous', props)} />
      <PaginateItem {...getButtonVariantProps('paginate-current', props)} />
      <PaginateItem {...getButtonVariantProps('paginate-next', props)} />
    </PaginateContainer>
  );
};
