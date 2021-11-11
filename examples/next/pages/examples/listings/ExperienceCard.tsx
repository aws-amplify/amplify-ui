import { Card, Image, Text, useTheme } from '@aws-amplify/ui-react';

export const ExperienceCard = ({ img, title }) => {
  const { tokens } = useTheme();
  return (
    <Card
      width="20rem"
      padding="0"
      borderRadius={tokens.radii.large}
      className="experience-card"
    >
      <Image
        src={img}
        alt={title}
        objectFit="cover"
        objectPosition="center"
        width="100%"
        height="20rem"
        borderRadius={tokens.radii.large}
      />
      <Text className="experience-card-text">{title}</Text>
    </Card>
  );
};
