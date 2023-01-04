<img src="./docs/public/amplify-logo.svg" alt="AWS Amplify Logo" style="width:2vw"> AWS Amplify

---

<p align="center">
  <img src="docs/public/svg/favicon.svg" style="width:12vw" alt="Amplify UI logo" />
  <h1 align="center">Amplify UI</h1>
</p>

[![GitHub](https://img.shields.io/github/license/aws-amplify/amplify-ui)](LICENSE)
[![Discord](https://img.shields.io/discord/308323056592486420?logo=discord)](https://discord.gg/jWVbPfC)
[![Open Bugs](https://img.shields.io/github/issues/aws-amplify/amplify-ui/bug?color=d73a4a&label=bugs)](https://github.com/aws-amplify/amplify-ui/issues?q=is%3Aissue+is%3Aopen+label%3Abug)
[![Feature Requests](https://img.shields.io/github/issues/aws-amplify/amplify-ui/feature-request?color=ff9001&label=feature%20requests)](https://github.com/aws-amplify/amplify-ui/issues?q=is%3Aissue+label%3Afeature-request+is%3Aopen)
[![GA milestone](https://img.shields.io/github/milestones/progress-percent/aws-amplify/amplify-ui/1)](https://github.com/aws-amplify/amplify-ui/milestone/1)

Amplify UI is an open-source UI library with cloud-connected components that are endlessly customizable, accessible, and can integrate into _any_ application. Amplify UI consists of:

1. Connected components that simplify complex cloud-connected workflows, like Authenticator.
2. Primitive components that create consistency across Amplify UI and allow you to build complete applications that fit your brand, like Buttons and Badges.
3. Data-bound components that make it easy to display dynamic data, like DataStoreCollections.
4. Theming capabilities that allow you to customize the appearance of Amplify UI to match your brand.

| Package Name                                                                     | Downloads                                                                                       | Version                                                                 |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| [@aws-amplify/ui-react](https://www.npmjs.com/package/@aws-amplify/ui-react)     | ![](https://img.shields.io/npm/dw/@aws-amplify/ui-react?label=Download&logo=Amplify&style=flat) | ![](https://img.shields.io/npm/v/@aws-amplify/ui-react/latest)          |
| [@aws-amplify/ui-vue](https://www.npmjs.com/package/@aws-amplify/ui-vue)         | ![](https://img.shields.io/npm/dw/@aws-amplify/ui-vue?label=Download&logo=Amplify)              | ![](https://img.shields.io/npm/v/@aws-amplify/ui-vue/latest?style=flat) |
| [@aws-amplify/ui-angular](https://www.npmjs.com/package/@aws-amplify/ui-angular) | ![](https://img.shields.io/npm/dw/@aws-amplify/ui-angular?label=Download&logo=Amplify)          | ![](https://img.shields.io/npm/v/@aws-amplify/ui-angular/latest)        |

## Documentation

- https://ui.docs.amplify.aws/

## Getting started

- https://ui.docs.amplify.aws/getting-started/installation

## Component Matrix

| **Connected Components** | **React** | **Angular** | **Vue** |
| :----------------------- | :-------: | :---------: | :-----: |
| Authenticator            |    ✅     |     ✅      |   ✅    |
| Interactions             |           |             |
| Storage                  |           |             |

| **Primitives**   | **React** | **Angular** | **Vue** |
| :--------------- | :-------: | :---------: | :-----: |
| Alert            |    ✅     |             |
| Autocomplete     |    ✅     |             |
| Badge            |    ✅     |             |
| Button           |    ✅     |             |
| Card             |    ✅     |             |
| CheckboxField    |    ✅     |             |
| Collection       |    ✅     |             |
| Divider          |    ✅     |             |
| Expander         |    ✅     |             |
| Flex             |    ✅     |             |
| Grid             |    ✅     |             |
| Heading          |    ✅     |             |
| HighlightMatch   |    ✅     |             |
| Icon             |    ✅     |             |
| Image            |    ✅     |             |
| Link             |    ✅     |             |
| Loader           |    ✅     |             |
| Menu             |    ✅     |             |
| Pagination       |    ✅     |             |
| PasswordField    |    ✅     |             |
| PhoneNumberField |    ✅     |             |
| Placeholder      |    ✅     |             |
| RadioGroupField  |    ✅     |             |
| Rating           |    ✅     |             |
| ScrollView       |    ✅     |             |
| SearchField      |    ✅     |             |
| SelectField      |    ✅     |             |
| SliderField      |    ✅     |             |
| StepperField     |    ✅     |             |
| SwitchField      |    ✅     |             |
| Table            |    ✅     |             |
| Tabs             |    ✅     |             |
| Text             |    ✅     |             |
| TextAreaField    |    ✅     |             |
| TextField        |    ✅     |             |
| ToggleButton     |    ✅     |             |
| View             |    ✅     |             |
| VisuallyHidden   |    ✅     |             |

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

[Bugs and feature requests for Amplify UI](https://github.com/aws-amplify/amplify-ui/issues/new)

You can also use the above link to report a bug or a feature request for previous version of Amplify UI Components.

As we continue to work on the new Amplify UI we will move UI-related issues in the amplify-js repository over here to work on them. We will continue to maintain major bug and security fixes for all existing UI packages and versions. New development for UI components will happen in this repository and eventually be published under the `@react` npm tag.

## Contributing

- [CONTRIBUTING.md](/CONTRIBUTING.md)
