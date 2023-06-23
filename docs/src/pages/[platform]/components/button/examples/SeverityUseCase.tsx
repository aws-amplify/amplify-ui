import {
  Button,
  Flex,
  Card,
  Heading,
  Text,
  Message,
  MessageTitle,
  MessageContent,
  View,
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Link,
} from '@aws-amplify/ui-react';

export const SeverityUseCase = () => {
  return (
    <Flex direction="column">
      <Message colorTheme="error" isDismissible variation="filled">
        <MessageContent direction="column">
          <MessageTitle>Systems are experiencing issues.</MessageTitle>
        </MessageContent>
        <Button variation="primary" colorTheme="error" size="small">
          View #145 details
        </Button>
      </Message>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell as="th">Issue</TableCell>
            <TableCell as="th">Author</TableCell>
            <TableCell as="th">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Link href="/">#145</Link>
            </TableCell>
            <TableCell>hbuchel</TableCell>
            <TableCell>
              <Flex>
                <Button colorTheme="error" size="small">
                  Deny
                </Button>
                <Button colorTheme="success" size="small" variation="primary">
                  Approve
                </Button>
              </Flex>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Link href="/">#145</Link>
            </TableCell>
            <TableCell>hbuchel</TableCell>
            <TableCell>
              <Flex>
                <Button colorTheme="error" size="small">
                  Deny
                </Button>
                <Button colorTheme="success" size="small" variation="primary">
                  Approve
                </Button>
              </Flex>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Message colorTheme="info" variation="filled" isDismissible>
        <MessageContent>
          <MessageTitle>Build #145 complete</MessageTitle>
          <Flex direction="column">
            <Text>Your new build is ready to be deployed.</Text>
            <Flex>
              <Button size="small" colorTheme="info" variation="primary">
                View details
              </Button>
              <Button size="small" colorTheme="overlay">
                Start another build
              </Button>
            </Flex>
          </Flex>
        </MessageContent>
      </Message>
    </Flex>
  );
};
