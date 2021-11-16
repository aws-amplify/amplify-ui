import * as React from 'react';

import * as AUI from '@aws-amplify/ui-react';

export const AllIcons = () => {
  const iconKeys = Object.keys(AUI).filter(
    (key) => key.match(/^Icon\w/)
  );
  return (
    <AUI.Expander type="single" isCollapsible={true}>
      <AUI.ExpanderItem value="icons" title="Show all icons">
        {iconKeys.map((key) => {
          const Component = AUI[key];
          return (
            <AUI.Card fontSize="2rem">
              <Component />
            </AUI.Card>
          );
        })}
      </AUI.ExpanderItem>
    </AUI.Expander>
  );
};
