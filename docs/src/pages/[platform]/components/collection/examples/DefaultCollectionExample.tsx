import { Collection, Card, Heading, Text } from '@aws-amplify/ui-react';

export const DefaultCollectionExample = () => {
  return (
    <Collection
      type="list"
      items={[
        {
          title: 'Fiordland National Park',
          description:
            'This national park includes the famous fjords of Milford, Dusky and Doubtful Sounds.',
        },
        {
          title: 'Bay of Islands, North Island',
          description:
            'Three hours north of Auckland, this area features over 144 islands to explore.',
        },
        {
          title: 'Queenstown, South Island',
          description:
            "This hopping town is New Zealand's adventure capital and is located right on Lake Wakatipu.",
        },
      ]}
      gap="1.5rem"
    >
      {(item, index) => (
        <Card key={index} padding="1rem">
          <Heading level={4}>{item.title}</Heading>
          <Text>{item.description}</Text>
        </Card>
      )}
    </Collection>
  );
};
