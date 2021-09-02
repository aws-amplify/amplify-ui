import React from 'react';
import { Link, Text, View } from '@aws-amplify/ui-react';
import { LinkPropControls } from '../../../../components/LinkPropControls';
import { useLinkProps } from '@/components/useLinkProps';
import { Example } from '@/components/Example';

export const LinkDemo = () => {
  const linkProps = useLinkProps({
    isExternal: false,
    color: '#007EB9',
    textDecoration: 'none',
  });

  return (
    <View>
      <LinkPropControls {...linkProps} />
      <Example>
        <Link
          color={linkProps.color}
          isExternal={linkProps.isExternal}
          textDecoration={linkProps.textDecoration}
          size={linkProps.size}
        >
          My Demo Link
        </Link>
        <Text fontSize={'.75em'}>
          <sup>*</sup>Rel Attribute=
          {linkProps.isExternal ? 'noopener noreferrer' : ''}
        </Text>
      </Example>
    </View>
  );
};
