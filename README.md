## 🚧 The is a developer preview of upcoming Amplify UI and is still a work-in-progress. 🚧

<img src="https://s3.amazonaws.com/aws-mobile-hub-images/aws-amplify-logo.png" alt="AWS Amplify" width="550">

> **Amplify UI** – Cloud-connected UI components for Android, iOS, React Native & Web

[![Discord](https://img.shields.io/discord/308323056592486420?logo=discord)](https://discord.gg/jWVbPfC)
[![GitHub](https://img.shields.io/github/license/aws-amplify/amplify-ui)](LICENSE)

<!-- Enable this once we have issues opened up
[![Open Bugs](https://img.shields.io/github/issues/aws-amplify/amplify-ui/bug?color=d73a4a&label=bugs)](https://github.com/aws-amplify/amplify-cli/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
[![Feature Requests](https://img.shields.io/github/issues/aws-amplify/amplify-ui/feature-request?color=ff9001&label=feature%20requests)](https://github.com/aws-amplify/amplify-cli/issues?q=is%3Aissue+label%3Afeature-request+is%3Aopen)
[![Enhancements](https://img.shields.io/github/issues/aws-amplify/amplify-ui/enhancement?color=4287f5&label=enhancement)](https://github.com/aws-amplify/amplify-cli/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)
[![Closed Issues](https://img.shields.io/github/issues-closed/aws-amplify/amplify-ui?color=%2325CC00&label=issues%20closed)](https://github.com/aws-amplify/amplify-cli/issues?q=is%3Aissue+is%3Aclosed+)

-->

# Amplify UI

Amplify UI is an open-source design system with cloud-connected workflows and components that make it easy to build accessible, performant, and beautiful applications on multiple frameworks. Amplify UI consists of:

1. Connected components, like Authenticator, that encapsulate complex cloud-connected workflows.
2. Primitive components, like Buttons and Badges, that create consistency across Amplify UI and allow you to build complete applications that fit your brand.
3. Data bound components, like Collections, that make it easy to display sets of data by querying DataStore.
4. Theming capabilities to customize the appearance of Amplify UI.

This is a very early preview and a work-in-progress for the upcoming version of Amplify UI.

## Features

**Customizable and extensible**

Amplify UI offers many layers of customization, so that you never reach a point to have to eject completely. The default Amplify UI is accessible and looks great on any device - use it to get started and build an awesome interface. You can then tweak a few broad theming options to change the overall look-and-feel of your application. Customize every detail of each component, extend them to add functionality, and even replace some components with your own if you want to. We don’t want to get in your way, but instead empower you with a great foundation and default implementation that you can make your own. Amplify UI is built on the idea of loosely coupled parts that work great on their own, but work better together. You can use Amplify UI primitive components without using connected components or Amplify libraries, you can use connected components with your own set of primitives, and everything in-between.

**Accessible and usable by default**

Amplify UI components work on screen readers and follow industry standards and best practices. The default UI will be generic enough to fit into most applications, polished enough to not require immediate replacement. Many people did not like the look of the existing Amplify UI components and certain elements did not meet accessibility guidelines like color contrast. This next version fixes those issues.

**Respectful to the platform and framework**

We want to share as much as possible between platforms and frameworks, but we also want to respect their identities and rules when possible (e.g following name conventions and language patterns). We are spending a lot of time crafting the developer experience in each platform and framework so that Amplify UI is familiar and consistent with common, best-practices. This is why we are building the components in each framework — to give you the best experience building applications in the framework of your choice.

**Minimal footprint**

Good components are fast and use native styling systems when possible, adding less dependencies, smaller memory footprint, and minimizing side effects. On the web, Amplify UI uses CSS as the base styling implementation, but if you want to use a CSS-in-JS framework or some other means of styling like Tailwind, you can do that!

## Getting started

We will be publishing versions of these packages under the `@next` tag in npm when they are ready:

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

```js
<authenticator>
  <template v-slot="{ user }">
  <h1 class="text-6xl mb-10">Welcome {{ user.username }}!</h1>
  <button
    className="px-2 bg-white rounded shadow"
    @click="send('SIGN_OUT')"
  >
    Sign Out
  </button>
  </template>
</authenticator>
```

[Head over to the docs for more information on Angular usage](https://ui.docs.amplify.aws/ui/components/authenticator?platform=vue)

### Angular

```html
<amplify-authenticator>
  <ng-template let-user="user"> Welcome, {{ user.username }}! </ng-template>
</amplify-authenticator>
```

[Head over to the docs for more information on Angular usage](https://ui.docs.amplify.aws/ui/components/authenticator?platform=angular)

## Documentation

While this is still in a technical preview state, you can find the documentation for the new version of Amplify UI here: [ui.docs.amplify.aws](https://ui.docs.amplify.aws). Once this is ready for a GA release, the docs will live at the canonical documentation site: [docs.amplify.aws/ui/](https://docs.amplify.aws/ui)

Improving our documentation and providing better and more interactive sample code is one of the focuses of the new Amplify UI. We also wanted to make it easier to keep our docs in sync with the UI code so now this repository will contain all the documentation, UI code, and end-to-end tests to ensure the correctness of the documentation.

## Frequently asked questions

**Why are you doing this?**

Yes, we are doing another re-write of Amplify UI. We learned a lot from the current version of Amplify UI that there were a number of blockers especially related to theming and customization. We also wanted to improve the developer experience within each framework so working in React, Angular, or Vue feels comfortable. We are taking this opportunity to learn from the issues and discussions and provide a better and more flexible experience using Amplify UI.

**Aside from the Authenticator, what can I do with this?**

You can create entire front-end applications including UI! To provide a better default experience building UIs with Amplify UI and to make our connected components more integrated and customizable, we are building primitive components like Buttons, Badges, and Cards. These primitive components will be used in the connected components like Authenticator, plus you can theme them and use them to build your UI. _We are not publishing these packages yet, but will soon!_

**How does this compare to other UI libraries like Tailwind, Chakra, Supabase, or Material-UI?**

Amplify UI consists of both primitive components like Buttons, Badges, and Cards, as well as cloud-connected and data-bound components like the Authenticator. We are taking heavy inspiration from open source frameworks like [Tailwind](https://tailwindcss.com/), [Chakra](https://chakra-ui.com/), [Supabase](https://ui.supabase.io/), [Radix](https://www.radix-ui.com/), [Adobe Spectrum](https://react-spectrum.adobe.com/), [Material-UI](https://material-ui.com/), and others. In fact, one of the core ideas with the new Amplify UI is the ability to integrate seamlessly into _any_ application, including ones using those UI frameworks. For example, you can use Tailwind or Chakra with Amplify UI! We don't want to replace any of these great open source UI libraries, but rather provide a default set of components that work specifically for Amplify.

**What is the plan for the amplify-js repository?**

As we continue to work on the new Amplify UI we will move UI-related issues in the amplify-js repository over here to work on them. The eventual end-state would be to keep the platform-based library packages and repositories as-is ([amplify-js](https://github.com/aws-amplify/amplify-js), [amplify-ios](https://github.com/aws-amplify/amplify-ios), [amplify-android](https://github.com/aws-amplify/amplify-android), [amplify-flutter](https://github.com/aws-amplify/amplify-flutter)) and have amplify-ui be the home for Amplify UI components. We will continue to maintain major bug and security fixes for all existing UI packages and versions. New development for UI components will happen in this repository and eventually be published under the `@next` npm tag.

## Contributing

Right now the best way to contribute is to try out the new Amplify UI and give us feedback. We want to make sure we are building the right tools for you to build amazing applications easily.

## Status

This is a very early preview of the work we are doing. Currently, these packages are not being published to npm yet. We will let you know when they become available. TThis is currently what we are working on:

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
