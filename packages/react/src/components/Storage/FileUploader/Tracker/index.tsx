import React from 'react';
import { Card, View } from '../../../../primitives';

export function Tracker({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <Card
      variation="outlined"
      padding="0"
      className="amplify-fileuploader-file"
    >
      <View>{children}</View>
    </Card>
  );
}
