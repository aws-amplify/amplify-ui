import * as exported from "./";

describe("@aws-amplify/ui-react", () => {
  describe("import * keys", () => {
    it("should match snapshot", () => {
      expect(Object.keys(exported)).toEqual([
        "components",
        "primitives",
        "theme",
        "AmplifyProvider",
        "Authenticator",
        "useAmplify",
        "useAuth",
        "Box",
        "Button",
        "Fieldset",
        "Footer",
        "Main",
        "Form",
        "Header",
        "Heading",
        "Input",
        "Label",
        "Spacer",
        "Text",
        "Wrapper",
      ]);
    });
  });
});
