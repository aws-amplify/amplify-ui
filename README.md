🚧 The next version of Amplify UI (2.0.0) is currently under development. Get started with the current version of Amplify UI [here](https://docs.amplify.aws/ui). 🚧

<img src="https://s3.amazonaws.com/aws-mobile-hub-images/aws-amplify-logo.png" alt="AWS Amplify" width="550">

[![Discord](https://img.shields.io/discord/308323056592486420?logo=discord)](https://discord.gg/jWVbPfC)
[![GitHub](https://img.shields.io/github/license/aws-amplify/amplify-ui)](LICENSE)

<!-- Enable this once we have issues opened up
[![Open Bugs](https://img.shields.io/github/issues/aws-amplify/amplify-ui/bug?color=d73a4a&label=bugs)](https://github.com/aws-amplify/amplify-cli/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
[![Feature Requests](https://img.shields.io/github/issues/aws-amplify/amplify-ui/feature-request?color=ff9001&label=feature%20requests)](https://github.com/aws-amplify/amplify-cli/issues?q=is%3Aissue+label%3Afeature-request+is%3Aopen)
[![Enhancements](https://img.shields.io/github/issues/aws-amplify/amplify-ui/enhancement?color=4287f5&label=enhancement)](https://github.com/aws-amplify/amplify-cli/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
[![Closed Issues](https://img.shields.io/github/issues-closed/aws-amplify/amplify-ui?color=%2325CC00&label=issues%20closed)](https://github.com/aws-amplify/amplify-cli/issues?q=is%3Aissue+is%3Aclosed+)

-->

# Amplify UI 2.0

Amplify UI 2.0 is an open-source UI library with cloud-connected components that are endlessly customizable, accessible, and can integrate into _any_ application. Amplify UI consists of:

1. Connected components that simplify complex cloud-connected workflows, like Authenticator.
2. Primitive components that create consistency across Amplify UI and allow you to build complete applications that fit your brand, like Buttons and Badges.
3. Data-bound components that make it easy to display dynamic data, like DataStoreCollections.
4. Theming capabilities that allow you to customize the appearance of Amplify UI to match your brand.

**This is an early preview of the upcoming Amplify UI 2.0 release.**

## Getting started

We will be publishing the next major version (2.0) of these packages under the `@next` tag in npm when they are ready:

- @aws-amplify/ui-react
- @aws-amplify/ui-angular
- @aws-amplify/ui-vue

Bug fixes to the existing stable release of the ui packages will happen on the [aws-amplify/amplify-js](https://github.com/aws-amplify/amplify-js) repository.

## Usage

### React

```js
import { Authenticator, useAuth, Button, Heading } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

export default function App() {
  const { state, user, signOut } = useAuth();

  if (state !== 'authenticated') {
    return <Authenticator />;
  }

  return (
    <>
      <Heading level={1}>Welcome {user.username}!</Heading>
      <Button variation="primary" onClick={signOut}>
        Sign Out
      </Button>
    </>
  );
}
```

[Head over to the docs for more information on React usage](https://ui.docs.amplify.aws/ui/components/authenticator?platform=react)

### Vue

```html
<authenticator>
  <template v-slot="{ user }">
    <h1>Welcome {{ user.username }}!</h1>
    <button @click="send('SIGN_OUT')">Sign Out</button>
  </template>
</authenticator>
```

[Head over to the docs for more information on Vue usage](https://ui.docs.amplify.aws/ui/components/authenticator?platform=vue)

> Note: primitives not available for Vue yet

### Angular

```html
<amplify-authenticator>
  <ng-template amplifyOverride="authenticated" let-username="username">
    <h1>Welcome, {{username}}!</h1>
    <amplify-sign-out></amplify-sign-out>
  </ng-template>
</amplify-authenticator>
```

[Head over to the docs for more information on Angular usage](https://ui.docs.amplify.aws/ui/components/authenticator?platform=angular)

> Note: primitives not available for Angular yet

## Documentation

- Docs for the latest stable version of Amplify UI can be found [here](https://docs.amplify.aws/ui).
- Docs for the next version of Amplify UI can be found [here](https://ui.docs.amplify.aws).

Improving our documentation and providing better and more interactive sample code is one of the focuses of the new Amplify UI. We also wanted to make it easier to keep our docs in sync with the UI code so now this repository will contain all the documentation, UI code, and end-to-end tests to ensure the correctness of the documentation.

## Frequently asked questions

**What are the major benefits of the new version of Amplify UI?**

- **Better developer experience** Connected-components like Authenticator are being written with framework-specific implementations so that they follow framework conventions and are easier to integrate into your application.
- **Endlessly customizable** Every detail of Amplify UI is customizable to match your brand. Style all of Amplify UI with themes, override components with your own, or build your own UI and use Amplify for complex state management.
- **Accessible** Amplify UI components follow [WCAG](https://www.w3.org/WAI/standards-guidelines/wcag/) and [WAI-ARIA](https://www.w3.org/TR/wai-aria-1.2/) best practices and guidelines such as color contrast, keyboard navigation, accessible labels, and focus management.
- **Primitive components (React only right now)** Primitive components are used in the connected components, like Authenticator, you can also customize them and use them to build the rest of your UI.

**Why are you building primitives?**

We are building more cloud-connected components and want to have consistency between them, while also allowing you to build your UI with the same primitives so you can have a consistent UI development experience.

**How does this compare to other UI libraries like Tailwind, Chakra, Supabase, or Material-UI?**

Amplify UI consists of both primitive components like Buttons, Badges, and Cards, as well as cloud-connected and data-bound components like the Authenticator. We are taking heavy inspiration from open-source frameworks like [Tailwind](https://tailwindcss.com/), [Chakra](https://chakra-ui.com/), [Supabase](https://ui.supabase.io/), [Radix](https://www.radix-ui.com/), [Adobe Spectrum](https://react-spectrum.adobe.com/), [Material-UI](https://material-ui.com/), and others. In fact, one of the core ideas with the new Amplify UI is the ability to integrate seamlessly into _any_ application, including ones using those UI frameworks. For example, you can use Tailwind classes to style Amplify UI components or Chakra components like buttons inside Amplify connected-components like the Authenticator.

**Where should I file bugs and requests?**

[Bugs and feature requests for Amplify UI 2.0](https://github.com/aws-amplify/amplify-ui/issues/new)

You can also use the above link to report a bug or a feature request for previous version of Amplify UI Components.

As we continue to work on the new Amplify UI we will move UI-related issues in the amplify-js repository over here to work on them. We will continue to maintain major bug and security fixes for all existing UI packages and versions. New development for UI components will happen in this repository and eventually be published under the `@next` npm tag.

**Why is this a new repository?**

We are planning to build more cloud-connected components across multiple frameworks and platforms and it makes more sense to have a unified UI repository with components for all frameworks and platforms.

## Contributing

Right now the best way to contribute is to try out the new Amplify UI and give us feedback. We want to make sure we are building the right tools for you to build amazing applications easily.

## Status

This is a very early preview of the work we are doing. Currently, these packages are not being published to npm yet. We will let you know when they become available. This is currently what we are working on:

| **Component**  | **React** | **Angular** | **Vue** |
| :------------- | :-------: | :---------: | :-----: |
| **components** |           |             |
| Authenticator  |    ✅     |     ✅      |   ✅    |
| Interactions   |           |             |
| Storage        |           |             |
| **primitives** |           |             |
| Alert          |           |             |
| Badge          |    ✅     |             |
| Button         |    ✅     |             |
| Card           |    ✅     |             |
| Checkbox       |           |             |
| Collection     |    ✅     |             |
| Divider        |    ✅     |             |
| Dropdown       |           |             |
| Flex           |    ✅     |             |
| Grid           |           |             |
| Icon           |    ✅     |             |
| Image          |    ✅     |             |
| Input          |    ✅     |             |
| Heading        |    ✅     |             |
| Pagination     |    ✅     |             |
| Placeholder    |    ✅     |             |
| RadioButton    |           |             |
| Slider         |           |             |
| Spinner        |           |             |
| Table          |           |             |
| Tabs           |           |             |
| Text           |    ✅     |             |
| TextField      |           |             |
| Toggle         |           |             |
| View           |    ✅     |             |

## Looking for other products?

- [Amplify Console](https://docs.amplify.aws/console)
- [Amplify JS](https://docs.amplify.aws/lib/q/platform/js)
- [Amplify iOS](https://docs.amplify.aws/lib/q/platform/ios)
- [Amplify Android](https://docs.amplify.aws/lib/q/platform/android)
- [Amplify Flutter](https://docs.amplify.aws/lib/q/platform/flutter)
- [Amplify CLI](https://docs.amplify.aws/cli)
- [Amplify Community](https://amplify.aws/community/)
