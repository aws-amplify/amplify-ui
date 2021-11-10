import Link from 'next/link';
import { Card, Grid, Heading, Alert, Badge, Flex } from '@aws-amplify/ui-react';

const feedbackComponents = [
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
    // },{
    //   href: '/components/Loader',
    //   label: 'Loader',
    //   body: ``
  },
];

const baseComponents = [
  {
    href: '/components/view',
    label: 'View',
    body: `An Alert displays a brief, important message in a way that attracts the user's attention without interrupting the user's task. Alerts are typically intended to be read out dynamically by a screen reader.`,
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
    href: '/components/link',
    label: 'Link',
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
];

const connectedComponents = [
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
    href: '/components/s3album',
    label: 'S3 Album',
    body: 'Renders a list of S3Image objects.',
  },
];

const ComponentGrid = ({ components }) => {
  return (
    <Grid templateColumns="1fr 1fr" gap="var(--amplify-space-large)">
      {components.map(({ href, label, body }) => (
        <Link href={href} key={href}>
          <Card className="docs-component-card">
            <Heading level={4}>{label}</Heading>
            <div className="docs-component-card-contents">{body}</div>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export const ComponentsGrid = () => {
  return (
    <Flex direction="column" gap="var(--amplify-space-large)">
      <Heading level={3}>Connected components</Heading>
      <ComponentGrid components={connectedComponents} />
      <Heading level={3}>Base components</Heading>
      <ComponentGrid components={baseComponents} />
      <Heading level={3}>Feedback components</Heading>
      <ComponentGrid components={feedbackComponents} />
    </Flex>
  );
};
