import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  useProviderDataListContext,
  useProviderDataContext,
  useDisplayTextContext,
  FederatedIdentitiesElements,
  useRedirectFunctionContext,
  ProviderDataProvider,
} from '../context';
import { CLASS_BASE } from '../constants';
import { FederatedProvider } from '@aws-amplify/ui';
import { DefaultFederatedProviderList } from './types';
import { handleClick } from './utils';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';

const { Button, Icon, ListItem, Text } = FederatedIdentitiesElements;

const ListItemControlElement: typeof ListItem = withBaseElementProps(ListItem, {
  className: `${CLASS_BASE}__list__item no-hover`,
});

const IconControlElement: typeof Icon = React.forwardRef(
  function IdentityProvidersIcon({ ...props }, ref) {
    const { icon } = useProviderDataContext();

    if (DefaultFederatedProviderList.includes(icon as FederatedProvider)) {
      return (
        <Icon
          className={`${CLASS_BASE}__icon amplify-icon federated-sign-in-icon`}
          variant={icon as FederatedProvider}
          ref={ref}
          {...props}
        />
      );
    } else if (React.isValidElement(icon)) {
      return icon;
    }

    return null;
  }
);

const TextControlElement: typeof Text = React.forwardRef(function TextElement(
  { children, ...props },
  ref
) {
  const { displayName } = useProviderDataContext();
  const displayTextFunction = useDisplayTextContext();
  const displayText = displayTextFunction(displayName);

  return (
    <Text className={`${CLASS_BASE}__text amplify-text`} ref={ref} {...props}>
      {displayText}
    </Text>
  );
});

export const ButtonControlElement: typeof Button = React.forwardRef(
  function ButtonElement({ children, ...props }, ref) {
    const { providerName } = useProviderDataContext();

    const handleSignInWithRedirect = useRedirectFunctionContext();
    const onClick = handleClick(providerName, handleSignInWithRedirect);

    return (
      <Button
        className={`${CLASS_BASE}__button amplify-button amplify-field-group__control federated-sign-in-button`}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children ?? (
          <>
            <IconControlElement /> <TextControlElement />
          </>
        )}
      </Button>
    );
  }
);

interface IdentityProps<T extends string = string>
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'ref'
  > {
  providerName: T;
}

export interface IdentityControl<T extends string = string>
  extends ForwardRefExoticComponent<
    Omit<IdentityProps<T>, 'ref'> & RefAttributes<HTMLButtonElement>
  > {}

export const IdentityControl: IdentityControl = React.forwardRef<
  HTMLButtonElement,
  IdentityProps
>(function Identity({ children, providerName: _providerName, ...props }, ref) {
  const providers = useProviderDataListContext();
  const value = providers.find(
    ({ providerName }) => providerName === _providerName
  );

  if (!value) {
    throw new Error(`Undeclared providerName: ${_providerName}`);
  }

  return (
    <ProviderDataProvider providerData={value}>
      <ListItemControlElement key={`${value.providerName}__list_item`}>
        <ButtonControlElement
          key={`${value.providerName}__button`}
          {...props}
          ref={ref}
        >
          {children}
        </ButtonControlElement>
      </ListItemControlElement>
    </ProviderDataProvider>
  );
});
