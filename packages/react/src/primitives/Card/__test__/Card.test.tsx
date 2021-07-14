import { Card } from "../Card";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { ComponentClassNames } from "../../shared";

describe("Card component", () => {
  it("can render custom classnames", async () => {
    render(<Card className="custom-classname" id="cardId"></Card>);

    const card = (await screen.findByTestId("cardId")) as HTMLHRElement;
    expect(card.className).toContain("custom-classname");
    expect(card.className).toContain(ComponentClassNames.Card);
  });

  it("can render any arbitrary data-* attribute", async () => {
    render(<Card data-demo="true" id="cardId"></Card>);
    const card = (await screen.findByTestId("cardId")) as HTMLHRElement;
    expect(card.dataset["demo"]).toBe("true");
  });

  it("can render <section> tag", async () => {
    render(<Card as="section" id="cardId"></Card>);
    const card = (await screen.findByTestId("cardId")) as HTMLHRElement;
    expect(card.nodeName).toBe("SECTION");
  });
});
