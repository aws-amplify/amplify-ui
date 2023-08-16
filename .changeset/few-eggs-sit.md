---
"@aws-amplify/ui-react-storage": minor
"@aws-amplify/ui-react": minor
---

feat(react): Add IconsProvider to customize icons globally for all Amplify UI components

Components that use icons:
* Alert
* Checkbox
* Expander
* Field
* Menu
* Pagination
* PasswordField
* Rating
* SearchField
* Select
* StepperField
* StorageManager

Wrap your application with the `<IconsProvider>` (or whatever part of your app you want to customize the icons). 

```jsx
<IconsProvider icons={{
  alert: {
    info: <MdInfo />
  }
}}>
  {/* ... */}
</IconProvider>
```

Works well with the react-icons package!
