import * as React from 'react';
import { ComponentClassTable } from '@/components/ComponentClassTable';
import { ComponentVariableTable } from '@/components/ComponentVariableTable';
import { Tabs, View } from '@aws-amplify/ui-react';

export const ComponentStyleDisplay = ({ componentName }) => {
  return (
    <Tabs defaultValue="classes">
      <Tabs.List>
        <Tabs.Tab value="classes">Target Classes</Tabs.Tab>
        <Tabs.Tab value="variables">CSS Variables</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="classes">
        <View padding="medium 0">
          <ComponentClassTable componentName={componentName} />
        </View>
      </Tabs.Panel>
      <Tabs.Panel value="variables">
        <View padding="medium 0">
          <ComponentVariableTable componentName={componentName} />
        </View>
      </Tabs.Panel>
    </Tabs>
  );
};
