import {
  View,
  Flex,
  Message,
  Text,
  Button,
  Link,
  Image,
  Icon,
} from '@aws-amplify/ui-react';
import {
  BiHeart,
  BiRepost,
  BiReply,
  BiDotsHorizontalRounded,
  BiWifiOff,
} from 'react-icons/bi';

export const Composable = () => {
  return (
    <View padding="medium" backgroundColor="white">
      <Flex direction="column" maxWidth="540px">
        <Message
          variation="filled"
          colorTheme="info"
          hasIcon={false}
          isDismissible={true}
          heading="Your build is ready."
        >
          <Flex direction="column" gap="xs">
            <Text>A new build is available for download.</Text>
            <Flex alignItems="center">
              <Button variation="primary" colorTheme="info" size="small">
                Download 3.45.67
              </Button>
              <Link href="/">View changelog</Link>
            </Flex>
          </Flex>
        </Message>
        <Message
          alignItems="flex-start"
          gap="xxxs"
          heading={
            <Flex paddingLeft="small" justifyContent="space-between">
              <View>
                <Text fontWeight="bold" as="span">
                  Amplify UI
                </Text>
                <Text variation="tertiary" fontWeight="400" as="span">
                  {' '}
                  - 13h
                </Text>
                <Text variation="tertiary" fontWeight="400" as="span">
                  <br />
                  @ui.docs.amplify.aws
                </Text>
              </View>
              <Button colorTheme="neutral" size="small">
                Follow
              </Button>
            </Flex>
          }
          icon={
            <View>
              <Image
                width="52px"
                height="52px"
                objectFit="cover"
                borderRadius="50%"
                alt="Some text describing this message"
                src="https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987"
              />
            </View>
          }
        >
          <Flex direction="column" gap="xs">
            <View paddingLeft="small">
              Visit our docs site to learn all about the new primitive changes
              in version 35!
            </View>
            <Flex>
              <Button size="small" fontSize="large" variation="link">
                <BiReply />
              </Button>
              <Button size="small" fontSize="large" variation="link">
                <BiRepost />
              </Button>
              <Button size="small" fontSize="large" variation="link">
                <BiHeart />
              </Button>
              <Button size="small" fontSize="large" variation="link">
                <BiDotsHorizontalRounded />
              </Button>
            </Flex>
          </Flex>
        </Message>
        <Message
          variation="outline"
          alignSelf="flex-start"
          colorTheme="success"
          hasIcon={true}
          isDismissible={true}
        >
          <Flex alignItems="center">
            Your settings were saved.{' '}
            <Button variation="link" colorTheme="success" size="small">
              Undo
            </Button>
          </Flex>
        </Message>
        <Message variation="filled" alignSelf="flex-start" icon={<BiWifiOff />}>
          No internet connection detected.
        </Message>
        <Message
          alignSelf="flex-start"
          alignItems="flex-start"
          colorTheme="error"
          padding="large"
          hasIcon={false}
          boxShadow="0 1px 8px rgba(0,0,0,.15)"
          borderRadius="medium"
          heading="Are you sure you want to delete this item?"
        >
          <Flex direction="column" gap="xl">
            <Text>Deleted items cannot be recovered.</Text>
            <Flex justifyContent="flex-end">
              <Button variation="link" colorTheme="neutral" size="small">
                Cancel
              </Button>
              <Button variation="primary" colorTheme="error" size="small">
                Yes, delete this item.
              </Button>
            </Flex>
          </Flex>
        </Message>
        <Message
          variation="filled"
          colorTheme="success"
          hasIcon={false}
          heading=" All systems are stable."
        ></Message>
        <Message variation="filled" colorTheme="warning">
          <Flex alignItems="center" justifyContent="space-between">
            You are almost out of storage.{' '}
            <Button variation="primary" colorTheme="warning" size="small">
              Manage app storage
            </Button>
          </Flex>
        </Message>
        <Message variation="outline" colorTheme="info" heading="Did you know?">
          <Text>
            You can use social providers like Google and Facebook with the
            Amplify UI Authenticator.{' '}
            <Link href="/">Learn about social providers.</Link>
          </Text>
        </Message>
        <Message variation="filled" colorTheme="error">
          <Flex alignItems="center" justifyContent="space-between">
            Workflows are limited during active LSE.{' '}
            <Button size="small" variation="primary" colorTheme="error">
              Follow for updates
            </Button>
          </Flex>
        </Message>
        <Message colorTheme="error" alignSelf="center">
          Too many attempts, please wait before trying again.
        </Message>
        <Message
          colorTheme="error"
          heading="Error"
          variation="outline"
          alignSelf="center"
          width="500px"
        >
          <Text variation="tertiary">
            /App.js: Adjacent JSX elements must be wrapped in an enclosing tag.
            Did you want a JSX fragment <>...</>? (5:4)
          </Text>
        </Message>
      </Flex>
    </View>
  );
};
