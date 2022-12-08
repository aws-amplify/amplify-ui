import { FileUploader, View, Button, Text } from '@aws-amplify/ui-react';

export const PreviewerComponentsExample = () => {
  return (
    <FileUploader
      variation="drop"
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      // components={{
      //   Previewer: ({ onFileClick, fileStatuses }) => {
      //     return (
      //       <View padding="xl">
      //         {fileStatuses.map((file, idx) => {
      //           return (
      //             <View key={idx}>
      //               <Text>{file.name}</Text>
      //               <Text>{file.percentage}</Text>
      //             </View>
      //           );
      //         })}
      //         <Button onClick={onFileClick}>Start Upload</Button>
      //       </View>
      //     );
      //   },
      // }}
      provider="fast" // IGNORE
    />
  );
};
