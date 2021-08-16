import * as React from 'react';
import { convertStylePropsToStyleObj, getNonStyleProps } from '../shared/utils';
import { ViewProps } from '../types/index';

export const View: React.FC<ViewProps> = (props) => {
  const {
    as: asElementTag,
    className,
    children,
    role,
    id,
    testId,
    ariaLabel,
    isDisabled,
    ...rest
  } = props;

  const ViewTag = asElementTag ?? 'div';

  return (
    <ViewTag
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      disabled={isDisabled}
      id={id}
      role={role}
      style={convertStylePropsToStyleObj(props)}
      {...getNonStyleProps(rest)}
    >
      {children}
    </ViewTag>
  );
};
