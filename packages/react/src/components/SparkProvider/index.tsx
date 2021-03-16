import { SparkContext } from "./SparkContext";
export function SparkProvider({ children, components, theme }) {
  return (
    <SparkContext.Provider value={{ components, theme }}>
      <div data-spark-theme="">{children}</div>
    </SparkContext.Provider>
  );
}
