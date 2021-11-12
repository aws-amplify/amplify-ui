import classNames from 'classnames';
import * as React from 'react';

import { ComponentClassNames } from '../shared';
import { Primitive } from '../types/view';
import { TextAreaProps } from '../types/textArea';
import { View } from '../View';

export const TextArea: Primitive<TextAreaProps, 'textarea'> = ({
  className,
  isReadOnly,
  isRequired,
  size,
  hasError = false,
  variation,
  ...rest
}) => (
  <View
    aria-invalid={hasError}
    as="textarea"
    className={classNames(
      ComponentClassNames.Textarea,
      ComponentClassNames.FieldGroupControl,
      className
    )}
    data-size={size}
    data-variation={variation}
    readOnly={isReadOnly}
    required={isRequired}
    {...rest}
  />
);

TextArea.displayName = 'TextArea';
