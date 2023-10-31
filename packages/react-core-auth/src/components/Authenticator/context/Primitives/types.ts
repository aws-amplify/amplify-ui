import React from 'react';

/********************************/
/** Platform primitive helpers **/
/********************************/

// Below type utilities allow for handling of type differences between
// React and React Native UI Prmitives

export type ButtonHandler<T> = T extends 'react'
  ? { onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void }
  : T extends 'react-native'
  ? { onPress?: (event: any) => void }
  : unknown;

type ImgSrc<T> = T extends 'react'
  ? { src?: string }
  : T extends 'react-native'
  ? { source?: string }
  : unknown;

interface BlurHandler<T> {
  onBlur?: (
    event: T extends 'react'
      ? React.FocusEvent<HTMLInputElement>
      : T extends 'react-native'
      ? any
      : unknown
  ) => void;
}

interface ChangeHandler<T> {
  onChange?: (
    event: T extends 'react'
      ? React.ChangeEvent<HTMLInputElement>
      : T extends 'react-native'
      ? any
      : unknown
  ) => void;
}

interface ChangeTextHandler<T> {
  onChangeText?: T extends 'react-native' ? (event: string) => void : never;
}

export interface SubmitHandler<T> {
  onSubmit?: (
    e: T extends 'react' ? React.FormEvent<HTMLFormElement> : any
  ) => void;
}

/*******************************/
/** Primitive component types **/
/*******************************/

// UI Primitive Components used in `Authenticator` controls

type ButtonVariant = 'copy' | 'link' | 'outline' | 'primary' | 'secondary';
type ButtonType<V extends ButtonVariant> = V extends 'primary'
  ? 'submit'
  : 'button';

// prefer referencing parent interfaces over exporting the below types
type ButtonPrimitiveProps<P, V extends ButtonVariant> = ButtonHandler<P> & {
  children?: React.ReactNode;
  isDisabled?: boolean;
  type?: ButtonType<V>;
};
type CopyButtonPrimitiveProps<T> = ButtonPrimitiveProps<T, 'copy'>;
type LinkButtonPrimitiveProps<T> = ButtonPrimitiveProps<T, 'link'>;
type PrimaryButtonPrimitiveProps<T> = ButtonPrimitiveProps<T, 'primary'>;
type ProviderButtonPrimitiveProps<T> = ButtonPrimitiveProps<T, 'outline'>;
type SecondaryButtonPrimitiveProps<T> = ButtonPrimitiveProps<T, 'secondary'>;
type ButtonGroupPrimitiveProps = { children?: React.ReactNode };
type ImagePrimitiveProps<T> = { children?: React.ReactNode } & ImgSrc<T>;
type MessagePrimitiveProps = { messageType?: 'info' | 'error' };
type ViewPrimitiveProps = { children?: React.ReactNode };
type FieldsetPrimitive = { isDisabled?: boolean };

type FieldType =
  | 'checkbox'
  | 'email'
  | 'password'
  | 'radio'
  | 'select'
  | 'tel'
  | 'text';

interface FieldPrimitivePropsBase<P, T>
  extends ChangeHandler<P>,
    ChangeTextHandler<P>,
    BlurHandler<P> {
  errorMessage?: boolean;
  hasError?: boolean;
  name: string;
  type?: T;
}

type FieldPrimitiveProps<
  P,
  T extends FieldType = FieldType,
> = FieldPrimitivePropsBase<P, T>;
type RadioGroupPrimitiveProps<P = unknown> = FieldPrimitiveProps<P, 'radio'>;

// required by `FormControl`
export type FormPrimitiveProps<T> = SubmitHandler<T> & {
  children?: React.ReactNode;
};

// required by `ContainerControl`
export interface ContainerViewPrimitiveProps {
  children?: React.ReactNode;
  variation?: 'default' | 'modal';
}

/*****************************/
/** Control component types **/
/*****************************/

export type CompoundControlName =
  | 'Actions'
  | 'Links'
  | 'SetupTotp'
  | 'FederatedProviders'
  | 'VerifyContactMethod';

export type PrimitiveControlName =
  | 'Container'
  | 'Description'
  | 'Field'
  | 'Fieldset'
  | 'Form'
  | 'Message'
  | 'Title';

/**
 * Top level Control Component Names
 */
type ControlName = PrimitiveControlName | CompoundControlName;

interface ActionsPrimitives<P> {
  ButtonGroup: React.ComponentType<ButtonGroupPrimitiveProps>;
  PrimaryButton: React.ComponentType<PrimaryButtonPrimitiveProps<P>>;
  SecondaryButton: React.ComponentType<SecondaryButtonPrimitiveProps<P>>;
}

export type ActionsControlType<T = unknown> = (() => JSX.Element) &
  ActionsPrimitives<T>;

