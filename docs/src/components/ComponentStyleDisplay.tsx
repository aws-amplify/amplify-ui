import * as React from 'react';
import { ComponentClassTable } from '@/components/ComponentClassTable';
import { ComponentVariableTable } from '@/components/ComponentVariableTable';
import { Tabs, TabItem, View, useTheme } from '@aws-amplify/ui-react';

export const ComponentStyleDisplay = ({ componentName }) => {
  const { tokens } = useTheme();

  return (
    <Tabs>
      <TabItem title="Target Classes">
        <View padding={`${tokens.space.medium} 0`}>
          <ComponentClassTable componentName={componentName} />
        </View>
      </TabItem>
      <TabItem title="CSS Variables">
        <View padding={`${tokens.space.medium} 0`}>
          <ComponentVariableTable componentName={componentName.toLowerCase()} />
        </View>
      </TabItem>
    </Tabs>
  );
};
