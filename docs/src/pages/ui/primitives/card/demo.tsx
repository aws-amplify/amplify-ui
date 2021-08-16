import * as React from 'react';
import {
  Card,
  Text,
  View,
  Image,
  Badge,
  Button,
  Flex,
  Divider,
  Heading,
} from '@aws-amplify/ui-react';

export const CardSample = () => {
  return (
    <Card maxWidth="20rem">
      <Image
        src="/road-to-milford-new-zealand-800w.jpg"
        alt="Glittering stream with old log, snowy mountain peaks
    tower over a green field."
        objectFit="cover"
      />
      <View padding="1rem">
        <Flex>
          <Badge backgroundColor="lightgreen">Plus</Badge>
          <Badge backgroundColor="lightblue">Verified</Badge>
        </Flex>
        <Divider padding="1rem 0 0 0" />
        <Heading level={3}>
          <b>New Zealand White Water Outdoor Adventure</b>
        </Heading>
        <View padding="0 1rem">
          <Text padding="0 0 1rem 0" isTruncated={true}>
            Join us on this beautiful outdoor adventure through the glittering
            rivers through the snowy peaks on New Zealand.
          </Text>
          <Button isFullWidth={true}>Book it</Button>
        </View>
      </View>
    </Card>
  );
};
