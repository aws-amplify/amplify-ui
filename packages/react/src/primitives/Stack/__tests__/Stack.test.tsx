import { Stack } from "../Stack";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { CustomPropertiesMap } from "../../types";

describe("Stack: ", () => {
  const stackText = "Stack primitive";

  it("can apply styling via props", async () => {
    render(
      <Stack
        direction="column-reverse"
        gap="10%"
        justifyContent="flex-end"
        alignItems="center"
        alignContent="space-between"
        wrap="wrap"
      >
        {stackText}
      </Stack>
    );
    const stack = await screen.findByText(stackText);
    expect(stack.style.getPropertyValue(CustomPropertiesMap.direction)).toBe(
      "column-reverse"
    );
    expect(stack.style.getPropertyValue(CustomPropertiesMap.gap)).toBe("10%");
    expect(
      stack.style.getPropertyValue(CustomPropertiesMap.justifyContent)
    ).toBe("flex-end");
    expect(stack.style.getPropertyValue(CustomPropertiesMap.alignItems)).toBe(
      "center"
    );
    expect(stack.style.getPropertyValue(CustomPropertiesMap.alignContent)).toBe(
      "space-between"
    );
    expect(stack.style.getPropertyValue(CustomPropertiesMap.wrap)).toBe("wrap");
  });

  it("can apply a custom className", async () => {
    render(<Stack className="custom-stack">{stackText}</Stack>);
    const stack = await screen.findByText(stackText);
    expect(stack.classList.contains("custom-stack")).toBe(true);
  });

  it("can render any arbitrary data-* attribute", async () => {
    render(
      <Stack data-demo="true" id="dataTest">
        {stackText}
      </Stack>
    );
    const view = await screen.findByTestId("dataTest");
    expect(view.dataset["demo"]).toBe("true");
  });
});