interface LinksPrimitives<P> {
  Button: React.ComponentType<LinkButtonPrimitiveProps<P>>;
  ButtonGroup: React.ComponentType<ButtonGroupPrimitiveProps>;
}

export type LinksControlType<T = unknown> = (() => JSX.Element) &
  LinksPrimitives<T> &
  NonPrimitiveControls['Links'];

interface FederatedProvidersPrimitives<P> {
  Button: React.ComponentType<ProviderButtonPrimitiveProps<P>>;
  ButtonGroup: React.ComponentType<ButtonGroupPrimitiveProps>;
  Divider: React.ComponentType<ViewPrimitiveProps>;
}

export type FederatedProvidersControlType<T = unknown> = (() => JSX.Element) &
  FederatedProvidersPrimitives<T> &
  NonPrimitiveControls['FederatedProviders'];

export interface SetupTotpPrimitives<P> {
  Container: React.ComponentType<ViewPrimitiveProps>;
  CopyButton: React.ComponentType<CopyButtonPrimitiveProps<P>>;
  Image: React.ComponentType<ImagePrimitiveProps<P>>;
  InstructionTextOne: React.ComponentType<ViewPrimitiveProps>;
  InstructionTextTwo: React.ComponentType<ViewPrimitiveProps>;
  InstructionTextThree: React.ComponentType<ViewPrimitiveProps>;
  Loader: React.ComponentType;
}

export type SetupTotpControlType<T = unknown> = (() => JSX.Element) &
  SetupTotpPrimitives<T>;

interface VerifyContactMethodPrimitives<T = unknown> {
  RadioGroup: React.ComponentType<RadioGroupPrimitiveProps<T>>;
}

export type VerifyContactMethodControlType<T = unknown> = (() => JSX.Element) &
  VerifyContactMethodPrimitives<T>;

/**
 * Compound Control values contain primitives
 */
interface CompoundPrimitiveControls<T = unknown> {
  Actions: ActionsPrimitives<T>;
  FederatedProviders: FederatedProvidersPrimitives<T>;
  Links: LinksPrimitives<T>;
  SetupTotp: SetupTotpPrimitives<T>;
  VerifyContactMethod: VerifyContactMethodPrimitives<T>;
}

/**
 * Primitive Control keys map directly to a primitive
 */
interface PrimitiveControls<T = unknown> {
  Container: React.ComponentType<ContainerViewPrimitiveProps>;
  Description: React.ComponentType<ViewPrimitiveProps>;
  Field: React.ComponentType<FieldPrimitiveProps<T>>;
  Fieldset: React.ComponentType<FieldsetPrimitive>;
  Form: React.ComponentType<FormPrimitiveProps<T>>;
  Message: React.ComponentType<MessagePrimitiveProps>;
  Title: React.ComponentType<ViewPrimitiveProps>;
}

/**
 * Compound and Primitive Control Components. Provide optional `Platform` generic
 * for `platform` specific types
 */
export interface PrimitivesDefault<T = unknown>
  extends CompoundPrimitiveControls<T>,
    PrimitiveControls<T> {}

/**
 * control type utilities
 */
type ControlComponents = Record<ControlName, any>;
export type PickControls<T extends ControlComponents> = Pick<T, ControlName>;

/**
 * `components` slot prop
 */
export type Components<T extends PrimitivesDefault> = {
  [K in keyof PickControls<T>]?: K extends CompoundControlName
    ? Partial<T[K]>
    : T[K];
};

/**
 * "Convenience" Components responsible for rendering Control specific content.
 * Characteristics of these Components include:
 *
 * - rendering content based on iteration of some configured data, e.g. `federatedProviders`
 * - rendered `children` all use the same underlying primitive, e.g. `FederatedProvider.Button`
 * - do not correspond directly to a Primitive, but use Primitives, e.g. `FederatedProvider.Buttons`
 * - receive no `props`
 * - are not available for override in the `default` use case
 *
 * For example, `FederatedProviders.Buttons` renders the `Button` components
 * corresponding to the configured `federatedProviders` value. This allows
 * `FederatedProvider.Buttons` to be used in composing a custom `MyFederatedProviders`
 * Component without having to interact with the underlying data structures.
 *
 * ```tsx
 * const MyFederatedProviders = () => {
 *   return (
 *     <FederatedProviders.ButtonGroup backgroundColor="berrypink">
 *       <FederatedProviders.Buttons />
 *     </FederatedProviders.ButtonGroup>
 *   )
 * }
 * ```
 */
export interface NonPrimitiveControls {
  FederatedProviders: {
    // renders configured provider buttons
    Buttons: React.ComponentType;
  };
  Links: {
    // renders link buttons for the current `route` if any
    Buttons: React.ComponentType;
  };
  // renders all fields for the current `route`
  Fields: React.ComponentType;
}
