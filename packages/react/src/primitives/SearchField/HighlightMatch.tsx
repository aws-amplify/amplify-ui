import * as React from 'react';

import { View } from '../View';
import { strHasLength } from '../shared/utils';
import { HighlightMatchProps, Primitive } from '../types';

export const HighlightMatch: Primitive<HighlightMatchProps, 'span'> = ({
  children,
  query,
}) => {
  const startIdx = children?.indexOf(query);
  if (strHasLength(query) && startIdx !== -1) {
    const match = children.substring(startIdx, startIdx + query.length);
    return (
      <View as="span">
        {children.substring(0, startIdx)}
        <View as="strong">{match}</View>
        {children.substring(startIdx + query.length)}
      </View>
    );
  }
  return <View as="span">{children}</View>;
};
