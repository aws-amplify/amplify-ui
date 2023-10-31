import * as React from 'react';
import classNames from 'classnames';

import { ComponentClassName } from '@aws-amplify/ui';
import { DialCodeSelect } from './DialCodeSelect';
import {
  PhoneNumberFieldProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { ComponentText } from '../shared/constants';
import { TextField } from '../TextField';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

const PhoneNumberFieldPrimitive: Primitive<PhoneNumberFieldProps, 'input'> = (
  {
    autoComplete = 'tel-national',
    className,
    defaultDialCode,
    dialCodeLabel = ComponentText.PhoneNumberField.countryCodeLabel,
    dialCodeList,
    dialCodeName,
    dialCodeRef,
    hasError,
    isDisabled,
    isReadOnly,
    onDialCodeChange,
    onInput,
    size,
    variation,
    ...rest
  },
  ref
) => {
  return (
    <TextField
      outerStartComponent={
        <DialCodeSelect
          defaultValue={defaultDialCode}
          dialCodeList={dialCodeList}
          className={className}
          hasError={hasError}
          isDisabled={isDisabled}
          isReadOnly={isReadOnly}
          label={dialCodeLabel}
          name={dialCodeName}
          onChange={onDialCodeChange}
          ref={dialCodeRef}
          size={size}
          variation={variation}
        />
      }
      autoComplete={autoComplete}
      className={classNames(ComponentClassName.PhoneNumberField, className)}
      hasError={hasError}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      onInput={onInput}
      ref={ref}
      size={size}
      type="tel"
      variation={variation}
      {...rest}
    />
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/phonenumberfield)
 */
export const PhoneNumberField: ForwardRefPrimitive<
  PhoneNumberFieldProps,
  'input'
> = primitiveWithForwardRef(PhoneNumberFieldPrimitive);

PhoneNumberField.displayName = 'PhoneNumberField';
