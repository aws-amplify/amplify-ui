import { IconType } from 'react-icons/lib';
import {
  MdFormatSize,
  MdTextFormat,
  MdOutlineImage,
  MdInsertEmoticon,
  MdHorizontalRule,
  MdSwapVert,
  MdStarBorder,
  MdOutlineCheckBoxOutlineBlank,
  MdEditAttributes,
  MdWarning,
  MdNotes,
  MdInput,
  MdAddBox,
  MdSearch,
  MdPassword,
  MdSmartphone,
  MdToggleOff,
  MdCheckBox,
  MdRadioButtonChecked,
  MdGridView,
  MdTableRows,
  MdSplitscreen,
  MdWebAsset,
  MdExpand,
  MdTableChart,
  MdMoreHoriz,
  MdLink,
  MdMenu,
  MdTab,
  MdTouchApp,
  MdUnfoldMore,
  MdDisabledVisible,
  MdRefresh,
  MdTune,
  MdSystemUpdateAlt,
  MdCheckCircle,
  MdHighlight,
} from 'react-icons/md';

export interface ComponentNavItem {
  href: string;
  label: string;
  body?: string;
  platforms: string[];
  tertiary?: boolean;
  icon?: IconType;
}

const sortByLabel = (a: ComponentNavItem, b: ComponentNavItem) =>
  a.label < b.label ? -1 : a.label > b.label ? 1 : 0;

export const baseComponents: ComponentNavItem[] = [
  {
    href: '/components/view',
    label: 'View',
    body: `View is the foundational component for Amplify UI primitives. While View renders a <div> by default, it can render any HTML element and supports styling via props.`,
    platforms: ['react'],
    icon: MdOutlineCheckBoxOutlineBlank,
  },
  {
    href: '/components/text',
    label: 'Text',
    body: `The Text primitive is used to display simple strings of text in an interface.`,
    platforms: ['react'],
    icon: MdTextFormat,
  },
  {
    href: '/components/heading',
    label: 'Heading',
    body: `This is a separate primitive from Text for semantic purposes. The Heading primitive maps to an <h*> tag, and Text maps to a <p> tag.`,
    platforms: ['react'],
    icon: MdFormatSize,
  },
  {
    href: '/components/icon',
    label: 'Icon',
    body: `The icon component displays simple vector graphics for use in other components like Buttons.`,
    platforms: ['react'],
    icon: MdInsertEmoticon,
  },
  {
    href: '/components/image',
    label: 'Image',
    body: `The Image primitive can be used to display responsive images.`,
    platforms: ['react'],
    icon: MdOutlineImage,
  },
  {
    href: '/components/divider',
    label: 'Divider',
    body: `A Divider creates separations in content. Dividers can help organize content and establish visual rhythm.`,
    platforms: ['react'],
    icon: MdHorizontalRule,
  },
  {
    href: '/components/scrollview',
    label: 'ScrollView',
    body: `ScrollView is essentially a View that allows scrolling of its inner contents.`,
    platforms: ['react'],
    icon: MdSwapVert,
  },
].sort(sortByLabel);

export const connectedComponents: ComponentNavItem[] = [
  {
    href: '/connected-components/authenticator',
    label: 'Authenticator',
    body: 'The Authenticator component adds complete authentication flows to your application with minimal boilerplate.',
    platforms: ['react', 'vue', 'angular', 'flutter', 'react-native'],
  },
  {
    href: '/connected-components/authenticator/configuration',
    label: 'Configuration',
    platforms: ['react', 'vue', 'angular', 'flutter', 'react-native'],
    tertiary: true,
  },
  {
    href: '/connected-components/authenticator/customization',
    label: 'Customization',
    platforms: ['react', 'vue', 'angular', 'flutter', 'react-native'],
    tertiary: true,
  },
  {
    href: '/connected-components/authenticator/headless',
    label: 'Headless Usage',
    platforms: ['react', 'vue', 'angular', 'react-native'],
    tertiary: true,
  },
  {
    href: '/connected-components/account-settings',
    label: 'Account Settings',
    platforms: ['react'],
  },
  {
    href: '/connected-components/account-settings/change-password',
    label: 'Change Password',
    platforms: ['react'],
    tertiary: true,
  },
  {
    href: '/connected-components/account-settings/delete-user',
    label: 'Delete User',
    platforms: ['react'],
    tertiary: true,
  },
  {
    href: '/connected-components/geo',
    label: 'Geo',
    body: 'Amplify UI Geo provides UI components for maps and location search built on top of Amazon Location Service.',
    platforms: ['react'],
  },
  {
    href: '/connected-components/storage',
    label: 'Storage',
    body: "Amplify UI Storage components allow you to store files in the cloud using Amplify's Storage category",
    platforms: ['react'],
  },
  {
    href: '/connected-components/storage/fileuploader',
    label: 'File Uploader',
    body: 'FileUploader component allows users to upload files to your Amplify backend.',
    platforms: ['react'],
    tertiary: true,
  },
  {
    href: '/connected-components/in-app-messaging',
    label: 'In-App Messaging',
    body: 'Amplify UI In-App Messaging provides UI components for displaying In-App Messages.',
    platforms: ['react', 'react-native'],
  },
];

