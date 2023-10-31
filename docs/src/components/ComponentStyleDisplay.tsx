import * as React from 'react';
import { ComponentClassTable } from '@/components/ComponentClassTable';
import { ComponentVariableTable } from '@/components/ComponentVariableTable';
import { Tabs, View } from '@aws-amplify/ui-react';

export const ComponentStyleDisplay = ({ componentName }) => {
  return (
    <Tabs.Container defaultValue="classes">
      <Tabs.List>
        <Tabs.Item value="classes">Target Classes</Tabs.Item>
        <Tabs.Item value="variables">CSS Variables</Tabs.Item>
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
    </Tabs.Container>
  );
};
