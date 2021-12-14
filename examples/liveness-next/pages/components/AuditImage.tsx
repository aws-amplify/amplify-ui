import * as React from 'react';
import { Image, View } from '@aws-amplify/ui-react';

export const AuditImage = ({ auditImageBytes }) => {
  return auditImageBytes ? (
    <View width="300px" height="300px" margin="1rem auto">
      <Image
        width="100%"
        height="100%"
        src={`data:image/png;base64,${auditImageBytes}`}
        alt="Audit image"
      />
    </View>
  ) : null;
};
