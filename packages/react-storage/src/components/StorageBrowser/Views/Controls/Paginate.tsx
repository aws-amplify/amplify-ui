import React, { AriaAttributes } from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import {
  ButtonElementProps,
  PaginateVariant,
  StorageBrowserElements,
} from '../../context/elements';
import type { OmitElements } from '../types';
import { CLASS_BASE } from '../constants';
import { PaginateStateContext, useControl } from '../../context/controls';

const {
  Button: ButtonElement,
  Icon: IconElement,
  ListItem,
  Nav,
  OrderedList,
  Span: SpanElement,
} = StorageBrowserElements;

const BLOCK_NAME = `${CLASS_BASE}__paginate`;
const PAGINATE_VARIANTS = [
  { variant: 'paginate-previous' },
  { variant: 'paginate-current' },
  { variant: 'paginate-next' },
] as const;

interface PaginateItemProps extends Pick<ButtonElementProps, 'onClick'> {
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

const PaginateContainer: _PaginateControl['Container'] = React.forwardRef(
  function Container({ children, ...props }, ref) {
    return (
      <Nav
        {...props}
        aria-label={props['aria-label'] ?? 'Pagination'}
        className={props.className ?? `${BLOCK_NAME}__container`}
        ref={ref}
      >
        <OrderedList className={`${props.className ?? BLOCK_NAME}__list`}>
          {children}
        </OrderedList>
      </Nav>
    );
  }
);

const PaginateItemContext = React.createContext<PaginateItemProps>({
  variant: undefined,
});

const PaginateItemContainer = withBaseElementProps(
  ListItem,
  ({ className = `${BLOCK_NAME}__item`, ...props }) => ({ ...props, className })
);

const PaginateText: typeof SpanElement = React.forwardRef(function Span(
  { children, className = `${BLOCK_NAME}__text`, variant: _variant, ...props },
  ref
) {
  const { variant } = React.useContext(PaginateItemContext);
  const [{ current }] = useControl({ type: 'PAGINATE' });

  return (
    <SpanElement
      {...props}
      className={className}
      ref={ref}
      variant={_variant ?? variant}
    >
      {children ?? current}
    </SpanElement>
  );
});

const getButtonVariantProps = (
  { variant, ...props }: ButtonElementProps,
  context: PaginateStateContext
): ButtonElementProps => {
  const [
    { hasNext, hasPrevious, isLoadingNextPage, current },
    handleUpdateState,
  ] = context;

  let ariaCurrent: AriaAttributes['aria-current'];
  let ariaLabel, className, disabled, onClick, children;

  switch (variant) {
    case 'paginate-current':
      ariaCurrent = 'page';
      ariaLabel = `Page ${current}`;
      children = <PaginateText />;
      className = `${BLOCK_NAME}__button-current`;
      break;
    case 'paginate-next':
      ariaLabel = 'Go to next page';
      className = `${BLOCK_NAME}__button-next`;
      disabled = !hasNext || isLoadingNextPage;
      onClick = () => handleUpdateState({ type: 'NEXT' });
      children = (
        <IconElement variant={variant} className={`${BLOCK_NAME}__icon`} />
      );
      break;
    case 'paginate-previous':
      ariaLabel = 'Go to previous page';
      className = `${BLOCK_NAME}__button-next`;
      disabled = !hasPrevious;
      onClick = () => handleUpdateState({ type: 'PREVIOUS' });
      children = (
        <IconElement variant={variant} className={`${BLOCK_NAME}__icon`} />
      );
      break;
  }

  return {
    ...props,
    'aria-current': props['aria-current'] ?? ariaCurrent,
    'aria-label': props['aria-label'] ?? ariaLabel,
    children: props.children ?? children,
    className: props.className ?? className,
    disabled: props.disabled ?? disabled,
    onClick: props.onClick ?? onClick,
    type: props.type ?? 'button',
    variant,
  };
};

const PaginateButtonControl: typeof ButtonElement = React.forwardRef(
  function Button({ variant: _variant, ...props }, ref) {
    const { variant } = React.useContext(PaginateItemContext);
    const context = useControl({ type: 'PAGINATE' });

    return (
      <ButtonElement
        {...getButtonVariantProps(
          { ref, variant: _variant ?? variant, ...props },
          context
        )}
      />
    );
  }
);

const PaginateItem = (props: PaginateItemProps) => {
  const { variant } = props;

  return (
    <PaginateItemContext.Provider key={variant} value={props}>
      <PaginateItemContainer>
        <PaginateButtonControl />
      </PaginateItemContainer>
    </PaginateItemContext.Provider>
  );
};

const CurrentControl = ({ variant }: PaginateItemProps) => (
  <PaginateItem variant={variant ?? 'paginate-current'} />
);

const NextControl = ({ variant }: PaginateItemProps) => (
  <PaginateItem variant={variant ?? 'paginate-next'} />
);

const PreviousControl = ({ variant }: PaginateItemProps) => (
  <PaginateItem variant={variant ?? 'paginate-previous'} />
);

export const PaginateControl: PaginateControl = () => {
  return (
    <PaginateContainer>
      {PAGINATE_VARIANTS.map((props) => (
        <PaginateItem key={props.variant} {...props} />
      ))}
    </PaginateContainer>
  );
};

PaginateControl.Current = CurrentControl;
PaginateControl.Next = NextControl;
PaginateControl.Previous = PreviousControl;
