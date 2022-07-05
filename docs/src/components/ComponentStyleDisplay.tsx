import * as React from 'react';
import { ComponentClassTable } from '@/components/ComponentClassTable';
import { ComponentVariableTable } from '@/components/ComponentVariableTable';
import {
  Tabs,
  TabItem,
  Flex,
  View,
  Heading,
  useTheme,
} from '@aws-amplify/ui-react';

export const ComponentStyleDisplay = ({ componentName }) => {
  const { tokens } = useTheme();

  return (
    <Flex
      direction={{
        base: 'column',
        medium: 'row',
      }}
      alignItems="stretch"
    >
      <Flex direction="column" flex="1">
        <Tabs>
          <TabItem title="Target Classes">
            <View padding={`${tokens.space.medium} 0`}>
              <ComponentClassTable componentName={componentName} />
            </View>
          </TabItem>
          <TabItem title="CSS Variables">
            <View padding={`${tokens.space.medium} 0`}>
              <ComponentVariableTable
                componentName={componentName.toLowerCase()}
              />
            </View>
          </TabItem>
        </Tabs>
      </Flex>
    </Flex>
  );
};