export const dataDisplayComponents: ComponentNavItem[] = [
  {
    href: '/components/badge',
    label: 'Badge',
    body: `A Badge is a small visual element to denote a status or message about an item. A small, color-coded visual element that contains letters or numbers, that you can use to label, categorize, or organize items.`,
    platforms: ['react'],
    icon: MdCheckCircle,
  },
  {
    href: '/components/rating',
    label: 'Rating',
    body: 'The Rating component displays a read-only star rating of a product or service.',
    platforms: ['react'],
    icon: MdStarBorder,
  },
].sort(sortByLabel);

export const feedbackComponents: ComponentNavItem[] = [
  {
    href: '/components/alert',
    label: 'Alert',
    body: `An Alert displays a brief, important message in a way that attracts the user's attention without interrupting the user's task. Alerts are typically intended to be read out dynamically by a screen reader.`,
    platforms: ['react'],
    icon: MdWarning,
  },
  {
    href: '/components/placeholder',
    label: 'Placeholder',
    body: `The Placeholder component is used to fill out the interface while content is loaded asynchronously.`,
    platforms: ['react'],
    icon: MdNotes,
  },
  {
    href: '/components/loader',
    label: 'Loader',
    body: `Loaders provide a visual cue that an action is either processing or awaiting a result. They are used to help the customer understand the system is working to fulfill a request.`,
    platforms: ['react'],
    icon: MdRefresh,
  },
].sort(sortByLabel);

export const inputComponents: ComponentNavItem[] = [
  {
    href: '/components/autocomplete',
    label: 'Autocomplete',
    body: `Autocomplete is a SearchField enhanced by a list of suggested options.`,
    platforms: ['react'],
    icon: MdSearch,
  },
  {
    href: '/components/textareafield',
    label: 'TextArea Field',
    body: `The TextAreaField form primitive can be used allow users to input multiline text content.`,
    platforms: ['react'],
    icon: MdSystemUpdateAlt,
  },
  {
    href: '/components/textfield',
    label: 'Text Field',
    body: `The TextField form primitive can be used allow users to input text content.`,
    platforms: ['react'],
    icon: MdInput,
  },
  {
    href: '/components/selectfield',
    label: 'Select Field',
    body: 'The SelectField primitive allows you to create a drop-down list.',
    platforms: ['react'],
    icon: MdUnfoldMore,
  },
  {
    href: '/components/sliderfield',
    label: 'Slider Field',
    body: `Sliders allow users to quickly select a value within a range. They should be used when the upper and lower bounds to the range are invariable.`,
    platforms: ['react'],
    icon: MdTune,
  },
  {
    href: '/components/stepperfield',
    label: 'Stepper Field',
    body: `A StepperField is a number input with buttons to increase or decrease the value.`,
    platforms: ['react'],
    icon: MdAddBox,
  },
  {
    href: '/components/searchfield',
    label: 'Search Field',
    body: `SearchField accepts query text for search.`,
    platforms: ['react'],
    icon: MdSearch,
  },
  {
    href: '/components/passwordfield',
    label: 'Password Field',
    body: `PasswordField allows users to input passwords, featuring full password manager support and an optional show/hide password button for user convenience - Amplify UI`,
    platforms: ['react'],
    icon: MdPassword,
  },
  {
    href: '/components/phonenumberfield',
    label: 'Phone Number Field',
    body: `The PhoneNumberField form primitive allows users to input a phone number`,
    platforms: ['react'],
    icon: MdSmartphone,
  },
  {
    href: '/components/switchfield',
    label: 'Switch Field',
    body: `The SwitchField form primitive is a toggleable input type with a checked (on) and unchecked (off) state.`,
    platforms: ['react'],
    icon: MdToggleOff,
  },
  {
    href: '/components/radiogroupfield',
    label: 'Radio Group Field',
    body: `A RadioGroupField allows users to select a single option from a list of mutually exclusive options.`,
    platforms: ['react'],
    icon: MdRadioButtonChecked,
  },
  {
    href: '/components/checkboxfield',
    label: 'Checkbox Field',
    body: `CheckboxField is used to mark an individual item as selected, or to select multiple items from a list of individual items.`,
    platforms: ['react'],
    icon: MdCheckBox,
  },
  {
    href: '/components/togglebutton',
    label: 'Toggle Button',
    body: 'A toggle button represents an on/off state for some configuration, for example switching on/off bold text in a text editor.',
    platforms: ['react'],
    icon: MdEditAttributes,
  },
  {
    href: '/components/button',
    label: 'Button',
    body: `The Button primitive is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.`,
    platforms: ['react'],
    icon: MdTouchApp,
  },
].sort(sortByLabel);

