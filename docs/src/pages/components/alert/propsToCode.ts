import { AlertProps } from '@aws-amplify/ui-react';

export const propsToCode = (props: AlertProps & { body: any }) => {
  return (
    `<Alert` +
    (props.variation
      ? `\n  variation=${JSON.stringify(props.variation)}`
      : '') +
    `
  isDismissible={${props.isDismissible}}
  hasIcon={${props.hasIcon}}
  heading="${props.heading}"
  >
  ${props.body}
</Alert>`
  );
};
