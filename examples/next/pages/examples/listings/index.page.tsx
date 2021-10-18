import {
  Collection,
  Text,
  View,
  ToggleButton,
  ToggleButtonGroup,
  AmplifyProvider,
  IconWbSunny,
  IconWbTwilight,
  IconComputer,
  ColorMode,
} from '@aws-amplify/ui-react';
import { useState } from 'react';
import { experiences, places } from './data';
import { ExperienceCard } from './ExperienceCard';
import { ListingCard } from './ListingCard';
import { SectionHeading } from './SectionHeading';
import { Logo } from './Logo';
import { theme } from '../../../theme';

import '@aws-amplify/ui-react/styles.css';
import './styles.scss';

const { tokens } = theme;

function App() {
  const [colorMode, setColorMode] = useState<ColorMode>('system');
  return (
    <AmplifyProvider components={{}} theme={theme} colorMode={colorMode}>
      <View backgroundColor={`${tokens.colors.background.secondary}`}>
        <header className="listing-app-header">
          <Logo />

          <input type="search" placeholder="search" />
          <ToggleButtonGroup
            value={colorMode}
            isExclusive
            onChange={(value: ColorMode) => setColorMode(value)}
          >
            <ToggleButton value="light">
              <IconWbSunny />
            </ToggleButton>
            <ToggleButton value="dark">
              <IconWbTwilight />
            </ToggleButton>
            <ToggleButton value="system">
              <IconComputer />
            </ToggleButton>
          </ToggleButtonGroup>
        </header>

        <View padding={`${tokens.space.xxl}`}>
          <SectionHeading
            title="Discover Experiences"
            subtitle="Unique activities with local experts—in person or online."
          />
          <Collection
            type="list"
            direction={{ base: 'column', large: 'row' }}
            alignItems="stretch"
            padding={`0 0 ${tokens.space.xxl} 0`}
            items={experiences}
          >
            {(item) => (
              <ListingCard {...item} key={item.title} isLoaded={true} />
            )}
          </Collection>

          <SectionHeading
            title="Vacation rentals for every style"
            subtitle="Get the amount of space that is right for you"
          />
          <Collection
            type="list"
            direction={['column', 'row']}
            alignItems="stretch"
            padding={`0 0 ${tokens.space.xxl} 0`}
            items={places}
          >
            {(item) => (
              <ExperienceCard
                key={item.title}
                img={item.img}
                title={item.title}
              />
            )}
          </Collection>
        </View>

        <footer className="listing-app-footer">
          <Text color={`${tokens.colors.font.tertiary}`}>
            © 2021 Lystifying (not a real company)
          </Text>
        </footer>
      </View>
    </AmplifyProvider>
  );
}

export default App;
