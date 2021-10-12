import {
  Button,
  Collection,
  IconAccountCircle,
  Image,
  Text,
  defaultTheme,
  View,
  createTheme,
  ToggleButton,
  ToggleButtonGroup,
  AmplifyProvider,
  ColorMode,
} from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { experiences, places } from './data';
import { ExperienceCard } from './ExperienceCard';
import { ListingCard } from './ListingCard';
import { SectionHeading } from './SectionHeading';
import { theme } from '../../../theme';
import '@aws-amplify/ui-react/styles.css';
import './styles.scss';

function App() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 4000);
  });

  const [colorMode, setColorMode] = useState<ColorMode>('system');
  return (
    <AmplifyProvider components={{}} theme={theme} colorMode={colorMode}>
      <View backgroundColor={`${theme.tokens.colors.background.secondary}`}>
        <header className="listing-app-header">
          <Image src="/listing-logo.svg" alt="lystifying" />

          <input type="search" placeholder="search" />
          <ToggleButtonGroup
            value={colorMode}
            isExclusive
            onChange={(value: ColorMode) => setColorMode(value)}
          >
            <ToggleButton value="light">☀️</ToggleButton>
            <ToggleButton value="dark">🌒</ToggleButton>
            <ToggleButton value="system">💻</ToggleButton>
          </ToggleButtonGroup>
          <Button variation="link" size="large">
            <IconAccountCircle />
          </Button>
        </header>

        <View padding={`${defaultTheme.tokens.space.xxl}`}>
          <SectionHeading
            title="Discover Experiences"
            subtitle="Unique activities with local experts—in person or online."
          />
          <Collection
            type="list"
            direction={{ base: 'column', large: 'row' }}
            alignItems="stretch"
            padding={`0 0 ${defaultTheme.tokens.space.xxl} 0`}
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
            direction="row"
            alignItems="stretch"
            padding={`0 0 ${defaultTheme.tokens.space.xxl} 0`}
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
          <Text color={`${defaultTheme.tokens.colors.font.tertiary}`}>
            © 2021 Lystifying (not a real company)
          </Text>
        </footer>
      </View>
    </AmplifyProvider>
  );
}

export default App;
