# Authenticator

You can use `amplify-authenticator` component to add authenticator flows to your app.

## Authenticator with Default Theme

Amplify provides simple, clean styles to get started with a great experience in two steps:

1. Inside your `style.css`, import the shared css module:

```css
@import '~@aws-amplify/ui-angular/theme.css';
```

2. Wrap your app with `amplify-context-provider`:

```html
<amplify-context-provider>
  <amplify-authenticator></amplify-authenticator>
</amplify-context-provider>
```
