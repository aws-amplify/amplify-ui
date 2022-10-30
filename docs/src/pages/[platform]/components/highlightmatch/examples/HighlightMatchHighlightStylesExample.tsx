import { HighlightMatch } from '@aws-amplify/ui-react';

export const HighlightMatchHighlightStylesExample = () => {
  return (
    <HighlightMatch
      query="highlighted part"
      highlightStyles={{ backgroundColor: 'orange', borderRadius: '5px' }}
    >
      This is the highlighted part.
    </HighlightMatch>
  );
};
