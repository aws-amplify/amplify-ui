import React from 'react';
import { useNonStyleProps, usePropStyles } from '../shared/utils';
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
    style,
    ...rest
  } = props;

  const ViewTag = asElementTag ?? 'div';

  const propStyles = usePropStyles(props, style);
  const nonStyleProps = useNonStyleProps(rest);

  return (
    <ViewTag
      aria-label={ariaLabel}
      className={className}
      data-testid={testId}
      disabled={isDisabled}
      id={id}
      role={role}
      style={propStyles}
      {...nonStyleProps}
    >
      {children}
    </ViewTag>
  );
};
