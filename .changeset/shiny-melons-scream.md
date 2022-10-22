---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

Add error state for SwitchField. 

```jsx
<SwitchField
  label="I agree to the terms and conditions"
  labelPosition="end"
  isChecked={isChecked}
  hasError={hasError}
  errorMessage="Please agree to the terms and conditions"
  onChange={(e) => {
    setIsChecked(e.target.checked);
  }}
/>
```
