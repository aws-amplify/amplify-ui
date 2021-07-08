import { Divider } from "../Divider";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { ComponentClassNames } from "../../shared";

const dividerTestId = "dividerTest";

describe("Divider component", () => {
  it("renders <hr> with expected data attributes and classname", async () => {
    render(<Divider id={dividerTestId} />);

    const divider = (await screen.findByRole("separator")) as HTMLHRElement;
    expect(divider.nodeName).toBe("HR");
    expect(divider.dataset["size"]).toBe("small");
    expect(divider.getAttribute("aria-orientation")).toBe("horizontal");
    expect(divider.className).toContain(ComponentClassNames.Divider);
  });

  it("renders a vertical divider", async () => {
    render(<Divider id={dividerTestId} orientation="vertical" />);
    const divider = (await screen.findByRole("separator")) as HTMLHRElement;
    expect(divider.getAttribute("aria-orientation")).toBe("vertical");
  });

  it("can render a classname for Text", async () => {
    render(<Divider id={dividerTestId} className="my-divider" />);

    const divider = (await screen.findByRole("separator")) as HTMLHRElement;
    expect(divider.className).toContain("my-divider");
    expect(divider.className).toContain(ComponentClassNames.Divider);
  });

  it("can render any arbitrary data-* attribute", async () => {
    render(<Divider id={dividerTestId} data-demo="true" />);
    const divider = (await screen.findByRole("separator")) as HTMLHRElement;
    expect(divider.dataset["demo"]).toBe("true");
  });
});
