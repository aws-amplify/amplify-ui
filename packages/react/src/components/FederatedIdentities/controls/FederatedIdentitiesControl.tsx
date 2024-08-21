import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import { IdentityControl } from './IdentityControl';
import {
  CreateFederatedIdentitiesInput,
  RenderButton,
  CreateProviderInput,
  UseHandleSignInWithRedirectOutput,
} from './types';
import { FederatedIdentitiesElements, useRedirectHook } from '../context';
import { withBaseElementProps } from '@aws-amplify/ui-react-core/elements';
import createProvider from './createProvider';
import { toProviderData } from './utils';
import { CLASS_BASE } from '../constants';

const { Group } = FederatedIdentitiesElements;

interface ChildrenProps {
  children?: React.ReactNode;
  renderButton?: never;
}

interface RenderButtonProps<T extends string = string> {
  children?: never;
  renderButton?: RenderButton<T>;
}

type FederatedIdentitiesProps<T extends string = string> = (
  | ChildrenProps
  | RenderButtonProps<T>
) &
  Omit<
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
    'ref'
  >;

export interface FederatedIdentitiesControl<T extends string = string>
  extends ForwardRefExoticComponent<FederatedIdentitiesProps<T>> {
  Identity: IdentityControl<T>;
}

const GroupControlElement: typeof Group = withBaseElementProps(Group, {
  className: `${CLASS_BASE}__group amplify-flex federated-sign-in-container`,
  'aria-roledescription': 'group',
  'aria-label': 'Federated Identities Button Group',
});

export function createFederatedIdentities<
  T extends Partial<FederatedIdentitiesElements>,
  K extends string = string,
>({
  providers,
  elements,
  ...input
}: CreateFederatedIdentitiesInput<T, K>): {
  FederatedIdentities: FederatedIdentitiesControl;
  useHandleSignInWithRedirect: () => UseHandleSignInWithRedirectOutput;
} {
  const providerDataList = toProviderData<K>(providers);
  const createProviderInput: CreateProviderInput<T, K> = {
    providers: providerDataList,
    elements,
    ...input,
  };

  const Provider = createProvider(createProviderInput);

  //Outermost control/base element is not context aware of ElementsProvider
  let GroupControl = GroupControlElement;
  if (elements?.Group) {
    GroupControl = elements.Group;
  }

  const FederatedIdentitiesGroup = forwardRef<
    HTMLDivElement,
    FederatedIdentitiesProps
  >(function FederatedIdentities({ children, renderButton, ...props }, ref) {
    return (
      <Provider>
        <GroupControl ref={ref} {...props}>
          {children ??
            providerDataList.map((provider) =>
              renderButton ? (
                renderButton(provider)
              ) : (
                <IdentityControl
                  key={'Identity_' + provider.providerName}
                  providerName={provider.providerName}
                />
              )
            )}
        </GroupControl>
      </Provider>
    );
  });

  const FederatedIdentitiesControl = {
    ...FederatedIdentitiesGroup,
    Identity: IdentityControl,
  } as FederatedIdentitiesControl;

  return {
    FederatedIdentities: FederatedIdentitiesControl,
    useHandleSignInWithRedirect: useRedirectHook,
  };
}
