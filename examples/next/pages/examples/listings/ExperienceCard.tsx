import { Card, Image, Text, defaultTheme } from '@aws-amplify/ui-react';

export const ExperienceCard = ({ img, title }) => (
  <Card
    width="20rem"
    padding="0"
    borderRadius={`${defaultTheme.tokens.radii.large}`}
    className="experience-card"
  >
    <Image
      src={img}
      alt={title}
      objectFit="cover"
      objectPosition="center"
      width="100%"
      height="20rem"
      borderRadius={`${defaultTheme.tokens.radii.large}`}
    />
    <Text className="experience-card-text">{title}</Text>
  </Card>
);
