import * as React from 'react';
import { Alert, Heading, SelectField } from '@aws-amplify/ui-react';

interface ChallengeSelectionProps {
  selectedChallenge: string;
  onChange: (selection: string) => void;
  challengeList: string[];
}
export const ChallengeSelection = ({
  selectedChallenge,
  onChange,
  challengeList,
}: ChallengeSelectionProps) => {
  return (
    <Alert variation="info" hasIcon={false}>
      <Heading>Update Challenge Selection</Heading>
      <SelectField
        label=""
        value={selectedChallenge}
        onChange={(e) => onChange(e.target.value)}
      >
        {challengeList.map((challenge) => (
          <option key={challenge} value={challenge}>
            {challenge}
          </option>
        ))}
      </SelectField>
    </Alert>
  );
};
