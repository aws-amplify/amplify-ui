import * as React from 'react';
import {
  Box,
  Card,
  CardBody,
  Button,
  Stack,
  Progress,
  Text,
  Image,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { CloseIcon, DownloadIcon, CheckIcon } from '@chakra-ui/icons';
import { StorageManager } from '@aws-amplify/ui-react-storage';

export default function StorageManagerExample() {
  return (
    <StorageManager
      path="public/"
      maxFileCount={5}
      acceptedFileTypes={['image/*']}
      autoUpload
      components={{
        Container({ children }) {
          return (
            <Card>
              <CardBody>
                <Stack direction="column">{children}</Stack>
              </CardBody>
            </Card>
          );
        },
        FilePicker({ onClick }) {
          return (
            <Button variant="outline" onClick={onClick}>
              Browse Files
            </Button>
          );
        },
        DropZone({ children, displayText, inDropZone, ...rest }) {
          return (
            <Box
              p={4}
              borderWidth={2}
              borderStyle={'dashed'}
              borderRadius="md"
              borderColor={inDropZone ? 'brand.900' : ''}
              bg={inDropZone ? 'brand.700' : ''}
            >
              <Stack
                alignItems="center"
                direction="column"
                padding="medium"
                {...rest}
              >
                <DownloadIcon />
                <Text>Drop files here or</Text>
                {children}
              </Stack>
            </Box>
          );
        },
        FileList({ files, onCancelUpload, onDeleteUpload }) {
          return (
            <Stack direction="column">
              {files.map(({ file, key, progress, id, status, uploadTask }) => {
                const isComplete = progress === 100;
                return (
                  <Box
                    key={key}
                    justifyContent="center"
                    alignItems="center"
                    bg={isComplete ? 'green.50' : 'white'}
                    height="5rem"
                    position="relative"
                    borderWidth={1}
                    borderStyle="solid"
                    borderColor={isComplete ? 'green.200' : 'gray.100'}
                    boxSize="border-box"
                  >
                    <Flex direction="row" height="5rem" align="center" p={4}>
                      <Image
                        borderRadius="small"
                        height="100%"
                        width="5rem"
                        objectFit="cover"
                        src={URL.createObjectURL(file!)}
                        alt={key}
                      />
                      <Stack
                        direction="column"
                        flex={1}
                        p={4}
                        overflow="hidden"
                      >
                        <Text
                          whiteSpace="nowrap"
                          textOverflow="ellipsis"
                          fontSize="sm"
                        >
                          {file?.name}
                        </Text>
                        <Text fontSize="sm">
                          {file?.size ? (file.size / 1000000).toFixed(2) : '0'}
                          mb
                        </Text>
                      </Stack>
                      {isComplete ? (
                        <CheckIcon textColor="green.400" />
                      ) : (
                        <IconButton
                          variant="outline"
                          size="sm"
                          aria-label="remove"
                          onClick={() => {
                            if (status === 'uploading') {
                              onCancelUpload({ id, uploadTask: uploadTask! });
                            } else {
                              onDeleteUpload({ id });
                            }
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      )}
                    </Flex>
                    {!isComplete ? (
                      <Progress
                        colorScheme="green"
                        hasStripe
                        size="sm"
                        value={progress}
                      />
                    ) : null}
                  </Box>
                );
              })}
            </Stack>
          );
        },
      }}
    />
  );
}
