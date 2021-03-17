# Authenticator
You can use `amplify-authenticator` component to add authenticator flows to your app.

## Basic Example
Here is our simplest authenticator example. We have a top-level `spark-context-provider` that provides the style information to the child components. Inside, we have `amplify-authenticator` ui component that takes care of the auth flow.

```html
<spark-context-provider>
  <amplify-authenticator></amplify-authenticator>
</spark-context-provider>
```
<br/>