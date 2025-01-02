import { Flex, HighlightMatchProps, TextField } from '@aws-amplify/ui-react';
import * as React from 'react';

export interface HighlightMatchPropControlsProps extends HighlightMatchProps {
  setChildren: (
    value: React.SetStateAction<HighlightMatchProps['children']>
  ) => void;
  setQuery: (value: React.SetStateAction<HighlightMatchProps['query']>) => void;
}

interface HighlightMatchPropControlsInterface {
  (props: HighlightMatchPropControlsProps): JSX.Element;
}

export const HighlightMatchPropControls: HighlightMatchPropControlsInterface =
  ({ children, setChildren, query, setQuery }) => {
    return (
      <Flex direction="column">
        <TextField
          label="Query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <TextField
          label="Main text"
          value={children}
          onChange={(event) => setChildren(event.target.value)}
        />
      </Flex>
    );
  };
