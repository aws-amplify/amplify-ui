import { Card, Text, View, Image } from '@aws-amplify/ui-react';

import theme from '@aws-amplify/ui-theme-base';

export const ExperienceCard = ({ img, title }) => (
  <Card
    width="20rem"
    padding="0"
    borderRadius={theme.radii.large}
    className="experience-card"
  >
    <Image
      src={img}
      alt={title}
      objectFit="cover"
      objectPosition="center"
      width="100%"
      height="20rem"
      borderRadius={theme.radii.large}
    />
    <Text className="experience-card-text">{title}</Text>
  </Card>
);
