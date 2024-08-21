import * as React from 'react';
import { classNames } from '@aws-amplify/ui';

import { classNameModifier } from '../shared/utils';
import { ComponentClassName } from '@aws-amplify/ui';
import {
  ForwardRefPrimitive,
  Primitive,
  BaseScrollViewProps,
  ScrollViewProps,
} from '../types';
import { View } from '../View';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';
import { useComposeRefsCallback } from '../../hooks/useComposeRefsCallback';

const ScrollViewPrimitive: Primitive<ScrollViewProps, 'div'> = (
  { children, className, orientation, autoScroll, ...rest },
  externalRef
) => {
  const internalRef = React.useRef<HTMLDivElement | null>(null);
  const composedRefs = useComposeRefsCallback<HTMLDivElement | null>({
    externalRef,
    internalRef,
  });

  React.useEffect(() => {
    if (autoScroll) {
      internalRef.current?.scrollTo({
        top: internalRef.current?.scrollHeight,
        left: internalRef.current?.scrollWidth,
        behavior: autoScroll,
      });
    }
  }, [
    children, // include children in the dependency array so that when children changes the scrollview scrolls
    autoScroll,
  ]);

  return (
    <View
      className={classNames(
        ComponentClassName.ScrollView,
        classNameModifier(ComponentClassName.ScrollView, orientation),
        className
      )}
      ref={composedRefs}
      {...rest}
    >
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/scrollview)
 */
export const ScrollView: ForwardRefPrimitive<BaseScrollViewProps, 'div'> =
  primitiveWithForwardRef(ScrollViewPrimitive);

ScrollView.displayName = 'ScrollView';
