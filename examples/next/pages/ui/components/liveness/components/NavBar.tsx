import React from 'react';
import {
  View,
  Card,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Icon,
  Flex,
  Link,
} from '@aws-amplify/ui-react';

export default function NavBar({
  colorMode,
  setColorMode,
  navOpen,
  handleNav,
}) {
  return (
    <View position="relative">
      <View>
        <Card>
          <Flex maxWidth="640px" margin="0 auto">
            <Button onClick={handleNav}>
              <Icon ariaLabel="Open menu">
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path>
              </Icon>
            </Button>

            <ToggleButtonGroup
              marginLeft="auto"
              value={colorMode}
              isExclusive
              onChange={(value) => setColorMode(value)}
            >
              <ToggleButton value="light">
                <Icon ariaLabel="Light">
                  <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z" />
                </Icon>
              </ToggleButton>
              <ToggleButton value="dark">
                <Icon ariaLabel="Dark">
                  <path d="M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96z" />
                </Icon>
              </ToggleButton>
              <ToggleButton value="system">
                <Icon ariaLabel="System">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.05-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 9.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.04.34-.11.67-.19 1z" />
                </Icon>
              </ToggleButton>
            </ToggleButtonGroup>
          </Flex>
        </Card>
      </View>

      {navOpen && (
        <View
          backgroundColor="overlay.60"
          position="fixed"
          left="0"
          top="0"
          height="100%"
          width="100%"
          className="liveness-example-nav"
        >
          <Card width="280px" height="100%">
            <Flex direction="column" alignItems="end">
              <Button marginLeft="auto" onClick={handleNav}>
                <Icon ariaLabel="Close menu">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </Icon>
              </Button>

              <Link href="/ui/components/liveness">With Start Screen</Link>

              <Link href="/ui/components/liveness/disable-start-screen">
                Disable Start Screen
              </Link>

              <Link href="/ui/components/liveness/with-custom-components">
                With Custom Components
              </Link>

              <Link href="/ui/components/liveness/with-credential-provider">
                With Credential Provider
              </Link>
            </Flex>
          </Card>
        </View>
      )}
    </View>
  );
}
