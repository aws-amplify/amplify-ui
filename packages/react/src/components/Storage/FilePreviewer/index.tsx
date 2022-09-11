/** File Previewer */

import React, { useState } from 'react';
import { Button, Flex } from 'src/primitives';
import { Card } from 'src/primitives/Card';
import { View } from 'src/primitives/View';
import { FileTracker } from '../FileTracker';
import { FilePreviewerProps } from '../FileUploader/types';
import { getFileName, uploadFile } from '../shared/utils';

export function FilePreviewer({
  files,
  setShowPreviewer,
  fileName,
  level,
}: FilePreviewerProps): JSX.Element {
  const [percentage, setPercentage] = useState(0);
  function upload() {
    (async () => {
      for (let i = 0; i < files.length; i++) {
        const uploadFileName = getFileName(files[i], fileName, i);
        await uploadFile({
          file: files[i],
          fileName: uploadFileName,
          level,
          setPercentage,
        });
      }
    })();
  }
  // eslint-disable-next-line no-console
  console.log(files);
  return (
    <Card data-amplify-file-previewer>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        color="#067398"
      >
        <View>Add more</View>
        <View>{files.length} selected</View>
        <View
          as={'button'}
          style={{
            border: 'none',
            background: 'none',
            color: '#067398',
            cursor: 'pointer',
          }}
          onClick={() => setShowPreviewer(false)}
        >
          Cancel
        </View>
      </Flex>
      <hr style={{ width: '100%' }} />
      <View
        height={'14rem'}
        style={{
          overflowY: 'scroll',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          padding: '0 0.8rem',
        }}
      >
        {files.map((file, index) => (
          <FileTracker
            percentage={percentage}
            key={index}
            name={file.name}
          ></FileTracker>
        ))}
      </View>
      <View
        style={{
          alignItems: 'center',
          marginTop: 'auto',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <hr style={{ width: '100%' }} />
        <Button
          color="white"
          style={{ backgroundColor: '#067398', width: '130px' }}
          onClick={upload}
        >
          Upload Files
        </Button>
      </View>
    </Card>
  );
}
