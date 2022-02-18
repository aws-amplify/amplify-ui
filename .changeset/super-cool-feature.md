---
"@aws-amplify/ui-react": patch
---

feat: add new TextAreaField primitive (replaces TextField `isMultiline` feature)

**Example**

```
<TextAreaField
  descriptiveText="Enter a valid last name"
  label="Last name"
  name="last_name"
  placeholder="Baggins"
  rows="3"
  onChange={(e) => console.info(e.currentTarget.value)}
/>
```

