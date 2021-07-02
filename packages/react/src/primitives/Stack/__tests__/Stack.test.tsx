import { Stack } from "../Stack";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { ComponentClassNames } from "../../shared";
import { CustomPropertiesMap } from "../../types";

describe("Stack: ", () => {
  const stackText = "Stack primitive";

  it("renders correct defaults", async () => {
    render(<Stack>{stackText}</Stack>);
    const stack = await screen.findByText(stackText);
		// this should only apply the Stack className, but this will do for now
		expect(stack.classList.contains(ComponentClassNames.Stack)).toBe(true);
		console.log(stack.style);
		expect(stack).toHaveStyle({
			[CustomPropertiesMap.direction]: "row"
		});
		// expect(window.getComputedStyle(stack).getPropertyValue(CustomPropertiesMap.direction)).toBe("row");
    // expect(stack.style.getPropertyValue(CustomPropertiesMap.direction)).toBe("row");
    expect(stack.style.getPropertyValue(CustomPropertiesMap.gap)).toBe("0.375rem");
    expect(stack.style.getPropertyValue(CustomPropertiesMap.justifyContent)).toBe("normal");
		expect(stack.style.getPropertyValue(CustomPropertiesMap.alignItems)).toBe("stretch");
		expect(stack.style.getPropertyValue(CustomPropertiesMap.alignContent)).toBe("nowrap");
		expect(stack.style.getPropertyValue(CustomPropertiesMap.wrap)).toBe("nowrap");
		expect(stack.style.getPropertyValue("display")).toBe("flex");
  });

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
    expect(stack.style.getPropertyValue(CustomPropertiesMap.direction)).toBe("column-reverse");
    expect(stack.style.getPropertyValue(CustomPropertiesMap.gap)).toBe("10%");
    expect(stack.style.getPropertyValue(CustomPropertiesMap.justifyContent)).toBe("flex-end");
		expect(stack.style.getPropertyValue(CustomPropertiesMap.alignItems)).toBe("center");
		expect(stack.style.getPropertyValue(CustomPropertiesMap.alignContent)).toBe("space-between");
		expect(stack.style.getPropertyValue(CustomPropertiesMap.wrap)).toBe("wrap");
  });

	it("can apply a custom className", async () => {
		render(
			<Stack className="custom-stack">
				{stackText}
			</Stack>
		);
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