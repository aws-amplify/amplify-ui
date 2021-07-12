import { useState } from "react";

import { Property } from 'csstype';

import {
  Flex,
  Button,
  View,
} from "@aws-amplify/ui-react";

const JustifyContentProps: Property.JustifyContent[] = [
  "flex-start",
  "flex-end",
  "center",
  "space-between",
  "space-around",
  "space-evenly",
];

const AlignItemsProps: Property.AlignItems[] = [
  "stretch",
  "flex-start",
  "flex-end",
  "center",
  "baseline",
];

const WrapProps: Property.FlexWrap[] = ["nowrap", "wrap", "wrap-reverse"];

const DirectionProps: Property.FlexDirection[] = [
  "row",
  "column",
  "column-reverse",
  "row-reverse",
];

const Direction = () => {
  const [direction, setDirection] = useState<Property.FlexDirection>("row");

  return (
    <View>
      <Flex>
        {DirectionProps.map((prop, i) => (
          <Button
            onClick={() => setDirection(prop)}
            variant={prop === direction ? "primary" : "secondary"}
            size="small"
            key={i}
          >
            {prop}
          </Button>
        ))}
      </Flex>
      <br />
      <Flex direction={direction}>{mockElements(3)}</Flex>
    </View>
  );
};

const Gap = () => <Flex gap="3rem">{mockElements(3)}</Flex>;

const JustifyContent = () => {
  const [justifyContent, setJustifyContent] = useState<Property.JustifyContent>(
    "flex-start"
  );

  return (
    <View>
      <Flex>
        {JustifyContentProps.map((prop, i) => (
          <Button
            onClick={() => setJustifyContent(prop)}
            variant={prop === justifyContent ? "primary" : "secondary"}
            size="small"
            key={i}
          >
            {prop}
          </Button>
        ))}
      </Flex>
      <br />
      <Flex justifyContent={justifyContent} gap="20px">
        {mockElements(3)}
      </Flex>
    </View>
  );
};

const AlignItems = () => {
  const [alignItems, setAlignItems] = useState<Property.AlignItems>("stretch");

  return (
    <View>
      <Flex>
        {AlignItemsProps.map((prop, i) => (
          <Button
            onClick={() => setAlignItems(prop)}
            variant={prop === alignItems ? "primary" : "secondary"}
            size="small"
            key={i}
          >
            {prop}
          </Button>
        ))}
      </Flex>
      <br />
      <Flex alignItems={alignItems}>
        <View backgroundColor="#b794f4" height="100px" padding="2rem" color="white">Wow!</View>
        <View backgroundColor="#805AD5" padding="10px 2rem 0 2rem" color="white">I love to use</View>
        <View backgroundColor="#322659" height="70px" padding="2rem" color="white">Flex</View>
      </Flex>
    </View>
  );
};

const Wrap = () => {
  const [wrap, setWrap] = useState<Property.FlexWrap>("nowrap");

  return (
    <View>
      <Flex>
        {WrapProps.map((prop, i) => (
          <Button
            onClick={() => setWrap(prop)}
            variant={prop === wrap ? "primary" : "secondary"}
            size="small"
            key={i}
          >
            {prop}
          </Button>
        ))}
      </Flex>
      <br />
      <Flex wrap={wrap}>{mockElements(6)}</Flex>
    </View>
  );
};

const mockStyle = {
  width: "15rem",
  height: "3rem",
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  color: "white",
  backgroundColor: "#805AD5",
};

const mockElements = elements => {
  const arr =
    typeof elements === "number" ? [...Array(elements)] : [...elements];
  return arr.map((char, i) => (
    <View style={mockStyle} key={i}>
      {typeof elements === "number" ? i + 1 : char}
    </View>
  ));
};

const selectDemo = demoType => {
  switch (demoType) {
    case "direction":
      return <Direction />;
    case "gap":
      return <Gap />;
    case "justifyContent":
      return <JustifyContent />;
    case "alignItems":
      return <AlignItems />;
    case "wrap":
      return <Wrap />;
  }
};

export const FlexDemo = ({ demoType }) => <View>{selectDemo(demoType)}</View>;
