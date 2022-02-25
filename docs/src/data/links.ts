export interface ComponentNavItem {
  href: string;
  label: string;
  body: string;
}

const sortByLabel = (a: ComponentNavItem, b: ComponentNavItem) =>
  a.label < b.label ? -1 : a.label > b.label ? 1 : 0;

export const baseComponents: ComponentNavItem[] = [
  {
    href: '/components/view',
    label: 'View',
    body: `View is a container that contains stuff. View is the most abstract component on top of which all other components live.`,
  },
  {
    href: '/components/text',
    label: 'Text',
    body: `The Text primitive is used to display simple strings of text in an interface.`,
  },
  {
    href: '/components/heading',
    label: 'Heading',
    body: `This is a separate primitive from Text for semantic purposes. The Heading primitive maps to an <h*> tag, and Text maps to a <p> tag.`,
  },
  {
    href: '/components/icon',
    label: 'Icon',
    body: `The icon component displays simple vector graphics for use in other components like Buttons.`,
  },
  {
    href: '/components/image',
    label: 'Image',
    body: `The Image primitive can be used to display responsive images.`,
  },
  {
    href: '/components/divider',
    label: 'Divider',
    body: ``,
  },
  {
    href: '/components/scrollview',
    label: 'ScrollView',
    body: `ScrollView is essentially a View that allows scrolling of its inner contents.`,
  },
].sort(sortByLabel);

export const connectedComponents = [
  {
    href: '/components/authenticator',
    label: 'Authenticator',
    body: 'The Authenticator component adds complete authentication flows to your application with minimal boilerplate.',
  },
  {
    href: '/components/chatbot',
    label: 'Chatbot',
    body: 'Chatbot automatically renders a complete chat messaging interface that can be used out-of-the-box, or it can be customized using theming support.',
  },
  {
    href: '/components/geo',
    label: 'Geo Map',
    body: 'The AmplifyMap component comes with various controls that give your application an interactive map built on top of Amazon Location Service.',
  },
  {
    href: '/components/storage',
    label: 'Storage',
    body: 'A set of components to help interact with S3 storage.',
  },
].sort(sortByLabel);

export const dataDisplayComponents = [
  { href: '/components/badge', label: 'Badge', body: `` },
  {
    href: '/components/rating',
    label: 'Rating',
    body: 'The Rating component displays a read-only star rating of a product or service.',
  },
].sort(sortByLabel);

export const feedbackComponents: ComponentNavItem[] = [
  {
    href: '/components/alert',
    label: 'Alert',
    body: `An Alert displays a brief, important message in a way that attracts the user's attention without interrupting the user's task. Alerts are typically intended to be read out dynamically by a screen reader.`,
  },
  {
    href: '/components/pagination',
    label: 'Pagination',
    body: `Pagination provides navigation to allow customers to move between large sets of content that are distributed across multiple pages.`,
  },
  {
    href: '/components/placeholder',
    label: 'Placeholder',
    body: `The Placeholder component is used to fill out the interface while content is loaded asynchronously.`,
  },
  {
    href: '/components/loader',
    label: 'Loader',
    body: ``,
  },
].sort(sortByLabel);

export const inputComponents = [
  {
    href: '/components/textareafield',
    label: 'TextArea Field',
    body: `The TextAreaField form primitive can be used allow users to input multiline text content.`,
  },
  {
    href: '/components/textfield',
    label: 'Text Field',
    body: `The TextField form primitive can be used allow users to input text content.`,
  },
  {
    href: '/components/selectfield',
    label: 'Select Field',
    body: `The SelectField primitive allows you to create a drop-down list.`,
  },
  { href: '/components/sliderfield', label: 'Slider Field', body: `` },
  {
    href: '/components/stepperfield',
    label: 'Stepper Field',
    body: `A StepperField is a number input with buttons to increase or decrease the value.`,
  },
  {
    href: '/components/searchfield',
    label: 'Search Field',
    body: `SearchField accepts query text for search.`,
  },
  { href: '/components/passwordfield', label: 'Password Field', body: `` },
  {
    href: '/components/phonenumberfield',
    label: 'Phone Number Field',
    body: ``,
  },
  {
    href: '/components/switchfield',
    label: 'Switch Field',
    body: `The SwitchField form primitive is a toggleable input type with a checked (on) and unchecked (off) state.`,
  },
  { href: '/components/radiogroupfield', label: 'Radio Group Field', body: `` },
  { href: '/components/checkboxfield', label: 'Checkbox Field', body: `` },
  {
    href: '/components/togglebutton',
    label: 'Toggle Button',
    body: `A toggle button represents an on/off state for some configuration, for example switching on/off bold text in a text editor.`,
  },
  { href: '/components/button', label: 'Button', body: `` },
].sort(sortByLabel);

export const layoutComponents = [
  { href: '/components/card', label: 'Card', body: `` },
  { href: '/components/collection', label: 'Collection', body: `` },
  {
    href: '/components/flex',
    label: 'Flex',
    body: `A layout container using Flexbox.`,
  },
  { href: '/components/grid', label: 'Grid', body: `` },
  {
    href: '/components/table',
    label: 'Table',
    body: `The Table primitive provides users with a styled and customizable table element.`,
  },
  {
    href: '/components/expander',
    label: 'Expander',
    body: `The Expander primitive enables users to expand or collapse a set of sections.`,
  },
].sort(sortByLabel);

export const navigationComponents: ComponentNavItem[] = [
  {
    href: '/components/link',
    label: 'Link',
    body: ``,
  },
  {
    href: '/components/menu',
    label: 'Menu',
    body: ``,
  },
  {
    href: '/components/tabs',
    label: 'Tabs',
    body: ``,
  },
].sort(sortByLabel);

export const utilityComponents = [
  {
    href: '/components/visuallyhidden',
    label: 'Visually Hidden',
    body: `The Visually Hidden component is used to visually hide content while leaving it available to screen readers.`,
  },
].sort(sortByLabel);

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
