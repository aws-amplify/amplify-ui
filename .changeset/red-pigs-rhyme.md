---
"@aws-amplify/ui-react": minor
---

feat: adding `formatValue` prop on SliderField to allow formatting the value

***Example***

```jsx
export const SliderFieldFormatValueExample = () => {
  const formatValue = (value: number) => {
    return `${value}%`;
  };
  return (
    <SliderField
      label="SliderField with formatted value"
      defaultValue={50}
      formatValue={formatValue}
    />
  );
};

```
