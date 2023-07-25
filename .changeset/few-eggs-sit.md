---
"@aws-amplify/ui-react-storage": minor
"@aws-amplify/ui-react": minor
---

feat(react): Add IconProvider to customize icons globally for all Amplify UI components

Components that use icons:
* Alert
* Checkbox
* Expander
* Menu
* Pagination
* Rating
* SearchField
* Select
* StepperField
* StorageManager

```jsx
<IconProvider icons={{
  alert: {
    info: <MdInfo />
  }
}}>
  {/* ... */}
</IconProvider>
```
