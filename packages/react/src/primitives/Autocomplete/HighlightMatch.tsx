import * as React from 'react';

import { View } from '../View';
import { strHasLength } from '../shared/utils';
import { getTestId } from '../utils/testUtils';
import type { HighlightMatchProps, Primitive } from '../types';

export const HighlightMatch: Primitive<HighlightMatchProps, 'span'> = ({
  children,
  query,
  testId,
}) => {
  const matchTestId = getTestId(testId, 'match');
  const startIndex = children?.indexOf(query) ?? -1;

  if (strHasLength(query) && startIndex !== -1) {
    const match = children.substring(startIndex, startIndex + query.length);
    return (
      <View as="span" testId={testId}>
        {children.substring(0, startIndex)}
        <View as="strong" testId={matchTestId}>
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

HighlightMatch.displayName = 'HighlightMatch';
