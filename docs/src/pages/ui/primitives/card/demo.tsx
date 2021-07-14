import React from "react";
import { Card, Text, View, Image } from "@aws-amplify/ui-react";

export const CardSample = () => {
  return (
    <Card maxWidth="20rem">
      <Image
        src="/road-to-milford-new-zealand-800w.jpg"
        alt="Glittering stream with old log, snowy mountain peaks
    tower over a green field."
      />
      <View padding="1rem">
        <Text fontWeight="bold">New Zealand</Text>
        <View padding="1rem">
          <Text>
            <b>Population: </b>4.917 million
          </Text>
          <Text>
            <b>Capital: </b>Wellington
          </Text>
          <Text>
            <b>Size: </b>103,483 mi<sup>2</sup>
          </Text>
          <Text isTruncated={true}>
            Above are pictured the snowy peaks of southern New Zealand. This
            view was captured on the way to Milford.
          </Text>
        </View>
      </View>
    </Card>
  );
};
