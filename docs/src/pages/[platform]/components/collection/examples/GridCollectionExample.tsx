import {
  Collection,
  Card,
  Heading,
  Text,
  useTheme,
} from '@aws-amplify/ui-react';

export const GridCollectionExample = () => {
  const { tokens } = useTheme();
  const items = [
    {
      title: 'Fiordland National Park',
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
  ];

  return (
    <Collection
      type="grid"
      items={items}
      templateColumns="1fr 1fr 1fr"
      templateRows="12rem 12rem 12rem"
    >
      {(item, index) => {
        return (
          <Card
            key={index}
            padding={tokens.space.medium}
            maxWidth="180px"
            fontSize={tokens.fontSizes.xs}
            backgroundColor={tokens.colors.background.secondary}
            row={index + 1}
            column={index + 1}
          >
            <Heading level={4}>{item.title}</Heading>
            <Text>{item.description}</Text>
          </Card>
        );
      }}
    </Collection>
  );
};
