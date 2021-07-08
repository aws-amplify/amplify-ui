import { useState } from "react";

import { Property } from 'csstype';

import {
  Stack,
  HorizontalStack,
  VerticalStack,
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

const JustifyContent = () => {
  const [justifyContent, setJustifyContent] = useState<Property.JustifyContent>(
    "flex-start"
  );

  return (
    <View>
      <Stack justifyContent="space-between">
        {JustifyContentProps.map((prop, i) => (
          <Button
            className={"test"}
            onClick={() => setJustifyContent(prop)}
            variant={prop === justifyContent ? "primary" : "secondary"}
            size="small"
            key={i}
          >
            {prop}
          </Button>
        ))}
      </Stack>
      <br />
      <Stack justifyContent={justifyContent} gap="20px">
        {mockElements(7)}
      </Stack>
    </View>
  );
};

const AlignItems = () => {
  const [alignItems, setAlignItems] = useState<Property.AlignItems>("stretch");

  return (
    <View>
      <Stack>
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
      </Stack>
      <br />
      <Stack alignItems={alignItems}>
        <View
          style={{
            backgroundColor: "#b794f4",
            height: "100px",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Wow!
        </View>
        <View
          style={{
            backgroundColor: "#805AD5",
            paddingTop: "20px",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            color: "white",
            fontWeight: "bold",
          }}
        >
          I love to use
        </View>
        <View
          style={{
            backgroundColor: "#322659",
            height: "70px",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            color: "white",
            fontWeight: "bold",
          }}
        >{`<Stack>`}</View>
      </Stack>
    </View>
  );
};

const Wrap = () => {
  const [wrap, setWrap] = useState<Property.FlexWrap>("nowrap");

  return (
    <View>
      <Stack>
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
      </Stack>
      <br />
      <Stack wrap={wrap}>{mockElements(18)}</Stack>
    </View>
  );
};

const Gap = () => (
  <View>
    <Stack gap="8px">{mockElements(6)}</Stack>
    <br />
    <Stack gap="2rem">{mockElements(6)}</Stack>
    <br />
    <Stack gap="10%">{mockElements(6)}</Stack>
  </View>
);

const Direction = () => {
  const [direction, setDirection] = useState<Property.FlexDirection>("row");

  return (
    <View>
      <Stack>
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
      </Stack>
      <br />
      <Stack direction={direction}>{mockElements(7)}</Stack>
    </View>
  );
};

const Helpers = () => (
  <View>
    <HorizontalStack justifyContent="center">{mockElements("HStack")}</HorizontalStack>
    <VerticalStack>{mockElements("VStack")}</VerticalStack>
  </View>
);

const mockStyle = {
  width: "3rem",
  height: "3rem",
  border: "1px solid #805AD5",
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
    case "justifyContent":
      return <JustifyContent />;
    case "alignItems":
      return <AlignItems />;
    case "wrap":
      return <Wrap />;
    case "gap":
      return <Gap />;
    case "direction":
      return <Direction />;
    case "helpers":
      return <Helpers />;
  }
};

export const StackDemo = ({ demoType }) => <View>{selectDemo(demoType)}</View>;
