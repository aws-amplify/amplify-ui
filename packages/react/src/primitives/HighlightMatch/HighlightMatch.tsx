import classNames from 'classnames';
import * as React from 'react';

import { View } from '../View';
import { strHasLength } from '../shared/utils';
import { getTestId } from '../utils/testUtils';
import { ComponentClassNames } from '../shared/constants';
import type { HighlightMatchProps, Primitive } from '../types';

export const HighlightMatchPrimitive: Primitive<HighlightMatchProps, 'span'> = (
  { children, className, query, testId, ...rest },
  ref
) => {
  const matchTestId = getTestId(testId, 'match');
  const startIndex = children
    ?.toLocaleLowerCase()
    .indexOf(query?.toLocaleLowerCase());

  if (strHasLength(query) && startIndex !== -1) {
    const match = children.substring(startIndex, startIndex + query.length);
    return (
      <View
        as="span"
        className={classNames(className, ComponentClassNames.HighlightMatch)}
        testId={testId}
        ref={ref}
        {...rest}
      >
        {children.substring(0, startIndex)}
        <View
          as="strong"
          className={ComponentClassNames.HighlightMatchHighlighted}
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
export const HighlightMatch = React.forwardRef(HighlightMatchPrimitive);

HighlightMatch.displayName = 'HighlightMatch';
