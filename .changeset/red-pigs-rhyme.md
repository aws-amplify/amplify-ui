---
"@aws-amplify/ui-react": minor
---

feat: adding formatValue to allow customizing the value format

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
