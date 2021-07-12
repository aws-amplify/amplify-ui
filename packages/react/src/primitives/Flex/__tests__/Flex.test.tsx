import { Flex } from "../Flex";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { CustomPropertiesMap } from "../../types";

describe("Flex: ", () => {
  const flexText = "Flex primitive";

  it("can apply styling via props", async () => {
    render(
      <Flex
        direction="column-reverse"
        gap="10%"
        justifyContent="flex-end"
        alignItems="center"
        alignContent="space-between"
        wrap="wrap"
      >
        {flexText}
      </Flex>
    );
    const flex = await screen.findByText(flexText);
    expect(flex.style.getPropertyValue(CustomPropertiesMap.direction)).toBe(
      "column-reverse"
    );
    expect(flex.style.getPropertyValue(CustomPropertiesMap.gap)).toBe("10%");
    expect(
      flex.style.getPropertyValue(CustomPropertiesMap.justifyContent)
    ).toBe("flex-end");
    expect(flex.style.getPropertyValue(CustomPropertiesMap.alignItems)).toBe(
      "center"
    );
    expect(flex.style.getPropertyValue(CustomPropertiesMap.alignContent)).toBe(
      "space-between"
    );
    expect(flex.style.getPropertyValue(CustomPropertiesMap.wrap)).toBe("wrap");
  });

  it("can apply a custom className", async () => {
    render(<Flex className="custom-flex">{flexText}</Flex>);
    const flex = await screen.findByText(flexText);
    expect(flex.classList.contains("custom-flex")).toBe(true);
  });

  it("can render any arbitrary data-* attribute", async () => {
    render(
      <Flex data-demo="true" id="dataTest">
        {flexText}
      </Flex>
    );
    const view = await screen.findByTestId("dataTest");
    expect(view.dataset["demo"]).toBe("true");
  });
});
