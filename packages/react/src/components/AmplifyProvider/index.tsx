import { AmplifyContext } from './AmplifyContext';

interface AmplifyProviderProps {
  children: any;
  components: any;
  theme: { themeObject: {}; CSSVariables?: {} };
}
export function AmplifyProvider({
  children,
  components,
  theme,
}: AmplifyProviderProps) {
  return (
    <AmplifyContext.Provider value={{ components, theme }}>
      <div data-amplify-theme="">{children}</div>
    </AmplifyContext.Provider>
  );
}
