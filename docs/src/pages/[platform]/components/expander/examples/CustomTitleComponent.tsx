import * as React from 'react';

import {
  Expander,
  ExpanderGroup,
  Flex,
  View,
  useTheme,
} from '@aws-amplify/ui-react';

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
    <ExpanderGroup type="single">
      <Expander
        title={
          <CustomTitle
            courseNumber="CS 103"
            courseName="Mathematical Foundations of Computing"
          />
        }
        value="item-1"
      >
        Example content for CS 103
      </Expander>
      <Expander
        title={
          <CustomTitle
            courseNumber="CS 106A"
            courseName="Programming Methodology"
          />
        }
        value="item-2"
      >
        Example content for CS 106A
      </Expander>
    </ExpanderGroup>
  );
};
