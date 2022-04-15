import * as React from 'react';

import {
  Flex,
  SelectField,
  SwitchField,
  TextProps,
  TextVariation,
} from '@aws-amplify/ui-react';

interface TextPropControlsProps extends TextProps {
  setAs: (value: React.SetStateAction<TextProps['as']>) => void;
  setVariation: (value: React.SetStateAction<TextProps['variation']>) => void;
  setIsTruncated: (
    value: React.SetStateAction<TextProps['isTruncated']>
  ) => void;
}

interface TextPropControlsInterface {
  (props: TextPropControlsProps): JSX.Element;
}

export const TextPropControls: TextPropControlsInterface = ({
  variation,
  setVariation,
  as,
  setAs,
  isTruncated,
  setIsTruncated,
}) => {
  const VARIATIONS_OPTIONS = [
    'primary',
    'secondary',
    'tertiary',
    'error',
    'warning',
    'info',
    'success',
  ];

  const AS_OPTIONS = ['p', 'span', 'strong', 'em'];

  return (
    <Flex direction="column">
      <SelectField
        name="variation"
        value={String(variation)}
        onChange={(event) => setVariation(event.target.value as TextVariation)}
        label="variation"
      >
        {VARIATIONS_OPTIONS.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </SelectField>
      <SelectField
        name="as"
        value={String(as)}
        onChange={(event) => setAs(event.target.value as TextProps['as'])}
        label="as"
      >
        {AS_OPTIONS.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </SelectField>
      <SwitchField
        label="isTruncated"
        defaultChecked={isTruncated}
        labelPosition="end"
        onChange={(event) => setIsTruncated(event.target.checked)}
      />
    </Flex>
  );
  return null;
};
