import * as React from 'react';

import * as AUI from '@aws-amplify/ui-react';

export const AllIcons = () => {
  const iconKeys = Object.keys(AUI).filter(
    (key) => key.startsWith('Icon') && key.length > 4
  );
  return (
    <>
      {iconKeys.map((key) => {
        const Component = AUI[key];
        return (
          <AUI.Card fontSize="2rem">
            <Component />
          </AUI.Card>
        );
      })}
    </>
  );
};
