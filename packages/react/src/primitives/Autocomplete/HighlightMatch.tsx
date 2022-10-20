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
  const startIdx = children?.indexOf(query) ?? -1;

  if (strHasLength(query) && startIdx !== -1) {
    const match = children.substring(startIdx, startIdx + query.length);
    return (
      <View as="span" testId={testId}>
        {children.substring(0, startIdx)}
        <View as="strong" testId={matchTestId}>
          {match}
        </View>
        {children.substring(startIdx + query.length)}
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
