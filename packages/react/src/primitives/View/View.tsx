import React from 'react';
import { convertStylePropsToStyleObj, getNonStyleProps } from '../shared/utils';
import { ViewProps } from '../types/index';
import postcssJs from 'postcss-js';
import autoprefixer from 'autoprefixer';

const prefixer = postcssJs.sync([autoprefixer]);

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
    style,
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
      style={prefixer(convertStylePropsToStyleObj(props, style))}
      {...getNonStyleProps(rest)}
    >
      {children}
    </ViewTag>
  );
};
