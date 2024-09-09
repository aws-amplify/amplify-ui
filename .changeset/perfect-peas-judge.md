---
"@aws-amplify/ui-react": minor
---

feat(textarea): add autoresizing to textarea

```jsx
export const AutoresizeTextareaExample = () => {
  const [value, setValue] = React.useState('');

  return (
    <TextAreaField
      autoResize
      label="Comments"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};
```
