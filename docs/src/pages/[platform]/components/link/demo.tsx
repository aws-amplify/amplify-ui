import * as React from 'react';
import { Link, LinkProps } from '@aws-amplify/ui-react';
import { Demo } from '@/components/Demo';
import { LinkPropControls } from './LinkPropControls';
import { useLinkProps } from './useLinkProps';
import { demoState } from '@/utils/demoState';

const propsToCode = (props: LinkProps) => {
  return (
    '<Link' +
    '\n href="https://ui.docs.amplify.aws/react/components/link"' +
    (props.color ? `\n color="${props.color}"` : '') +
    (props.textDecoration !== 'none'
      ? `\n textDecoration="${props.textDecoration}"`
      : '') +
    (props.isExternal ? `\n isExternal={${props.isExternal}}` : '') +
    (props.isExternal && props.hideIcon
      ? `\n hideIcon={${props.hideIcon}}`
      : '') +
    (props.isExternal && !props.hideIcon && props.linkIconPosition !== 'right'
      ? `\n linkIconPosition="${props.linkIconPosition}"`
      : '') +
    '\n>' +
    `\n ${props.children}\n</Link>`
  );
};

const defaultLinkProps = {
  isExternal: false,
  hideIcon: false,
  color: '#007eb9',
  textDecoration: 'none',
  linkIconPosition: 'right',
  children: 'My Demo Link',
};

export const LinkDemo = () => {
  const linkProps = useLinkProps(
    (demoState.get(Link.displayName) as LinkProps) || defaultLinkProps
  );

  return (
    <Demo
      code={propsToCode(linkProps)}
      propControls={<LinkPropControls {...linkProps} />}
    >
      <Link
        href="https://ui.docs.amplify.aws/react/components/link"
        color={linkProps.color}
        isExternal={linkProps.isExternal}
        hideIcon={linkProps.hideIcon}
        textDecoration={linkProps.textDecoration}
        linkIconPosition={linkProps.linkIconPosition}
      >
        {linkProps.children}
      </Link>
    </Demo>
  );
};
