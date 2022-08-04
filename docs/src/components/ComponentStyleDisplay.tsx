import * as React from 'react';
import { ComponentClassTable } from '@/components/ComponentClassTable';
import { ComponentVariableTable } from '@/components/ComponentVariableTable';
import { Tabs, TabItem, View } from '@aws-amplify/ui-react';

export const ComponentStyleDisplay = ({ componentName }) => {
  return (
    <Tabs>
      <TabItem title="Target Classes">
        <View padding="medium 0">
          <ComponentClassTable componentName={componentName} />
        </View>
      </TabItem>
      <TabItem title="CSS Variables">
        <View padding="medium 0">
          <ComponentVariableTable componentName={componentName.toLowerCase()} />
        </View>
      </TabItem>
    </Tabs>
  );
};
