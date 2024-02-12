---
"@aws-amplify/ui-react": patch
"@aws-amplify/ui": patch
---

fix(ui/react): add missing color token for CheckboxField label

The CheckboxField label color (and disabled color) can now be themed correctly via:
```
label: {
  color: { value: '{colors.purple.80}' },
  _disabled: {
    color: { value: '{colors.purple.60}' },
  },
},
```
