import { classNames } from '@aws-amplify/ui';
import * as React from 'react';

import { View } from '../View';
import { strHasLength } from '../shared/utils';
import { getUniqueComponentId } from '../utils/getUniqueComponentId';
import { ComponentClassName } from '@aws-amplify/ui';
import type {
  BaseHighlightMatchProps,
  HighlightMatchProps,
  ForwardRefPrimitive,
  Primitive,
} from '../types';
import { primitiveWithForwardRef } from '../utils/primitiveWithForwardRef';

export const HighlightMatchPrimitive: Primitive<HighlightMatchProps, 'span'> = (
  { children, className, query, testId, ...rest },
  ref
) => {
  const matchTestId = getUniqueComponentId(testId, 'match');
  const startIndex = children
    ?.toLocaleLowerCase()
    .indexOf(query?.toLocaleLowerCase());

  if (strHasLength(query) && startIndex !== -1) {
    const match = children.substring(startIndex, startIndex + query.length);
    return (
      <View
        as="span"
        className={classNames(className, ComponentClassName.HighlightMatch)}
        testId={testId}
        ref={ref}
        {...rest}
      >
        {children.substring(0, startIndex)}
        <View
          as="strong"
          className={ComponentClassName.HighlightMatchHighlighted}
          testId={matchTestId}
        >
          {match}
        </View>
        {children.substring(startIndex + query.length)}
      </View>
    );
  }

  return (
    <View as="span" testId={testId}>
      {children}
    </View>
  );
};

/**
 * [📖 Docs](https://ui.docs.amplify.aws/react/components/highlightmatch)
 */
export const HighlightMatch: ForwardRefPrimitive<
  BaseHighlightMatchProps,
  'span'
> = primitiveWithForwardRef(HighlightMatchPrimitive);

HighlightMatch.displayName = 'HighlightMatch';
