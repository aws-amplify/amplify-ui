import { getStyleCssVarsFromProps, getNonStyleProps } from "../utils";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { CustomPropertiesMap, StyleProps, ViewProps } from "../../types";

const props: ViewProps = {
  backgroundColor: "blue",
  border: "1px solid black",
  borderRadius: "6px",
  boxShadow: "3px 3px 5px 6px #ccc",
  color: "red",
  height: "100px",
  maxHeight: "200px",
  maxWidth: "200px",
  minHeight: "100px",
  minWidth: "100px",
  opacity: "80%",
  padding: "6px",
  width: "100px",
  as: "section",
  ariaLabel: "important section",
  className: "my-section",
};

describe("getStyleCssVarsFromProps: ", () => {
  it("should convert style props to CSS vars", () => {
    const style = getStyleCssVarsFromProps(props);
    Object.keys(CustomPropertiesMap).forEach(prop => {
      expect(style[CustomPropertiesMap[prop]]).toBe(props[prop]);
    });
    expect(style["--as"]).toBeUndefined();
  });

  it("should ignore undefined, null or empty string style prop values", () => {
    const props: ViewProps = {
      backgroundColor: undefined,
      color: null,
      border: "",
      borderRadius: "6px",
      ariaLabel: "important section",
      as: "section",
    };
    const style = getStyleCssVarsFromProps(props);

    expect(style[CustomPropertiesMap.backgroundColor]).toBeUndefined();
    expect(style[CustomPropertiesMap.color]).toBeUndefined();
    expect(style[CustomPropertiesMap.border]).toBeUndefined();
    expect(style[CustomPropertiesMap.borderRadius]).toBe(props.borderRadius);
    expect(style["--as"]).toBeUndefined();
  });
});

describe("getNonStyleProps: ", () => {
  it("should remove style props, leaving other props", () => {
    const nonStyleProps = getNonStyleProps(props);
    expect(nonStyleProps["border"]).toBeUndefined();
    expect(nonStyleProps["as"]).toBe(props.as);
    expect(nonStyleProps["ariaLabel"]).toBe(props.ariaLabel);
    expect(nonStyleProps["className"]).toBe(props.className);
  });
});
