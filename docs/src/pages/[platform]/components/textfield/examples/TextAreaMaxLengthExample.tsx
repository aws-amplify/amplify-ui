import { TextField } from '@aws-amplify/ui-react';

export const TextAreaMaxLengthExample = () => {
  return (
    <TextField
      label="Maximum length of 100 characters"
      isMultiline={true}
      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboree"
      maxLength={100}
    />
  );
};
