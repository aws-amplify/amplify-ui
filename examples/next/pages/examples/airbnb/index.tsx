import Amplify from 'aws-amplify';
import awsExports from 'react-primitives-example-environment/src/aws-exports';

import {
  Collection,
  Card,
  Heading,
  Text,
  View,
  Image,
  Flex,
  Badge,
  Divider,
  Button,
  IconStar,
} from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App() {
  return (
    <View padding="2rem 2rem">
      <Collection
        type="list"
        items={[
          {
            title: 'Fiordland National Park, New Zealand',
            description:
              'This national park includes the famous fjords of Milford, Dusky and Doubtful Sounds.',
          },
          {
            title: 'Bay of Islands',
            description:
              'Three hours north of Auckland, this area features over 144 islands to explore.',
          },
          {
            title: 'Queenstown, South Island',
            description:
              "This hopping town is New Zealand's adventure capital and is located right on Lake Wakatipu.",
          },
          {
            title: 'Christchurch, South Island',
            description:
              'Located on the east coast of the South Island, this city has been shaken .',
          },
        ]}
        alignItems="center"
      >
        {(item, index) => (
          <Card key={index} padding="1rem" maxWidth="40rem" width="100%">
            <View height="300px">
              <Image
                src="/road-to-milford-new-zealand-800w.jpg"
                alt="Glittering stream with old log, snowy mountain peaks
            tower over a green field."
                objectFit="cover"
                objectPosition="center"
                width="100%"
                height="100%"
              />
            </View>
            <View padding="1rem">
              <Flex>
                <Badge backgroundColor="lightgreen">Plus</Badge>
                <Badge backgroundColor="lightblue">Verified</Badge>
                <IconStar color="rebeccapurple"></IconStar>
                <IconStar color="rebeccapurple"></IconStar>
                <IconStar color="rebeccapurple"></IconStar>
                <IconStar color="rebeccapurple"></IconStar>
              </Flex>
              <Divider padding="1rem 0 0 0" />
              <Heading level={3}>
                <b>{item.title}</b>
              </Heading>
              <Text padding="0 0 1rem 0">{item.description}</Text>
              <Button isFullWidth={true}>Book it</Button>
            </View>
          </Card>
        )}
      </Collection>
    </View>
  );
}

export default App;
