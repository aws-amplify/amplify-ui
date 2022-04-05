export interface MetaInfo {
  [pathname: string]: { title: string; description: string };
}

export const META_INFO: MetaInfo = {
  '/': {
    title: 'Home',
    description:
      'Amplify UI is an open-source design system with cloud-connected components and primitives that simplify building accessible, performant, and beautiful applications in React, Angular, Vue, and Flutter (more coming soon).',
  },
  '/getting-started/installation': {
    title: 'Installation',
    description:
      'Installation Guide - How to install Amplify UI Packages, Styles, Fonts and Troubleshooting.',
  },
  '/getting-started/migration': {
    title: 'Migration',
    description:
      'Migration Guide - How to migrate from an older version of Amplify UI to a newer version.',
  },
  '/components': {
    title: 'Components',
    description:
      'Amplify UI Components, including Connected components, Base components, Feedback components, Navigation components, Input components, Layout components, Utility components.',
  },
  '/components/authenticator': {
    title: 'Authenticator',
    description:
      'Authenticator component adds complete authentication flows to your application with minimal boilerplate - Amplify UI',
  },
  '/components/chatbot': {
    title: 'Chatbot',
    description:
      'Chatbot is a simple way to add a conversational UI into your app - Amplify UI',
  },
  '/components/storage': {
    title: 'Storage',
    description:
      'Storage is a simple way to interact with our storage solutions, such as S3 - Amplify UI',
  },
  '/components/divider': {
    title: 'Divider',
    description:
      'Divider creates separations in content, helping to organize content and establish visual rhythm - Amplify UI',
  },
  '/components/heading': {
    title: 'Heading',
    description:
      'Heading is a separate component from Text for semantic purposes. Heading maps to an <h*> tag, and Text maps to a <p> tag - Amplify UI',
  },
  '/components/icon': {
    title: 'Icon',
    description:
      'Icon displays simple vector graphics that can be used in other components - Amplify UI',
  },
  '/components/image': {
    title: 'Image',
    description: 'Image can be used to display responsive images - Amplify UI',
  },
  '/components/scrollview': {
    title: 'Scrollview',
    description:
      'ScrollView is a View component that allows scrolling of its inner contents - Amplify UI',
  },
  '/components/text': {
    title: 'Text',
    description: 'Text is used to display simple strings of text - Amplify UI',
  },
  '/components/view': {
    title: 'View',
    description:
      'View is the container component on top of which all other components live - Amplify UI',
  },
  '/components/alert': {
    title: 'Alert',
    description:
      "Alert displays a brief, important message in a way that attracts the user's attention without interrupting the user's task. Alerts are typically intended to be read out dynamically by a screen reader - Amplify UI",
  },
  '/components/geo': {
    title: 'Geo',
    description:
      'Amplify UI Geo provides UI components for maps and location search for popular front-end frameworks.',
  },
  '/components/loader': {
    title: 'Loader',
    description:
      'Loaders provide a visual cue that an action is either processing or awaiting a result. They are used to help the customer understand the system is working to fulfill a request - Amplify UI',
  },
  '/components/pagination': {
    title: 'Pagination',
    description:
      'Pagination allows customers to navigate between large sets of content that are distributed across multiple pages - Amplify UI',
  },
  '/components/placeholder': {
    title: 'Placeholder',
    description:
      'Placeholder is used to fill out the interface while content is loaded asynchronously - Amplify UI',
  },
  '/components/link': {
    title: 'Link',
    description:
      'Links are elements used for navigation. Links render an anchor tag by default, and can be configured for use with routing libraries - Amplify UI',
  },
  '/components/menu': {
    title: 'Menu',
    description:
      'Menu provides an accessible, interactive menu for selecting actions within an application. Dropdown menu is collision-aware and will automatically change location based on available space - Amplify UI',
  },
  '/components/tabs': {
    title: 'Tabs',
    description:
      'Tabs organize content into multiple sections and allow users to navigate between them. The content under the set of Tabs should be related and form a coherent unit - Amplify UI',
  },
  '/components/button': {
    title: 'Button',
    description:
      'Button is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation - Amplify UI',
  },
  '/components/checkboxfield': {
    title: 'Checkboxfield',
    description:
      'CheckboxField is used to mark an individual item as selected, or to select multiple items from a list of individual items - Amplify UI',
  },
  '/components/passwordfield': {
    title: 'Passwordfield',
    description:
      'PasswordField allows users to input passwords, featuring full password manager support and an optional show/hide password button for user convenience - Amplify UI',
  },
  '/components/phonenumberfield': {
    title: 'Phonenumberfield',
    description:
      'PhoneNumberField allow users to input a phone number - Amplify UI',
  },
  '/components/radiogroupfield': {
    title: 'Radiogroupfield',
    description:
      'RadioGroupField allows users to select a single option from a list of mutually exclusive options - Amplify UI',
  },
  '/components/searchfield': {
    title: 'Searchfield',
    description: 'SearchField accepts query text for search - Amplify UI',
  },
  '/components/selectfield': {
    title: 'selectfield',
    description:
      'SelectField allows users to create a drop-down list - Amplify UI',
  },
  '/components/sliderfield': {
    title: 'sliderfield',
    description:
      'Slider allows users to quickly select a value within a range. It should be used when the upper and lower bounds to the range are invariable - Amplify UI',
  },
  '/components/stepperfield': {
    title: 'stepperfield',
    description:
      'StepperField is a number input with buttons to increase or decrease the value - Amplify UI',
  },
  '/components/switchfield': {
    title: 'switchfield',
    description:
      'SwitchField is a toggleable input type with a checked (on) and unchecked (off) state - Amplify UI',
  },
  '/components/textfield': {
    title: 'textfield',
    description: 'TextField allows users to input text content - Amplify UI',
  },
  '/components/textareafield': {
    title: 'textareafield',
    description:
      'TextAreaField allows users to input multiline text content - Amplify UI',
  },
  '/components/togglebutton': {
    title: 'togglebutton',
    description:
      'ToggleButton represents an on/off state for some configuration, such switching on/off bold text in a text editor - Amplify UI',
  },
  '/components/card': {
    title: 'Card',
    description:
      'Card component can be used to group related pieces of content - Amplify UI',
  },
  '/components/collection': {
    title: 'Collection',
    description:
      'Collection wraps Flex and Grid components, and provides a way to display items in a collection from a data source - Amplify UI',
  },
  '/components/expander': {
    title: 'Expander',
    description:
      'Expander primitive enables users to expand or collapse a set of sections vertically - Amplify UI',
  },
  '/components/flex': {
    title: 'Flex',
    description: 'Flex is layout container using Flexbox - Amplify UI',
  },
  '/components/grid': {
    title: 'Grid',
    description:
      'Grid provides a grid container with style display: grid. Any of the other components can be used as grid item children. To learn how to use Grid CSS properties, see the following documentation - Amplify UI',
  },
  '/components/table': {
    title: 'Table',
    description:
      'Table provides users with a styled and customizable <table> element - Amplify UI',
  },
  '/components/badge': {
    title: 'Badge',
    description:
      'Badge is a small, color-coded element that can be used to denote a status or message about an item - Amplify UI',
  },
  '/components/rating': {
    title: 'Rating',
    description:
      'Rating displays a read-only star rating of a product or service - Amplify UI',
  },
  '/components/visuallyhidden': {
    title: 'VisuallyHidden',
    description:
      'VisuallyHidden can be used to visually hide content while leaving it available for screen readers - Amplify UI',
  },
  '/theming': {
    title: 'Theming',
    description:
      'A Theme is a structured collection of design decisions that change the appearance of a UI library. An Amplify UI theme is a structured object of design tokens, breakpoints, and overrides. - Amplify UI',
  },
  '/theming/default-theme': {
    title: 'Theming - Default Theme',
    description:
      'A Default Theme is a structured collection of the default design decisions that change the appearance of a UI library. An Amplify UI theme is a structured object of design tokens, breakpoints, and overrides. - Amplify UI',
  },
  '/theming/responsive': {
    title: 'Theming - Responsive',
    description:
      'Responsive styling is supported out of the box using our default breakpoints. Our responsive support uses a mobile first approach, so @media(min-width) rules are used for all breakpoints. - Amplify UI',
  },
  '/theming/dark-mode': {
    title: 'Theming - Dark Mode',
    description:
      'Dark Mode uses a darker color palette for all screens, making foreground content stand out against darker backgrounds. ',
  },
  '/theming/alternative-styling': {
    title: 'Theming - Alternative Styling',
    description:
      'One of the goals of Amplify is to be a good citizen of the environment it exists in. As such, Amplify works hard to not interfere with other tools that are being used. - Amplify UI',
  },
  '/404': {
    title: '404',
    description: 'Page Not Found',
  },
  '/_error': {
    title: 'Error',
    description: 'Error',
  },
  '/500': {
    title: 'Error',
    description: 'Error',
  },
};
