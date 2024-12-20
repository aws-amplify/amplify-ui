import React from 'react';
import { authenticatorTextUtil, MfaType } from '@aws-amplify/ui';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { Radio } from '../../../primitives/Radio';
import { RadioGroupField } from '../../../primitives/RadioGroupField';
import { useAuthenticator } from '@aws-amplify/ui-react-core';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
// import { FormFields } from '../shared/FormFields';
import { ConfirmSignInFooter } from '../shared/ConfirmSignInFooter';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import { RouteContainer, RouteProps } from '../RouteContainer';
import { toLower } from 'lodash';

const { getChallengeText } = authenticatorTextUtil;

function parseMfaTypes(types?: MfaType[]): string {
  if(types) {
    return types.join();
  } else {
    return 'types was undefined.';
  }
}

/*
interface MfaOptions {
  email: string;
  username: string;
}

const opt: MfaOptions = {
  email: 'EMAIL',
  username: 'Totp Prop',
};

type MfaType = 'EMAIL' | 'wow';
*/

const generateRadioGroup = (
  attributes?: MfaType[]
): JSX.Element[] => {
  const elements: JSX.Element[] = [];
  console.log('print attributes: ', attributes);
  attributes.forEach((value, index) => {
    console.log('print value and index: ', value, index);
    elements.push((
      <Radio
        name="mfa_selection"
        value={value}
        key={value}
      >
        Option {index}: {value}
      </Radio>
    ));
  });
  return elements;
  /*
  return attributes.map
    ([key, value]: [string, string], index) => {
      const MfaType = 
      return (
        <Radio
          name="MfaAtt"
          value={key}
          key={key}
          defaultChecked={index === 0}
        >
          {MfaType}:{' '}
          {value}
        </Radio>
      );
    }
  );
  */
};


export const SelectMfa = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending } = useAuthenticator((context) => [context.isPending]);
  const { allowedMFATypes } = useAuthenticator(({ allowedMFATypes }) => [
    allowedMFATypes,
  ]);

  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SelectMfa: {
        Header = SelectMfa.Header,
        Footer = SelectMfa.Footer,
      },
    },
  } = useCustomComponents();

  const verificationRadioGroup = (
    <RadioGroupField
      legend="What up peeps"
      name="figure it out"
      isDisabled={isPending}
    >
      {generateRadioGroup(allowedMFATypes)}
    </RadioGroupField>
    
    /*
    <RadioGroupField
      legend="What up peeps"
      name="figure it out"
      isDisabled={isPending}
    >
      <Radio
        name="mfa_selection"
        value="EMAIL"
        key="EMAIL"
      >
        email:EMAIL
      </Radio>
      <Radio
        name="mfa_selection"
        value="TOTP"
        key="wow"
      >
        totp:wow
      </Radio>
    </RadioGroupField>

    */
  );

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-select-mfa=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <Flex direction="column">
            {verificationRadioGroup}

            <RemoteErrorMessage />
          </Flex>

          <ConfirmSignInFooter />
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
};

SelectMfa.Header = function Header(): JSX.Element {
  const { challengeName } = useAuthenticator(({ challengeName }) => [
    challengeName,
  ]);

  const { allowedMFATypes } = useAuthenticator(({ allowedMFATypes }) => [
    allowedMFATypes,
  ]);

  return <Heading level={3}>{getChallengeText(challengeName)}<br/>MFA types: {parseMfaTypes(allowedMFATypes)}</Heading>;
}

SelectMfa.Footer = function Footer(): JSX.Element {
  // @ts-ignore
  return null;
};

// <FormFields />
