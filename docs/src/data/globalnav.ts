export const RIGHT_NAV_LINKS = [
  {
    type: 'EXTERNAL',
    label: 'Pricing',
    url: 'https://aws.amazon.com/amplify/pricing',
    order: 6,
    placement: 'RIGHT',
  },
  {
    type: 'EXTERNAL',
    label: 'About AWS Amplify',
    url: 'https://aws.amazon.com/amplify/',
    order: 7,
    placement: 'RIGHT',
  },
  {
    type: 'ICON',
    label: 'Discord',
    url: 'https://discord.com/invite/amplify',
    order: 8,
    placement: 'RIGHT',
    icon: 'discord',
  },
  {
    type: 'ICON',
    label: 'Twitter',
    url: 'https://twitter.com/AWSAmplify',
    order: 9,
    placement: 'RIGHT',
    icon: 'twitter',
  },
].sort((a, b) => a.order - b.order);

export const LEFT_NAV_LINKS = [
  {
    type: 'DEFAULT',
    label: 'Sandbox',
    url: 'https://sandbox.amplifyapp.com/',
    order: 1,
    placement: 'LEFT',
  },
  {
    type: 'DEFAULT',
    label: 'Docs',
    url: 'https://docs.amplify.aws/',
    order: 2,
    placement: 'LEFT',
  },
  {
    type: 'DEFAULT',
    label: 'Learn',
    url: 'https://amplify.aws/learn',
    order: 3,
    placement: 'LEFT',
  },
  {
    type: 'DEFAULT',
    label: 'UI Library',
    url: 'https://ui.docs.amplify.aws/',
    order: 4,
    placement: 'LEFT',
  },
  {
    type: 'DEFAULT',
    label: 'Contribute',
    url: 'https://www.contributetoamplify.com/',
    order: 5,
    placement: 'LEFT',
  },
].sort((a, b) => a.order - b.order);
