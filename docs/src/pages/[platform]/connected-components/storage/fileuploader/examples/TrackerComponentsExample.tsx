import { FileUploader, View, Text } from '@aws-amplify/ui-react';

export const TrackerComponentsExample = () => {
  return (
    <FileUploader
      variation="drop"
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      // components={{
      //   Tracker: ({ file, percentage }) => {
      //     return (
      //       <View padding="xl">
      //         <Text textAlign="center">{file.name}</Text>
      //         <Text textAlign="center">{percentage}</Text>
      //       </View>
      //     );
      //   },
      // }}
      // @ts-ignore // IGNORE
      provider="fast" // IGNORE
    />
  );
};
