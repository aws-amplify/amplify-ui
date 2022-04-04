import * as React from 'react';
import { ComponentClassTable } from '@/components/ComponentClassTable';
import { ComponentVariableTable } from '@/components/ComponentVariableTable';
import {
  Tabs,
  TabItem,
  Flex,
  View,
  ScrollView,
  Heading,
  useTheme,
} from '@aws-amplify/ui-react';

export const ComponentStyleDisplay = ({ componentName }) => {
  const { tokens } = useTheme();

  return (
    <ScrollView className="docs-component-styles" maxHeight="70vh">
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
                <Heading>Component Class Names</Heading>
                <ComponentClassTable componentName={componentName} />
              </View>
            </TabItem>
            <TabItem title="CSS Variables">
              <View padding={`${tokens.space.medium} 0`}>
                <Heading>Component CSS Variable Names</Heading>
                <ComponentVariableTable
                  componentName={componentName.toLowerCase()}
                />
              </View>
            </TabItem>
          </Tabs>
        </Flex>
      </Flex>
    </ScrollView>
  );
};
