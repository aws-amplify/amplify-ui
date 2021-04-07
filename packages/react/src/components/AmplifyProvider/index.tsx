import { AmplifyContext } from "./AmplifyContext";

export function AmplifyProvider({ children, components, theme }) {
  return (
    <AmplifyContext.Provider value={{ components, theme }}>
      <div data-amplify-theme="">{children}</div>
    </AmplifyContext.Provider>
  );
}
