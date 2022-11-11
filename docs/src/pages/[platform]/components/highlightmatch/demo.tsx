import * as React from 'react';
import { HighlightMatch, HighlightMatchProps } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { demoState } from '@/utils/demoState';
import { HighlightMatchPropControls } from './HighlightMatchPropControls';
import { useHighlightMatchProps } from './useHighlightMatchProps';

const propsToCode = (props: HighlightMatchProps) => {
  return `<HighlightMatch query=${JSON.stringify(props.query)}>
  ${props.children}
</HighlightMatch>`;
};

const defaultHighlightMatchProps = {
  children: 'This is a highlighted string.',
  query: 'highlighted string',
};

export const HighlightMatchDemo = () => {
  const highlightMatchProps = useHighlightMatchProps(
    (demoState.get(HighlightMatch.displayName) as HighlightMatchProps) ||
      defaultHighlightMatchProps
  );

  return (
    <Demo
      code={propsToCode(highlightMatchProps)}
      propControls={<HighlightMatchPropControls {...highlightMatchProps} />}
    >
      <HighlightMatch query={highlightMatchProps.query}>
        {highlightMatchProps.children}
      </HighlightMatch>
    </Demo>
  );
};
