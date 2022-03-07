import * as React from 'react';
import {
  Badge,
  AmplifyProvider,
  defaultTheme,
  TextField,
} from '@aws-amplify/ui-react';

import { BadgePropControls } from './BadgePropControls';
import { useBadgeProps } from './useBadgeProps';
import { Demo } from '@/components/Demo';

const propsToCode = (badgeProps) => {
  return (
    `<Badge` +
    (badgeProps.size ? `\n  size=${JSON.stringify(badgeProps.size)}` : '') +
    (badgeProps.variation
      ? `\n  variation=${JSON.stringify(badgeProps.variation)}`
      : '') +
    `>
  ${badgeProps.body}
</Badge>`
  );
};

const ThemeControls = ({ bg, setBg }) => {
  return (
    <TextField label="bg" value={bg} onChange={(e) => setBg(e.target.value)} />
  );
};

export const BadgeDemo = () => {
  const badgeProps = useBadgeProps({
    body: 'Badge',
  });

  const [bg, setBg] = React.useState(
    defaultTheme.tokens.components.badge.backgroundColor.original
  );

  const theme = {
    name: 'badge-theme',
    tokens: {
      components: {
        badge: {
          backgroundColor: { value: bg },
        },
      },
    },
  };
  return (
    <Demo
      code={propsToCode(badgeProps)}
      propControls={<BadgePropControls {...badgeProps} />}
      themeControls={<ThemeControls bg={bg} setBg={setBg} />}
    >
      <AmplifyProvider theme={theme}>
        <Badge size={badgeProps.size} variation={badgeProps.variation}>
          {badgeProps.body}
        </Badge>
      </AmplifyProvider>
    </Demo>
  );
};
