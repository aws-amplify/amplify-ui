import * as React from 'react';
import { Link, LinkProps, Text, useTheme } from '@aws-amplify/ui-react';

import { Demo } from '@/components/Demo';
import { LinkPropControls } from './LinkPropControls';
import { useLinkProps } from './useLinkProps';

const propsToCode = (props: LinkProps) => {
  return (
    '<Link' +
    (props.color ? `\n color="${props.color}"` : '') +
    (props.textDecoration
      ? `\n textDecoration="${props.textDecoration}"`
      : '') +
    (props.isExternal ? `\n isExternal={${props.isExternal}}` : '') +
    '\n>' +
    `\n ${props.children}\n</Link>`
  );
};

export const LinkDemo = () => {
  const linkProps = useLinkProps({
    isExternal: false,
    color: '#007EB9',
    textDecoration: 'none',
    children: 'My Demo Link',
  });

  const { tokens } = useTheme();

  return (
    <Demo
      code={propsToCode(linkProps)}
      propControls={<LinkPropControls {...linkProps} />}
    >
      <>
        <Link
          color={linkProps.color}
          isExternal={linkProps.isExternal}
          textDecoration={linkProps.textDecoration}
        >
          My Demo Link
        </Link>
        <Text fontSize={tokens.space.relative.small}>
          {linkProps.isExternal ? (
            <>
              <sup>*</sup>Rel Attribute=noopener noreferrer
            </>
          ) : null}
        </Text>
      </>
    </Demo>
  );
};
