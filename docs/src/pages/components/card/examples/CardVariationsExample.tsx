import { Card } from '@aws-amplify/ui-react';

export const CardVariationsExample = () => {
  return (
    <>
      <Card>Default card</Card>
      <Card variation="outlined">Outlined card</Card>
      <Card variation="elevated">Elevated card</Card>
    </>
  );
};
