import { Amplify } from 'aws-amplify';

import { Button, FileUploader, useFileUploader } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';
import { useState } from 'react';
import { SwitchField, View, Card } from '@aws-amplify/ui-react';
Amplify.configure(awsExports);

function CustomUploaderDrop({ getDropEvents, inDropZone }) {
  return (
    <Card
      style={inDropZone && { backgroundColor: 'purple' }}
      border={'solid rgb(8,112,152)'}
      {...getDropEvents}
    />
  );
}

export default function FileUploaderEmail() {
  const [variation, setVariation] = useState(false);
  const { showPreviewer, setShowPreviewer } = useFileUploader();

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
          FileUploaderDrop: CustomUploaderDrop,
        }}
        level="public"
        multiple={true}
        variation={variation ? 'drop' : 'button'}
      />
    </>
  );
}
