import { Card, Text } from '@aws-amplify/ui-react';

const css = `.custom-card-class {
  border: 3px solid red;
}`;

export const CardClassNameExample = () => {
  return (
    <>
      <style>{css}</style>
      <Card className="custom-card-class">
        <Text>Custom card!</Text>
      </Card>
    </>
  );
};