export const layoutComponents: ComponentNavItem[] = [
  {
    href: '/components/card',
    label: 'Card',
    body: `The Card component can be used to group related pieces of content.`,
    platforms: ['react'],
    icon: MdWebAsset,
  },
  {
    href: '/components/collection',
    label: 'Collection',
    body: `A Collection wraps Flex and Grid components, and provides a way to display items in a collection from a data source.`,
    platforms: ['react'],
    icon: MdSplitscreen,
  },
  {
    href: '/components/flex',
    label: 'Flex',
    body: `A layout container using Flexbox.`,
    platforms: ['react'],
    icon: MdTableRows,
  },
  {
    href: '/components/grid',
    label: 'Grid',
    body: 'A layout container using CSS Grid',
    platforms: ['react'],
    icon: MdGridView,
  },
  {
    href: '/components/table',
    label: 'Table',
    body: `The Table primitive provides users with a styled and customizable table element.`,
    platforms: ['react'],
    icon: MdTableChart,
  },
  {
    href: '/components/expander',
    label: 'Expander',
    body: `The Expander primitive enables users to expand or collapse a set of sections.`,
    platforms: ['react'],
    icon: MdExpand,
  },
  {
    href: '/components/pagination',
    label: 'Pagination',
    body: `Pagination provides navigation to allow customers to move between large sets of content that are distributed across multiple pages.`,
    platforms: ['react'],
    icon: MdMoreHoriz,
  },
].sort(sortByLabel);

export const utilityComponents: ComponentNavItem[] = [
  {
    href: '/components/visuallyhidden',
    label: 'Visually Hidden',
    body: `The Visually Hidden component is used to visually hide content while leaving it available to screen readers.`,
    platforms: ['react'],
    icon: MdDisabledVisible,
  },
  {
    href: '/components/highlightmatch',
    label: 'Highlight Match',
    body: `HighlightMatch is used to highlight a substring of a text.`,
    platforms: ['react'],
    icon: MdHighlight,
  },
].sort(sortByLabel);

export const navigationComponents: ComponentNavItem[] = [
  {
    href: '/components/link',
    label: 'Link',
    body: `Links are customizable and themeable elements used for Navigation. By default Links render an anchor tag but can be configured to be used with routing libraries.`,
    platforms: ['react'],
    icon: MdLink,
  },
  {
    href: '/components/menu',
    label: 'Menu',
    body: `Menu provides an accessible, interactive menu for selecting actions within an application. Dropdown menu is collision-aware and will automatically change location based on available space.`,
    platforms: ['react'],
    icon: MdMenu,
  },
  {
    href: '/components/tabs',
    label: 'Tabs',
    body: `Tabs organize content into multiple sections and allow users to navigate between them.`,
    platforms: ['react'],
    icon: MdTab,
  },
].sort(sortByLabel);

export const primitiveComponents: {
  heading?: string;
  components: ComponentNavItem[];
}[] = [
  {
    components: [
      {
        href: '/components',
        label: 'Overview',
        platforms: ['react'],
      },
    ],
  },
  {
    heading: 'Base',
    components: baseComponents,
  },
  {
    heading: 'Feedback',
    components: feedbackComponents,
  },
  {
    heading: 'Navigation',
    components: navigationComponents,
  },
  {
    heading: 'Inputs',
    components: inputComponents,
  },
  {
    heading: 'Layout',
    components: layoutComponents,
  },
  {
    heading: 'Data display',
    components: dataDisplayComponents,
  },
  {
    heading: 'Utilities',
    components: utilityComponents,
  },
];

