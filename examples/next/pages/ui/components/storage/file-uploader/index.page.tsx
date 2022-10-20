import { Amplify } from 'aws-amplify';

import { Button, FileUploader } from '@aws-amplify/ui-react';
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
  const [showPreviewer, setShowPreviewer] = useState(false);

  return (
    <>
      <Button onClick={() => setShowPreviewer(!showPreviewer)}>Press me</Button>
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
        acceptedFileTypes={['.png']}
        isPreviewerVisible={showPreviewer}
        components={{
          UploaderDrop: CustomUploaderDrop,
        }}
        level="public"
        multiple={true}
        variation={variation ? 'drop' : 'button'}
      />
    </>
  );
}
