import React from 'react';
import useBreakpoint from 'use-breakpoint';
import { useNonStyleProps, usePropStyles } from '../shared/utils';
import { ViewProps } from '../types/index';

const breakpoints = {
  base: 0,
  small: 480,
  medium: 768,
  large: 992,
  xl: 1280,
  xxl: 1536,
};

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

  const { breakpoint, minWidth, maxWidth } = useBreakpoint(
    breakpoints,
    'base',
    false
  );
  console.log(breakpoint, minWidth, maxWidth);

  const propStyles = usePropStyles(props, style, breakpoint);
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
