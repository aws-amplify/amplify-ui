---
"@aws-amplify/ui": minor
"@aws-amplify/ui-react": minor
---

feat(ui): experimental component theming

This feature lets you fully style and theme built-in components even if there is no design token available. For example, previously you could not add a box shadow or gradient background to the built-in Button component unless you wrote plain CSS. Now you can style every CSS property for all the built-in components with type-safety!

This also lets you define your own components and style them in the same type-safe way with zero runtime computation.

### defineComponentTheme()

```ts
import { defineComponentTheme } from '@aws-amplify/ui-react/server';

export const buttonTheme = defineComponentTheme({
  // because 'button' is a built-in component, we get type-safety and hints
  // based on the theme shape of our button
  name: 'button',
  theme: (tokens) => {
    return {
      textAlign: 'center',
      padding: tokens.space.xl,
      _modifiers: {
        primary: {
          backgroundColor: tokens.colors.primary[20],
        },
      },
    };
  },
});
```


### createTheme() 

The theme object passed to `createTheme` now has an optional `components` array which is an array of component themes. 

```ts
export const theme = createTheme({
  name: 'my-theme',
  components: [
    buttonTheme,
    customComponentTheme,
  ]
})
```

### React Server Component support for theming

You no longer need to use the `<ThemeProvider>` and rely on React context to theme Amplify UI (you still can though!). There is a new import path for RSC-compliant code: '@aws-amplify/ui-react/server' which you can use to import `createTheme` and `defineComponentTheme` as well as a new React Server Component: `<ThemeStyle />` which will inject the styles of your theme into the page. 


```tsx
import { ThemeStyle, createTheme } from '@aws-amplify/ui-react/server';

const theme = createTheme({
  //...
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div {...theme.containerProps({ colorMode: 'system' })}>
      {children}
      <ThemeStyle theme={theme} />
    </div>
  )
}
```
