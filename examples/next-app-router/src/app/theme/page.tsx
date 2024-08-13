'use client';
import { Avatar } from '@/components/Avatar';
import { MyClientComponent } from '@/components/ClientComponent';
import { MyServerComponent } from '@/components/ServerComponent';
import { theme } from '@/theme';
import {
  Alert,
  Badge,
  BadgeProps,
  Button,
  ButtonProps,
  Flex,
  Heading,
  Text,
} from '@aws-amplify/ui-react';

const colorThemes: BadgeProps['variation'][] = [
  undefined,
  'success',
  'info',
  'warning',
  'error',
];

export default function ThemePage() {
  return (
    <Flex direction="column">
      <Heading level={3}>Badges</Heading>
      <Flex direction="row">
        {colorThemes.map((colorTheme, i) => (
          <Badge key={`${i}-${colorTheme}`} variation={colorTheme}>
            {colorTheme || 'default'}
          </Badge>
        ))}
      </Flex>
      <Heading level={3}>Buttons</Heading>
      <Flex direction="row">
        {colorThemes.map((colorTheme, i) => (
          <Button key={`${i}-${colorTheme}`} colorTheme={colorTheme}>
            {colorTheme || 'default'}
          </Button>
        ))}
      </Flex>
      <Flex direction="row">
        {colorThemes.map((colorTheme, i) => (
          <Button
            key={`${i}-${colorTheme}`}
            variation="link"
            colorTheme={colorTheme}
          >
            {colorTheme || 'default'}
          </Button>
        ))}
      </Flex>
      <Flex direction="row">
        {colorThemes.map((colorTheme, i) => (
          <Button
            key={`${i}-${colorTheme}`}
            variation="primary"
            colorTheme={colorTheme}
          >
            {colorTheme || 'default'}
          </Button>
        ))}
      </Flex>
      <Avatar isDisabled />
      <MyClientComponent />
      <MyServerComponent />
      <Text color={theme.tokens.colors.font.success}>Success!</Text>
      <Alert heading="Hello" />
      <Alert heading="Hello success" variation="success" />
      <Alert heading="Hello" variation="info" />
    </Flex>
  );
}
