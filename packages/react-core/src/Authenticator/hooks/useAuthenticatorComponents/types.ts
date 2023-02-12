import React from 'react';
import { AuthenticatorRoute } from '@aws-amplify/ui';

import { UseAuthenticator } from '../useAuthenticator';
import { BaseRouteComponentsProps } from '../useAuthenticatorProps';
import { AuthenticatorRouteComponentName } from '../types';

interface HeaderProps {
  children?: React.ReactNode;
}

interface FooterProps {
  children?: React.ReactNode;
}

type FormFieldsProps = {
  isPending: UseAuthenticator['isPending'];
  validationErrors?: UseAuthenticator['validationErrors'];
};

export type FooterComponent<Props = {}> = React.ComponentType<
  FooterProps & Props
>;

export type FormFieldsComponent<Props = {}> = React.ComponentType<
  FormFieldsProps & Props
>;

export type HeaderComponent<Props = {}> = React.ComponentType<
  HeaderProps & Props
>;

/**
 * Route Component `props` ensuring the correct type parameters for Route Component specific:
 * - `fields` prop
 * - React/React Native props, example `style`
 * - component slots, example `FormFields`
 */
export interface AdditionalRouteProps {
  // use `unknown` instead of `any` to prevent allowing `any` as the type of `fields` used
  // in Route Components and `FormFields` components
  fields: unknown;
  Footer: FooterComponent<any>;
  FormFields: FormFieldsComponent<any>;
  Header: HeaderComponent<any>;
}

type ExtractProps<T extends React.ComponentType<any>> =
  T extends React.ComponentType<infer P> ? P : never;

type DefaultComponentSlots<ComponentSlots extends AdditionalRouteProps> = {
  Footer: FooterComponent<ExtractProps<ComponentSlots['Footer']>>;
  // to ensure the `fields` prop of `FormFields` aligns to the parent Route Component `fields`
  // prop, extract the props of the given `FormFields` and pass in to the `FormFieldsComponent`
  // type along with the `fields` prop of the parent
  FormFields: FormFieldsComponent<
    ExtractProps<ComponentSlots['FormFields']> & Pick<ComponentSlots, 'fields'>
  >;
  Header: HeaderComponent<ExtractProps<ComponentSlots['Header']>>;
};

type BaseComponentType<RouteProps> = React.ComponentType<RouteProps>;

type DefaultComponentType<Props extends AdditionalRouteProps> =
  BaseComponentType<Props> & DefaultComponentSlots<Props>;

type AdditionalRoutesPropsTemplate = Record<
  AuthenticatorRouteComponentName,
  AdditionalRouteProps
>;

export type RouteComponentsDefaults<
  AdditionalRoutesProps extends AdditionalRoutesPropsTemplate = AdditionalRoutesPropsTemplate
> = {
  [Key in AuthenticatorRouteComponentName]: DefaultComponentType<
    BaseRouteComponentsProps[Uncapitalize<Key>] & AdditionalRoutesProps[Key]
  >;
};

export type RouteComponentsOverrides<
  AdditionalRoutesProps extends AdditionalRoutesPropsTemplate = AdditionalRoutesPropsTemplate
> = {
  [Key in AuthenticatorRouteComponentName]?: BaseComponentType<
    BaseRouteComponentsProps[Uncapitalize<Key>] & AdditionalRoutesProps[Key]
  >;
};

type WebDefaultComponentType<Props extends AdditionalRouteProps> =
  BaseComponentType<Props> &
    // prevents `fields` as a required prop for usage of the static `FormFields` slots
    // on subcomponents, e.g. <AuthenticatorAssertionResponse.SignUp.FormFields />
    Omit<AdditionalRouteProps, 'fields'>;

/**
 * `WebRouteComponentsDefaults` is a temporary type used to prevent
 * a breaking TS change for RWA due to documented usage of component
 * slots without `props`, example:
 * ```
 * <Authenticator
 *   components={{
 *     SignUp: {
 *       FormFields: () => (
 *         <>
 *           <Authenticator.SignUp.FormFields />
 *           <p>Some Additional Content</p>
 *         </>
 *       ),
 *     },
 *   }}
 * />
 * ```
 */
export type WebRouteComponentsDefaults<
  AdditionalRoutesProps extends AdditionalRoutesPropsTemplate = AdditionalRoutesPropsTemplate
> = {
  [Key in AuthenticatorRouteComponentName]: WebDefaultComponentType<
    BaseRouteComponentsProps[Uncapitalize<Key>] & AdditionalRoutesProps[Key]
  >;
};

export interface UseAuthenticatorComponentsParams<
  Defaults extends RouteComponentsDefaults<any>,
  Route extends AuthenticatorRoute = AuthenticatorRoute
> {
  defaults: Defaults;
  overrides?: RouteComponentsOverrides<any>;
  route: Route;
}

export type UseAuthenticatorComponents<
  Defaults extends RouteComponentsDefaults<any>,
  Route extends AuthenticatorRoute
> = Capitalize<Route> extends AuthenticatorRouteComponentName
  ? Defaults[Capitalize<Route>]
  : React.ComponentType<any>;
