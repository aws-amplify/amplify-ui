import { Amplify } from 'aws-amplify';

import { Button, FileUploader, useFileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { useState } from 'react';
import { SwitchField, View } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

export default function FileUploaderEmail() {
  const [variation, setVariation] = useState(false);

  function FileUploaderExternal() {
    const { showPreviewer, setShowPreviewer } = useFileUploader();
    // console.log('setShowPreviewer', setShowPreviewer(true));
    return (
      <>
        <Button onClick={() => setShowPreviewer(true)}>Press me</Button>
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
          components={{
            FileUploaderDrop() {
              return <h1>hi</h1>;
            },
          }}
          level="public"
          multiple={true}
          variation={variation ? 'drop' : 'button'}
        />
      </>
    );
  }

  return (
    <FileUploader.Provider>
      <FileUploaderExternal />
    </FileUploader.Provider>
  );
}
