import * as React from 'react';

import { Accordion, Flex, View, useTheme } from '@aws-amplify/ui-react';

export const CustomTitle = ({ courseNumber, courseName }) => {
  const { tokens } = useTheme();
  return (
    <Flex gap={tokens.space.small}>
      <View width={tokens.space.xxxl} color={tokens.colors.teal[80]}>
        {courseNumber}
      </View>
      <View>{courseName}</View>
    </Flex>
  );
};

export const CustomTitleComponent = () => {
  return (
    <Accordion isExclusive>
      <Accordion.Item
        title={
          <CustomTitle
            courseNumber="CS 103"
            courseName="Mathematical Foundations of Computing"
          />
        }
        value="item-1"
      >
        Example content for CS 103
      </Accordion.Item>
      <Accordion.Item
        title={
          <CustomTitle
            courseNumber="CS 106A"
            courseName="Programming Methodology"
          />
        }
        value="item-2"
      >
        Example content for CS 106A
      </Accordion.Item>
    </Accordion>
  );
};
