import React, { useMemo } from 'react';
import { authenticatorTextUtil } from '@aws-amplify/ui';

import {
  DefaultContent,
  DefaultFooter,
  DefaultHeader,
  DefaultSelectMfaTypeFormFields,
} from '../../common';
import { useFieldValues } from '../../hooks';

import type { DefaultSelectMfaTypeProps } from '../types';

const COMPONENT_NAME = 'SelectMfaType';

const {
  getSelectMfaTypeByChallengeName,
  getBackToSignInText,
  getConfirmText,
  getConfirmingText,
} = authenticatorTextUtil;

const SelectMfaType = ({
  challengeName,
  fields,
  handleBlur,
  handleChange,
  handleSubmit,
  isPending,
  toSignIn,
  validationErrors,
  ...rest
}: DefaultSelectMfaTypeProps): React.JSX.Element => {
  const {
    disableFormSubmit: disabled,
    fields: fieldsWithHandlers,
    fieldValidationErrors,
    handleFormSubmit,
  } = useFieldValues({
    componentName: COMPONENT_NAME,
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
    validationErrors,
  });

  const headerText = getSelectMfaTypeByChallengeName(challengeName);
  const primaryButtonText = isPending ? getConfirmingText() : getConfirmText();
  const secondaryButtonText = getBackToSignInText();

  const buttons = useMemo(
    () => ({
      primary: {
        children: primaryButtonText,
        disabled,
        onPress: handleFormSubmit,
      },
      links: [{ children: secondaryButtonText, onPress: toSignIn }],
    }),
    [
      disabled,
      handleFormSubmit,
      primaryButtonText,
      secondaryButtonText,
      toSignIn,
    ]
  );

  return (
    <DefaultContent
      {...rest}
      buttons={buttons}
      headerText={headerText}
      fields={fieldsWithHandlers}
      isPending={isPending}
      validationErrors={fieldValidationErrors}
    />
  );
};

SelectMfaType.Footer = DefaultFooter;
SelectMfaType.FormFields = DefaultSelectMfaTypeFormFields;
SelectMfaType.Header = DefaultHeader;

SelectMfaType.displayName = COMPONENT_NAME;
export default SelectMfaType;
