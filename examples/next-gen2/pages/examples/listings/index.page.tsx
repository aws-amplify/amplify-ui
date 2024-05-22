import { Collection, Text, View, useTheme } from '@aws-amplify/ui-react';
import { experiences, places } from './data';
import { ExperienceCard } from './ExperienceCard';
import { ListingCard } from './ListingCard';
import { SectionHeading } from './SectionHeading';
import { App } from './App';

export default function IndexPage() {
  const { tokens } = useTheme();
  return (
    <App>
      <View>
        <View>
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
          <Text color={tokens.colors.font.tertiary}>
            © 2021 Lystifying (not a real company)
          </Text>
        </footer>
      </View>
    </App>
  );
}
