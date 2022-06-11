---
"@aws-amplify/ui-react": major
---

🚨BREAKING CHANGE🚨: Built-in icons removed

We're removed the majority of the built-in icons (Icon360, IconSave, etc) from the `@aws-amplify/ui-react` package for a few reasons:
* Including icons makes the package large. While in most cases the icons can be tree-shaken out of the final application, by removing them we can ensure they are are never included.
* There are plenty of other React icon libraries that are compatible with Amplify UI components

We've left the `<Icon>` component, which still allows customers to easily add SVG icons using the `pathData` prop. A limited set of of the icons have also been left for internal use inside of Amplify UI primitives.
