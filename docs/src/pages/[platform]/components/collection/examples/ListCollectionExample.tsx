import {
  Collection,
  Card,
  Heading,
  Text,
  useTheme,
} from '@aws-amplify/ui-react';

export const ListCollectionExample = () => {
  const { tokens } = useTheme();
  const items = [
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
  ];

  return (
    <Collection
      type="list"
      items={items}
      direction="row"
      justifyContent="space-between"
      wrap="wrap"
    >
      {(item, index) => (
        <Card
          key={index}
          padding={tokens.space.medium}
          maxWidth="180px"
          fontSize={tokens.fontSizes.xs}
        >
          <Heading level={4}>{item.title}</Heading>
          <Text>{item.description}</Text>
        </Card>
      )}
    </Collection>
  );
};
