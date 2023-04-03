import * as React from 'react';
import {
  Card,
  View,
  VisuallyHidden,
  Button,
  Flex,
  Text,
  Divider,
  Image,
  Loader,
  Icon,
} from '@aws-amplify/ui-react';
import { StorageManager } from '@aws-amplify/ui-react-storage';

export const StorageManagerComponentOverridesExample = () => {
  return (
    <StorageManager
      acceptedFileTypes={['image/*']}
      accessLevel="public"
      maxFileCount={100}
      provider="fast" // IGNORE
      components={{
        Container({ children }) {
          return <Card variation="elevated">{children}</Card>;
        },
        DropZone({ children, displayText, inDropZone, ...rest }) {
          return (
            <Flex
              alignItems="center"
              direction="column"
              padding="medium"
              backgroundColor={inDropZone ? 'brand.primary.10' : ''}
              {...rest}
            >
              <Text>Drop files here</Text>
              <Divider size="small" label="or" maxWidth="10rem" />
              {children}
            </Flex>
          );
        },
        FilePicker({ onClick }) {
          return (
            <Button variation="primary" onClick={onClick}>
              Browse Files
            </Button>
          );
        },
        FileList({ files, onCancelUpload, onDeleteUpload }) {
          return (
            <Flex direction="row">
              {files.map(({ file, key, progress, id, status, uploadTask }) => (
                <Flex
                  key={key}
                  justifyContent="center"
                  alignItems="center"
                  width="5rem"
                  height="5rem"
                  position="relative"
                >
                  <Image
                    borderRadius="small"
                    height="100%"
                    objectFit="cover"
                    src={URL.createObjectURL(file)}
                    alt={key}
                  />
                  {progress < 100 ? (
                    <Loader
                      position="absolute"
                      size="large"
                      percentage={progress}
                      isDeterminate
                      isPercentageTextHidden
                    />
                  ) : null}

                  <Button
                    opacity="50"
                    borderRadius="xxl"
                    backgroundColor="background.primary"
                    position="absolute"
                    variation="link"
                    size="small"
                    onClick={() => {
                      if (status === 'uploading') {
                        onCancelUpload({ id, uploadTask });
                      } else {
                        onDeleteUpload({ id });
                      }
                    }}
                  >
                    <Icon
                      fontSize="large"
                      color="font.error"
                      viewBox={{ width: 512, height: 512 }}
                      paths={[
                        {
                          d: 'M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z',
                          strokeWidth: '32',
                          fill: 'none',
                          strokeMiterlimit: '10',
                          stroke: 'currentColor',
                        },
                        {
                          d: 'M320 320L192 192m0 128l128-128',
                          strokeWidth: '32',
                          fill: 'none',
                          strokeLinecap: 'round',
                          stroke: 'currentColor',
                        },
                      ]}
                    />
                  </Button>
                </Flex>
              ))}
            </Flex>
          );
        },
      }}
    />
  );
};
