import { Amplify } from 'aws-amplify';

import { FileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { useState } from 'react';
import { SwitchField, View } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  const [variation, setVariation] = useState(false);
  return (
    <>
      <View>
        <SwitchField
          isDisabled={false}
          label="drop?"
          labelPosition="start"
          isChecked={variation}
          onChange={(e) => setVariation(e.target.checked)}
        />
      </View>

      <FileUploader
        level="public"
        accept={['image/png']}
        multiple={true}
        variation={variation ? 'drop' : 'button'}
      />
    </>
  );
}
