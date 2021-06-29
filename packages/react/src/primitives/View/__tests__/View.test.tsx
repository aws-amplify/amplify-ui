/**
 * @jest-environment jsdom
 */
import React from "react";
import { View } from "../View";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

test("View", async () => {
  const viewText = "Hello from inside a view";
  render(<View>Hello from inside a view</View>);
  expect(screen.findByText(viewText)).toBeDefined();
});
