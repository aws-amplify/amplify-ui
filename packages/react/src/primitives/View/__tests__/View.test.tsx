import { View } from "../View";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { ComponentClassNames } from "../../shared";

describe("View: ", () => {
  const viewText = "Hello from inside a view";

  it("renders correct defaults", async () => {
    render(<View>{viewText}</View>);

    const view = await screen.findByText(viewText);
    expect(view.innerHTML).toBe(viewText);
    expect(view.nodeName).toBe("DIV");
    expect(view.className).toBe(ComponentClassNames.View);
  });

  it("can render a <button> HTML element", async () => {
    render(<View as="button">{viewText}</View>);
    const viewButton = await screen.findByRole("button");
    expect(viewButton.nodeName).toBe("BUTTON");
  });

  it("can render a <p> HTML element", async () => {
    render(<View as="p">{viewText}</View>);
    const view = await screen.findByTestId(ComponentClassNames.View);
    expect(view.nodeName).toBe("P");
  });

  it("can render an aria-label for icon", async () => {
    render(
      <View as="i" ariaLabel="rocket">
        🚀
      </View>
    );
    const view = await screen.findByLabelText("rocket");
    expect(view.nodeName).toBe("I");
  });

  it("can be disabled", async () => {
    render(
      <View as="button" isDisabled={true}>
        Click me!
      </View>
    );
    const view = (await screen.findByRole("button")) as HTMLButtonElement;
    expect(view.disabled).toBe(true);
  });

  it("can set an 'alert' role", async () => {
    render(<View role="alert">Click me!</View>);
    const view = await screen.findByRole("alert");
    expect(view).toBeDefined();
  });
});
