import * as React from 'react';
import {
  Button,
  Card,
  Flex,
  Image,
  ScrollView,
  Text,
} from '@aws-amplify/ui-react';

export const AutoScrollExample = () => {
  const [items, setItems] = React.useState([1, 2]);

  return (
    <Flex direction="column" alignItems="flex-start">
      <Flex direction="row">
        <Card variation="outlined">
          <ScrollView autoScroll="smooth" height="200px" width="200px">
            <Flex direction="column">
              {items.map((item, index) => (
                <Card key={index} variation="outlined">
                  <Text fontWeight="bold">{index}</Text>
                </Card>
              ))}
            </Flex>
          </ScrollView>
        </Card>
        <Card variation="outlined">
          <ScrollView autoScroll="smooth" height="200px" width="200px">
            <Flex direction="row" wrap="nowrap">
              {items.map((item, index) => (
                <Card key={index} variation="outlined">
                  <Text fontWeight="bold" width="100px">
                    {index}
                  </Text>
                </Card>
              ))}
            </Flex>
          </ScrollView>
        </Card>
      </Flex>
      <Button
        onClick={() => {
          setItems([...items, 1]);
        }}
      >
        Add item
      </Button>
    </Flex>
  );
};
