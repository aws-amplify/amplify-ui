import { Card, Image, Text, theme } from '@aws-amplify/ui-react';

export const ExperienceCard = ({ img, title }) => (
  <Card
    width="20rem"
    padding="0"
    borderRadius={`${theme.radii.large.value}`}
    className="experience-card"
  >
    <Image
      src={img}
      alt={title}
      objectFit="cover"
      objectPosition="center"
      width="100%"
      height="20rem"
      borderRadius={`${theme.radii.large.value}`}
    />
    <Text className="experience-card-text">{title}</Text>
  </Card>
);
