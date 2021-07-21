import React from 'react';
import { convertStylePropsToStyleObj, getNonStyleProps } from '../shared/utils';
import { ViewProps } from '../types/index';

export const View: React.FC<ViewProps> = (props) => {
  const {
    as: asElementTag,
    className,
    children,
    role,
    id,
    ariaLabel,
    isDisabled,
    htmlWidth,
    htmlHeight,
    ...rest
  } = props;

  const ViewTag = asElementTag ?? 'div';

  return (
    <ViewTag
      aria-label={ariaLabel}
      className={className}
      data-testid={id}
      disabled={isDisabled}
      height={htmlHeight}
      id={id}
      role={role}
      style={convertStylePropsToStyleObj(props)}
      width={htmlWidth}
      {...getNonStyleProps(rest)}
    >
      {children}
    </ViewTag>
  );
};
