import {
  Link,
  Text,
  Heading,
  View,
  Expander,
  ExpanderItem,
} from '@aws-amplify/ui-react';
import { PropsTable, Prop } from '@/components/Layout/PropsTable';

interface PropsList {
  name: string;
  props: Prop[];
}

interface PropsLists extends PropsList {
  utilityProps: PropsList[];
}

interface PropsDataObject {
  displayName: string;
  htmlElement?: string;
  mdnUrl?: string;
  propsLists: PropsLists[];
}

interface PropsTabProps {
  propsData: PropsDataObject;
}

export const PropsTab = ({ propsData }: PropsTabProps) => {
  const { displayName, htmlElement, mdnUrl, propsLists } = propsData;
  console.log('propsLists: ', propsLists);

  return (
    <View className="docs-props-tab">
      {propsLists.map((propsList) => {
        return (
          <>
            <Heading level={2} className="amplify-heading--4">
              {propsList.name}
            </Heading>
            <PropsTable props={propsList.props} />
            <Expander type="multiple" className="docs-props-expander">
              {propsList.utilityProps.map((utilityPropsList) => {
                console.log('utilityPropsList: ', utilityPropsList);
                return (
                  <ExpanderItem
                    key={utilityPropsList.name}
                    value={utilityPropsList.name}
                    title={`${utilityPropsList.name}`}
                  >
                    <PropsTable props={utilityPropsList.props} />
                  </ExpanderItem>
                );
              })}
            </Expander>
          </>
        );
      })}

      <Text>
        See <Link href="/react/theming/style-props">Style Props</Link> for all
        supported style and layout properties.
      </Text>
      <Text>
        {displayName} will also accept any of the standard HTML attributes that
        a <code>{htmlElement || 'div'}</code> element accepts, which can be
        found in the{' '}
        <Link
          href={
            mdnUrl ||
            'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div'
          }
          isExternal
        >
          MDN Documentation
        </Link>
        .
      </Text>
    </View>
  );
};
