import classNames from 'classnames';
import React from 'react';
import { ComponentClassNames } from '../shared/constants';
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
      style={convertStylePropsToStyleObj(props)}
      id={id}
      data-testid={id}
      aria-label={ariaLabel}
      role={role}
      className={classNames(ComponentClassNames.View, className)}
      disabled={isDisabled}
      width={htmlWidth}
      height={htmlHeight}
      {...getNonStyleProps(rest)}
    >
      {children}
    </ViewTag>
  );
};
