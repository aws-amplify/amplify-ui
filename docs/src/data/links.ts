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
    body: ``,
  },
  {
    href: '/components/icon',
    label: 'Icon',
    body: ``,
  },
  {
    href: '/components/image',
    label: 'Image',
    body: ``,
  },
  {
    href: '/components/divider',
    label: 'Divider',
    body: ``,
  },
  {
    href: '/components/scrollview',
    label: 'Scrollview',
    body: ``,
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
    href: '/components/storage',
    label: 'Storage',
    body: 'A set of components to help interact with S3 storage.',
  },
].sort(sortByLabel);

export const dataDisplayComponents = [
  { href: '/components/badge', label: 'Badge', body: `` },
  { href: '/components/rating', label: 'Rating', body: `` },
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
    href: '/components/textfield',
    label: 'Text Field',
    body: `The TextField form primitive can be used allow users to input text content.`,
  },
  { href: '/components/selectfield', label: 'Select Field', body: `` },
  { href: '/components/sliderfield', label: 'Slider Field', body: `` },
  {
    href: '/components/stepperfield',
    label: 'Stepper Field',
    body: `A StepperField is a number input with buttons to increase or decrease the value.`,
  },
  { href: '/components/searchfield', label: 'Search Field', body: `` },
  { href: '/components/passwordfield', label: 'Password Field', body: `` },
  {
    href: '/components/phonenumberfield',
    label: 'Phone Number Field',
    body: ``,
  },
  { href: '/components/switchfield', label: 'Switch Field', body: `` },
  { href: '/components/radiogroupfield', label: 'Radio Group Field', body: `` },
  { href: '/components/checkboxfield', label: 'Checkbox Field', body: `` },
  { href: '/components/togglebutton', label: 'Toggle Button', body: `` },
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
  { href: '/components/table', label: 'Table', body: `` },
  { href: '/components/expander', label: 'Expander', body: `` },
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
  { href: '/components/visuallyhidden', label: 'Visually Hidden', body: `` },
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
