import * as React from 'react';
import { DocSearch } from '@docsearch/react';
import {
  Button,
  Flex,
  Image,
  Link,
  View,
  VisuallyHidden,
} from '@aws-amplify/ui-react';

import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Sidebar } from './Sidebar';
import { LogoLink } from './LogoLink';
import { MenuButton } from './MenuButton';
import { DISCORD, GITHUB_REPO } from '@/data/links';
import '@docsearch/css';
import { DiscordIcon, GithubIcon } from '../Icons';

export const Header = ({
  expanded,
  setExpanded,
  colorMode,
  setColorMode,
  platform,
}) => {
  const [showSearch, setShowSearch] = React.useState(false);

  React.useEffect(() => {
    setShowSearch(true);
  }, [showSearch]);

  return (
    <Flex as="header" className="docs-header">
      <div className="docs-header-bg" />
      <MenuButton expanded={expanded} setExpanded={setExpanded} />

      <Sidebar
        expanded={expanded}
        setExpanded={setExpanded}
        platform={platform}
      />

      <LogoLink platform={platform} />

      <Image
        alt={platform}
        height="1.5rem"
        width="1.5rem"
        display="block"
        src={`/svg/integrations/${platform}.svg`}
      />

      <Flex flex="1" justifyContent="flex-end">
        {showSearch && (
          <DocSearch
            appId={process.env.DOCSEARCH_DOCS_APP_ID}
            apiKey={process.env.DOCSEARCH_DOCS_API_KEY}
            indexName={process.env.DOCSEARCH_DOCS_INDEX_NAME}
          />
        )}
        <ColorModeSwitcher colorMode={colorMode} setColorMode={setColorMode} />
        <View>
          <Button
            variation="link"
            as={Link}
            href={DISCORD}
            isExternal
            color="font.tertiary"
          >
            <VisuallyHidden>Discord</VisuallyHidden>
            <DiscordIcon />
          </Button>
          <Button
            variation="link"
            as={Link}
            href={GITHUB_REPO}
            isExternal
            color="font.tertiary"
          >
            <VisuallyHidden>Github</VisuallyHidden>
            <GithubIcon />
          </Button>
        </View>
      </Flex>
    </Flex>
  );
};
