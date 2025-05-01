import * as React from 'react';

import { authenticatorTextUtil } from '@aws-amplify/ui';
import { useAuthenticator } from '@aws-amplify/ui-react-core';

import { Flex } from '../../../primitives/Flex';
import { Heading } from '../../../primitives/Heading';
import { RadioGroupField } from '../../../primitives/RadioGroupField';
import { Radio } from '../../../primitives/Radio';
import { useCustomComponents } from '../hooks/useCustomComponents';
import { useFormHandlers } from '../hooks/useFormHandlers';
import { ConfirmSignInFooter } from '../shared/ConfirmSignInFooter';
import { RemoteErrorMessage } from '../shared/RemoteErrorMessage';
import type { RouteProps } from '../RouteContainer';
import { RouteContainer } from '../RouteContainer';

const {
  getMfaTypeLabelByValue,
  getSelectMfaTypeByChallengeName,
  getSelectMfaTypeText,
} = authenticatorTextUtil;

export const SelectMfaType = ({
  className,
  variation,
}: RouteProps): JSX.Element => {
  const { isPending, allowedMfaTypes = [] } = useAuthenticator((context) => {
    return [context.isPending, context.allowedMfaTypes];
  });

  const { handleChange, handleSubmit } = useFormHandlers();

  const {
    components: {
      // @ts-ignore
      SelectMfaType: {
        Header = SelectMfaType.Header,
        Footer = SelectMfaType.Footer,
      },
    },
  } = useCustomComponents();

  return (
    <RouteContainer className={className} variation={variation}>
      <form
        data-amplify-form=""
        data-amplify-authenticator-select-mfa-type=""
        method="post"
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <Flex as="fieldset" direction="column" isDisabled={isPending}>
          <Header />

          <Flex direction="column">
            <RadioGroupField
              name="mfa_type"
              legend={getSelectMfaTypeText()}
              legendHidden
              isDisabled={isPending}
              isRequired
            >
              {allowedMfaTypes.map((value, index) => (
                <Radio
                  name="mfa_type"
                  key={value}
                  value={value}
                  defaultChecked={index === 0}
                >
                  {getMfaTypeLabelByValue(value)}
                </Radio>
              ))}
            </RadioGroupField>

            <RemoteErrorMessage />
          </Flex>

          <ConfirmSignInFooter />
          <Footer />
        </Flex>
      </form>
    </RouteContainer>
  );
};

SelectMfaType.Header = function Header(): JSX.Element {
  const { challengeName } = useAuthenticator((context) => {
    return [context.challengeName];
  });

  return (
    <Heading level={3}>
      {getSelectMfaTypeByChallengeName(challengeName)}
    </Heading>
  );
};

SelectMfaType.Footer = function Footer(): JSX.Element {
  // @ts-ignore
  return null;
};
