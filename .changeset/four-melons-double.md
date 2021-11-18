---
'@aws-amplify/ui-react': major
'@aws-amplify/ui': major
---

New primitive components and theming API

Amplify UI is building primitive components like badges, cards, alerts, etc. These primitive components will first be available on React with the goal of adding support for more frameworks in the future. We hope these primitives will empower developers to build applications faster. We plan on building out more connected components like the Authenticator and we need primitive components like buttons and inputs to be shared across them. Exposing these primitive components allows developers to create and theme applications end-to-end using the same components everywhere.

_See: [RFC: Amplify UI Primitive Components](https://github.com/aws-amplify/amplify-ui/discussions/198)_

## Goals

**Flexible** – Primitives can be integrated into as many applications as possible.
**Customizable** – Primitives can be composed and styled using a theme, CSS, a CSS-in-JS framework, or un-styled.
**Accessible** – Primitives follow WCAG and WAI-ARIA guidelines to make building accessible applications easy.
Basic

## Implementation

- Added 37 new React primitive components such as Button, TextField, Alert that are the building blocks to create consistency across connected components.
- Added Theming API to allow global and component-override theming. Theme structure uses design tokens including borderWidth, colors, fonts, fontSizes, fontWeights, LineHeights, opacities and breakpoints. 
- Documentation: https://ui.docs.amplify.aws/components
