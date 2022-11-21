import {
  FileUploader,
  Button,
  Text,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

export const UploadButtonComponentsExample = () => {
  const acceptedFileTypes = ['image/*'];
  return (
    <FileUploader
      acceptedFileTypes={acceptedFileTypes}
      level="public"
      components={{
        UploadButton: ({ onFileChange, onClick, hiddenInput }) => {
          return (
            <>
              <Button backgroundColor={'brand.primary.20'} onClick={onClick}>
                <Text textAlign="center">Click Button Here</Text>
              </Button>
              <VisuallyHidden>
                <input
                  type="file"
                  tabIndex={-1}
                  ref={hiddenInput}
                  onChange={onFileChange}
                  multiple={true}
                  accept={acceptedFileTypes?.join()}
                />
              </VisuallyHidden>
            </>
          );
        },
      }}
      provider="fast" // IGNORE
    />
  );
};
