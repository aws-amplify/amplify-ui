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
  Rating,
  IconAccountCircle,
} from '@aws-amplify/ui-react';

Amplify.configure(awsExports);

function App() {
  return (
    <>
      <header className="listing-app-header">
        <Button variation="link">
          <IconAccountCircle size="large" />
        </Button>
      </header>
      <Heading level={1}>Heading 1</Heading>
      <Heading level={2}>Heading 2</Heading>
      <Heading level={3}>Heading 3</Heading>
      <Heading level={4}>Heading 4</Heading>
      <Heading level={5}>Heading 5</Heading>
      <Heading level={6}>Heading 6</Heading>
      <View padding="2rem 2rem">
        <Collection
          type="list"
          direction="row"
          items={[
            {
              title: 'Fiordland National Park, New Zealand',
              rating: 3.75,
              ratingCount: 272,
              price: 187,
              description:
                'This national park includes the famous fjords of Milford, Dusky and Doubtful Sounds.',
            },
            {
              title: 'Bay of Islands',
              rating: 4,
              ratingCount: 111,
              price: 72,
              description:
                'Three hours north of Auckland, this area features over 144 islands to explore.',
            },
            {
              title: 'Queenstown, South Island',
              rating: 4.5,
              ratingCount: 65,
              price: 68,
              description:
                "This hopping town is New Zealand's adventure capital and is located right on Lake Wakatipu.",
            },
            {
              title: 'Christchurch, South Island',
              rating: 4.25,
              ratingCount: 145,
              price: 122,
              description:
                'Located on the east coast of the South Island, this city has been shaken .',
            },
          ]}
          alignItems="center"
        >
          {(item, index) => (
            <Card
              key={index}
              padding="var(--amplify-space-large)"
              width="30rem"
            >
              <View height="300px">
                <Image
                  src="https://images.unsplash.com/photo-1488441770602-aed21fc49bd5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                  alt="Glittering stream with old log, snowy mountain peaks
            tower over a green field."
                  objectFit="cover"
                  objectPosition="center"
                  width="100%"
                  height="100%"
                />
              </View>
              <Flex
                padding="1rem 0 0 0"
                direction="column"
                gap="var(--amplify-space-small)"
              >
                <Flex>
                  <Badge backgroundColor="lightgreen">Plus</Badge>
                  <Badge backgroundColor="lightblue">Verified</Badge>
                </Flex>

                <Flex gap="var(--amplify-space-small" direction="column">
                  <Heading level={3}>{item.title}</Heading>
                  <Flex alignItems="center">
                    <Rating value={item.rating} maxValue={5} />
                    <Text variation="tertiary" fontSize="0.75rem">
                      {item.ratingCount} reviews
                    </Text>
                  </Flex>
                  <Text variation="secondary">{item.description}</Text>
                </Flex>
                <Text>
                  <b>${item.price}/</b>night
                </Text>
                <Button isFullWidth={true} variation="primary">
                  Book it
                </Button>
              </Flex>
            </Card>
          )}
        </Collection>
      </View>
    </>
  );
}

export default App;
