import { Heading, Link, View } from '@aws-amplify/ui-react';
import { ThemeAlert } from '@/components/ThemeAlert';
import { GITHUB_REPO_FILE } from '@/data/links';
import { DesignTokenIcon } from '@/components/Icons';

export const ThemeExample = (props) => (
  <>
    <Heading level={3} id="theme">
      <a aria-hidden="true" tabIndex={-1} href="#theme">
        <span className="icon icon-link"></span>
      </a>
      Theme
    </Heading>
    <ThemeAlert />
    You can customize the appearance of all {props.component} components in your
    application with a <Link href="/theming">Theme</Link>.
    <Link
      className="docs-component-link"
      href={`${GITHUB_REPO_FILE}packages/ui/src/theme/tokens/components/${
        props.link ||
        props.component.charAt(0).toLowerCase() + props.component.slice(1)
      }.ts`}
      isExternal
    >
      <DesignTokenIcon ariaLabel="theme-source" marginInlineEnd="0.5rem" />
      {props.component} Theme Source
    </Link>
    <View backgroundColor="white">{props.children}</View>
  </>
);
