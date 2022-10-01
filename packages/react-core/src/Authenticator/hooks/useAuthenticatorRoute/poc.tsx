import React, { useMemo } from 'react';
import { TextInputProps } from 'react-native';
import { AuthFormData } from '@aws-amplify/ui';

import { resolveAuthenticatorComponents } from '../utils';

import {
  DefaultConfirmSignInComponent,
  DefaultSetupTOTPComponent,
  CommonConfirmSignInComponent,
  CommonSetupTOTPComponent,
  Defaults,
  Overrides,
} from '../types';

import useAuthenticatorRoute from './useAuthenticatorRoute';

interface RWAFormHandlers {
  onBlur: (event: React.FocusEvent<HTMLFormElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLFormElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

interface RNAFormHandlers {
  onBlur: TextInputProps['onBlur'];
  onChangeText: TextInputProps['onChangeText'];
  onSubmit: (formData: AuthFormData) => null;
}

interface ConfirmSignInStyle {}
interface SetupTOTPStyle {}

// needed for default compenents
type RNADefaultConfirmSignIn = DefaultConfirmSignInComponent<
  RNAFormHandlers & { style?: ConfirmSignInStyle }
>;
type RNADefaultSetupTOTP = DefaultSetupTOTPComponent<
  RNAFormHandlers & { style?: SetupTOTPStyle }
>;

// needed for override comps
type RNAOverrideConfirmSignIn<P = {}> = CommonConfirmSignInComponent<
  RNAFormHandlers & { style?: ConfirmSignInStyle },
  P
>;
// type RNAOverrideSetupTOTP<P = {}> = CommonSetupTOTPComponent<
//   RNAFormHandlers & { style?: SetupTOTPStyle },
//   P
// >;

type RWADefaultConfirmSignIn = DefaultConfirmSignInComponent<RWAFormHandlers>;
type RWADefaultSetupTOTP = DefaultSetupTOTPComponent<RWAFormHandlers>;

type RWAOverrideConfirmSignIn<P = {}> = CommonConfirmSignInComponent<
  RWAFormHandlers,
  P
>;
type RWAOverrideSetupTOTP<P = {}> = CommonSetupTOTPComponent<
  RWAFormHandlers,
  P
>;

const RNAConfirmSignIn: RNADefaultConfirmSignIn = () => null;
const RNASetupTOTP: RNADefaultSetupTOTP = () => null;

RNAConfirmSignIn.Footer = () => null;
RNAConfirmSignIn.Header = () => null;
RNAConfirmSignIn.FormFields = () => null;

RNASetupTOTP.Footer = () => null;
RNASetupTOTP.Header = () => null;
RNASetupTOTP.FormFields = () => null;

const RNA_DEFAULTS: Defaults<RNAFormHandlers> = {
  ConfirmSignIn: RNAConfirmSignIn,
  SetupTOTP: RNASetupTOTP,
} as Defaults<RNAFormHandlers>;

// const RNAConfirmResetPassword: Defaults<RNAFormHandlers>['ConfirmResetPassword'] = () => null;
// const RNAConfirmSignIn: Defaults<RNAFormHandlers>['ConfirmSignIn'] = () => null;
// const RNAConfirmSignUp: Defaults<RNAFormHandlers>['ConfirmSignUp'] = () => null;
// const RNAConfirmVerifyUser: Defaults<RNAFormHandlers>['ConfirmVerifyUser'] = () => null;
// const RNAForceNewPassword: Defaults<RNAFormHandlers>['ForceNewPassword'] = () => null;
// const RNAResetPassword: Defaults<RNAFormHandlers>['ResetPassword'] = () => null;
// const RNASetupTOTP: Defaults<RNAFormHandlers>['SetupTOTP'] = () => null;
// const RNASignIn: Defaults<RNAFormHandlers>['SignIn'] = () => null;
// const RNASignUp: Defaults<RNAFormHandlers>['SignUp'] = () => null;
// const RNAVerifyUser: Defaults<RNAFormHandlers>['VerifyUser'] = () => null;

interface RNAPartyTimeProps {
  components?: Overrides<RNAFormHandlers>;
}
export const RNAPartyTime = ({
  components: overrideComponents,
}: RNAPartyTimeProps): JSX.Element | null => {
  const components = useMemo(
    () => resolveAuthenticatorComponents(RNA_DEFAULTS, overrideComponents),
    [overrideComponents]
  );

  const { Component, props } = useAuthenticatorRoute({ components });

  return (
    <Component
      {...props}
      onBlur={() => null}
      onChangeText={() => null}
      onSubmit={() => null}
    />
  );
};

const CustomConfirmSignIn: RNAOverrideConfirmSignIn<{ haha: string }> = () =>
  null;

<RNAPartyTime
  components={{
    ConfirmSignIn: (props) => (
      <CustomConfirmSignIn
        {...props}
        Footer={RNAConfirmSignIn.Footer}
        haha="haha"
        style={{}}
      />
    ),
  }}
/>;

const RWAConfirmSignIn: RWADefaultConfirmSignIn = () => null;
const RWASetupTOTP: RWADefaultSetupTOTP = () => null;

RWAConfirmSignIn.Footer = () => null;
RWAConfirmSignIn.Header = () => null;
RWAConfirmSignIn.FormFields = () => null;

RWASetupTOTP.Footer = () => null;
RWASetupTOTP.Header = () => null;
RWASetupTOTP.FormFields = () => null;

const RWA_DEFAULTS: Defaults<RWAFormHandlers> = {
  ConfirmSignIn: RWAConfirmSignIn,
  SetupTOTP: RWASetupTOTP,
} as Defaults<RWAFormHandlers>;

type RWAOverrides = {
  ConfirmSignIn?: RWAOverrideConfirmSignIn;
  SetupTOTP?: RWAOverrideSetupTOTP;
};

export const RWAPartyTime = ({
  components: overrideComponents,
}: {
  components?: RWAOverrides;
}): JSX.Element => {
  const components = resolveAuthenticatorComponents(
    RWA_DEFAULTS,
    overrideComponents
  );
  const { Component, props } = useAuthenticatorRoute({
    components,
  });

  return (
    <Component
      {...props}
      onBlur={() => null}
      onChange={() => null}
      onSubmit={() => null}
    />
  );
};
