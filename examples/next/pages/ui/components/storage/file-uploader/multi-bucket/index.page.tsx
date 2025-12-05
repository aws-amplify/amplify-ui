import React from 'react';
import { Amplify } from 'aws-amplify';
import { FileUploader } from '@aws-amplify/ui-react-storage';
import amplifyOutputs from './amplify_outputs';
import { Radio, RadioGroupField } from '@aws-amplify/ui-react';

Amplify.configure(amplifyOutputs);

export function FileUploaderExample() {
  const [bucket, setBucket] = React.useState('Bucket 1');
  return (
    <div>
      <RadioGroupField
        defaultValue="Bucket 1"
        legend="Bucket"
        name="Bucket to upload to"
        onChange={(e) => setBucket(e.target.value)}
      >
        <Radio value="Bucket 1">Bucket 1</Radio>
        <Radio value="Bucket 2">Bucket 2</Radio>
      </RadioGroupField>
      {bucket === 'Bucket 1' ? (
        <div>
          <FileUploader
            acceptedFileTypes={['*']}
            bucket="StorageEndToEnd"
            displayText={{ dropFilesText: 'Drop files into Bucket 1' }}
            path="public/"
            maxFileCount={1}
            showThumbnails
          />
        </div>
      ) : (
        <div>
          <FileUploader
            acceptedFileTypes={['*']}
            bucket="StorageEndToEndSecondary"
            displayText={{ dropFilesText: 'Drop files into Bucket 2' }}
            path="public/"
            maxFileCount={1}
            showThumbnails
          />
        </div>
      )}
    </div>
  );
}
export default FileUploaderExample;
