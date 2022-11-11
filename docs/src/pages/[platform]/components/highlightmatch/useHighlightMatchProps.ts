import { HighlightMatch, HighlightMatchProps } from '@aws-amplify/ui-react';
import * as React from 'react';

import { demoState } from '@/utils/demoState';
import { HighlightMatchPropControlsProps } from './HighlightMatchPropControls';

interface UseHighlightMatchProps {
  (initialValues: HighlightMatchProps): HighlightMatchPropControlsProps;
}

export const useHighlightMatchProps: UseHighlightMatchProps = (
  initialValues
) => {
  const [children, setChildren] = React.useState<
    HighlightMatchProps['children']
  >(initialValues.children);
  const [query, setQuery] = React.useState<HighlightMatchProps['query']>(
    initialValues.query
  );

  React.useEffect(() => {
    demoState.set(HighlightMatch.displayName, {
      children,
      query,
    });
  }, [children, query]);

  return React.useMemo(
    () => ({
      children,
      setChildren,
      query,
      setQuery,
    }),
    [children, query]
  );
};
