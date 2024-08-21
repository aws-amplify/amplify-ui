import * as React from 'react';
import { TextAreaField } from '@aws-amplify/ui-react';

export const AutoresizeTextareaExample = () => {
  const [value, setValue] = React.useState('');

  return (
    <TextAreaField
      autoResize
      label="Comments"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
