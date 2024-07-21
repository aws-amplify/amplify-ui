import React from 'react';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

import {
  ButtonElementProps,
  IconElementProps,
  PaginateVariant,
  StorageBrowserElements,
} from '../../context/elements';
import { CLASS_BASE } from '../constants';
import { PaginateStateContext, useControl } from '../../context/controls';

const {
  Button: ButtonElement,
  Icon: IconElement,
  ListItem,
  Nav,
  OrderedList,
  Text: TextElement,
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

interface PaginateItemControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends Pick<T, 'Button'> {
  (props: PaginateItemProps): React.JSX.Element;
  Container: T['ListItem'];
}

interface PreviousControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends PaginateItemControl<T>,
    Pick<T, 'Icon'> {}

interface NextControl<T extends StorageBrowserElements = StorageBrowserElements>
  extends PaginateItemControl<T>,
    Pick<T, 'Icon'> {}

interface CurrentControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> extends PaginateItemControl<T>,
    Pick<T, 'Text'> {}

export interface PaginateControl<
  T extends StorageBrowserElements = StorageBrowserElements,
> {
  (): React.JSX.Element;
  Container: T['Nav'];
  Current: CurrentControl<T>;
  Next: NextControl<T>;
  Previous: PreviousControl<T>;
}

const iconAttributes = {
  'aria-hidden': true,
  className: `${BLOCK_NAME}__icon`,
  width: '24',
  height: '24',
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const getIconProps = ({
  variant,
  ...props
}: IconElementProps): IconElementProps => {
  let children;
  switch (variant) {
    case 'paginate-previous':
      children = (
        <path
          d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
          fill="currentColor"
        />
      );
      break;
    case 'paginate-next':
      children = (
        <path
          d="M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z"
          fill="currentColor"
        />
      );
      break;
  }

  return {
    ...iconAttributes,
    ...props,
    children: props.children ?? children,
    variant,
  };
};

const PaginateContainer: PaginateControl['Container'] = React.forwardRef(
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

const PaginateText: CurrentControl['Text'] = React.forwardRef(function Text(
  { children, className = `${BLOCK_NAME}__text`, variant: _variant, ...props },
  ref
) {
  const { variant } = React.useContext(PaginateItemContext);
  const [{ current }] = useControl({ key: 'PAGINATE' });

  return (
    <TextElement
      {...props}
      className={className}
      ref={ref}
      variant={_variant ?? variant}
    >
      {children ?? current}
    </TextElement>
  );
});

const PaginateIcon: (PreviousControl | NextControl)['Icon'] = React.forwardRef(
  function Icon({ variant: _variant, ...props }, ref) {
    const { variant } = React.useContext(PaginateItemContext);
    return (
      <IconElement
        {...getIconProps({ ...props, ref, variant: _variant ?? variant })}
      />
    );
  }
);

const getButtonVariantProps = (
  { variant, ...props }: ButtonElementProps,
  context: PaginateStateContext
): ButtonElementProps => {
  const [{ hasNext, hasPrevious, isLoadingNextPage }, handleUpdateState] =
    context;

  let ariaDisabled, ariaLabel, className, disabled, onClick;
  let children = <PaginateIcon />;

  switch (variant) {
    case 'paginate-current':
      ariaLabel = 'Current page';
      children = <PaginateText />;
      className = `${BLOCK_NAME}__button-current`;
      break;
    case 'paginate-next':
      ariaDisabled = true;
      ariaLabel = 'Go to next page';
      className = `${BLOCK_NAME}__button-next`;
      disabled = !hasNext || isLoadingNextPage;
      onClick = () => handleUpdateState({ type: 'NEXT' });
      break;
    case 'paginate-previous':
      ariaLabel = 'Go to previous page';
      className = `${BLOCK_NAME}__button-next`;
      disabled = !hasPrevious;
      onClick = () => handleUpdateState({ type: 'PREVIOUS' });
      break;
  }
  return {
    ...props,
    'aria-disabled': props['aria-disabled'] ?? ariaDisabled,
    'aria-label': props['aria-label'] ?? ariaLabel,
    children: props.children ?? children,
    className: props.className ?? className,
    disabled: props.disabled ?? disabled,
    onClick: props.onClick ?? onClick,
    type: props.type ?? 'button',
    variant,
  };
};

const PaginateButtonControl: PaginateItemControl['Button'] = React.forwardRef(
  function Button({ variant: _variant, ...props }, ref) {
    const { variant } = React.useContext(PaginateItemContext);
    const context = useControl({ key: 'PAGINATE' });

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

export const PaginateControl: PaginateControl = () => (
  <PaginateContainer>
    {PAGINATE_VARIANTS.map((props) => (
      <PaginateItem key={props.variant} {...props} />
    ))}
  </PaginateContainer>
);

const paginateComponents = {
  Container: PaginateItemContainer,
  Button: PaginateButtonControl,
  Text: PaginateText,
  Icon: PaginateIcon,
};

PaginateControl.Container = PaginateContainer;
PaginateControl.Current = Object.assign({}, CurrentControl, paginateComponents);
PaginateControl.Next = Object.assign({}, NextControl, paginateComponents);
PaginateControl.Previous = Object.assign(
  {},
  PreviousControl,
  paginateComponents
);