export const guides: ComponentNavItem[] = [
  {
    href: '/guides',
    label: 'Overview',
    platforms: ['react'],
  },
  {
    href: '/guides/css-in-js',
    label: 'CSS in JS',
    platforms: ['react', 'vue', 'angular'],
  },
  {
    href: '/guides/auth-protected',
    label: 'Protected Routes',
    platforms: ['react'],
  },
];

export const gettingStarted: ComponentNavItem[] = [
  {
    href: '/getting-started/introduction',
    label: 'Introduction',
    platforms: ['react', 'vue', 'angular', 'flutter', 'react-native'],
  },
  {
    href: '/getting-started/installation',
    label: 'Installation',
    platforms: ['react', 'vue', 'angular', 'flutter', 'react-native'],
  },
  {
    href: '/getting-started/usage',
    label: 'Usage',
    platforms: ['react', 'vue', 'angular', 'react-native'],
  },
  {
    href: '/getting-started/usage/create-react-app',
    label: 'Create React App',
    platforms: ['react'],
    tertiary: true,
  },
  {
    href: '/getting-started/usage/nextjs',
    label: 'Next.js',
    platforms: ['react'],
    tertiary: true,
  },
  {
    href: '/getting-started/figma',
    platforms: ['react'],
    label: 'Figma',
  },
  {
    href: '/getting-started/accessibility',
    label: 'Accessibility',
    platforms: ['react', 'vue', 'angular'],
  },
  {
    href: '/getting-started/internationalization',
    label: 'Internationalization (i18n)',
    platforms: ['react'],
  },
  {
    href: '/getting-started/migration',
    label: 'Migration',
    platforms: ['react', 'vue', 'angular'],
  },
  {
    href: '/getting-started/troubleshooting',
    label: 'Troubleshooting',
    platforms: ['react', 'vue', 'angular'],
  },
];

export const theming: ComponentNavItem[] = [
  {
    href: '/theming',
    label: 'Overview',
    platforms: ['react', 'vue', 'angular', 'flutter', 'react-native'],
  },
  {
    href: '/theming/responsive',
    label: 'Responsive',
    platforms: ['react'],
  },
  {
    href: '/theming/default-theme',
    label: 'Default Theme',
    platforms: ['react', 'vue', 'angular'],
  },
  {
    href: '/theming/default-theme/colors',
    label: 'Colors',
    platforms: ['react', 'vue', 'angular'],
    tertiary: true,
  },
  {
    href: '/theming/default-theme/typography',
    label: 'Typography',
    platforms: ['react', 'vue', 'angular'],
    tertiary: true,
  },
  {
    href: '/theming/default-theme/sizes',
    label: 'Sizes',
    platforms: ['react', 'vue', 'angular'],
    tertiary: true,
  },
  {
    href: '/theming/theme-provider',
    label: 'ThemeProvider',
    platforms: ['react'],
  },
  {
    href: '/theming/dark-mode',
    label: 'Dark mode',
    platforms: ['react', 'vue', 'angular', 'flutter', 'react-native'],
  },
  {
    href: '/theming/css-variables',
    label: 'CSS variables',
    platforms: ['react', 'vue', 'angular'],
  },
  {
    href: '/theming/style-props',
    label: 'Style Props',
    platforms: ['react'],
  },
];

export const DISCORD = 'https://discord.gg/amplify';
export const COMMUNITY = 'https://amplify.aws/community';
export const COMMUNITY_EVENTS = 'https://amplify.aws/community/events';
export const COMMUNITY_POSTS = 'https://amplify.aws/community/posts';
export const COMMUNITY_CONTRIBUTORS =
  'https://amplify.aws/community/contributors';
export const COMMUNITY_NEWSLETTERS =
  'https://amplify.aws/community/newsletters';
export const TWITTER = 'https://twitter.com/AWSAmplify';
export const GITHUB = 'https://github.com/aws-amplify';
export const TERMS = 'https://aws.amazon.com/terms/';
export const PRIVACY = 'https://aws.amazon.com/privacy/';
export const MARKETING = 'https://aws.amazon.com/amplify/framework/';
export const AWS_USER_GUIDE =
  'https://docs.aws.amazon.com/amplify/latest/userguide/welcome.html';
export const IOS_REFERENCE = 'https://aws-amplify.github.io/amplify-ios/docs/';
export const ANDROID_REFERENCE =
  'https://aws-amplify.github.io/aws-sdk-android/docs/reference/';
export const JS_REFERENCE = 'https://aws-amplify.github.io/amplify-js/api/';

export const GITHUB_REPO = `${GITHUB}/amplify-ui/`;
export const GITHUB_REPO_FILE = `${GITHUB_REPO}/blob/main/`;
