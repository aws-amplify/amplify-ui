---
"@aws-amplify/ui-react": minor
"@aws-amplify/ui": patch
---

Adding `labelPosition` to Radio and RadioGroupField

```jsx
<RadioGroupField
  label="Language"
  name="language"
  labelPosition="start"
>
  <Radio value="html">html</Radio>
  <Radio value="css">css</Radio>
  <Radio value="javascript">javascript</Radio>
</RadioGroupField>
```
