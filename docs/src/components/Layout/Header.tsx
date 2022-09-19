import * as React from 'react';
import { DocSearch } from '@docsearch/react';
import {
  Button,
  Flex,
  Link,
  View,
  VisuallyHidden,
  useBreakpointValue,
} from '@aws-amplify/ui-react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Sidebar } from './Sidebar';
import { LogoLink } from './LogoLink';
import { MenuButton } from './MenuButton';
import { GITHUB_REPO } from '@/data/links';
import '@docsearch/css';
import { GithubIcon } from '../Icons';
import { FrameworkLogo } from '../Logo';

export const Header = ({
  expanded,
  setExpanded,
  colorMode,
  setColorMode,
  platform,
}) => {
  const [showSearch, setShowSearch] = React.useState(false);
  const hiddenOnMobile = useBreakpointValue({
    base: false,
    small: true,
  });

  React.useEffect(() => {
    setShowSearch(true);
  }, [showSearch]);

  return (
    <Flex as="header" className="docs-header">
      <MenuButton expanded={expanded} setExpanded={setExpanded} />

      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
        platform={platform}
      />

      <LogoLink platform={platform} />
      <FrameworkLogo
        framework={platform}
        alt={platform}
        height="1.5rem"
        width="1.5rem"
        className="docs-logo-framework"
      />

      <Flex flex="1" justifyContent="flex-end" gap="small">
        {showSearch && (
          <DocSearch
            appId={process.env.DOCSEARCH_DOCS_APP_ID}
            apiKey={process.env.DOCSEARCH_DOCS_API_KEY}
            indexName={process.env.DOCSEARCH_DOCS_INDEX_NAME}
          />
        )}
        <ColorModeSwitcher colorMode={colorMode} setColorMode={setColorMode} />
        {hiddenOnMobile ? (
          <View>
            <Button
              variation="link"
              size="small"
              as={Link}
              href={GITHUB_REPO}
              isExternal
              color="font.tertiary"
              fontSize="large"
              title="GitHub"
            >
              <VisuallyHidden>GitHub</VisuallyHidden>
              <GithubIcon />
            </Button>
          </View>
        ) : null}
      </Flex>
    </Flex>
  );
};
