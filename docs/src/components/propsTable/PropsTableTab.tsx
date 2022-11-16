import { Heading, Link, Text } from '@aws-amplify/ui-react';
import {
  PropsTableData,
  PropsTableSubComponentData,
} from '../../../scripts/types/catalog';
import { PropsTable } from './PropsTable';
import { PropsTableExpander } from './PropsTableExpander';

function PropsTableSet({
  componentName,
  componentPropsData,
}: {
  componentName: string;
  componentPropsData: PropsTableSubComponentData;
}) {
  return (
    <>
      <Heading level={2} id={componentName} className="amplify-heading--4">
        <Link aria-hidden="true" tabIndex={-1} href={`#${componentName}`}>
          <span className="icon icon-link"></span>
        </Link>
        {`<${componentName}>`}
      </Heading>
      <PropsTable properties={componentPropsData[componentName][0]['Main']} />
      <PropsTableExpander
        key={componentName}
        propsSortedByCategory={componentPropsData[componentName].slice(1)}
      />
    </>
  );
}

export function PropsTableTab({
  componentName,
  PropsData,
  htmlElement,
  mdnUrl,
}: {
  componentName: string;
  PropsData: PropsTableData;
  htmlElement: string;
  mdnUrl: string;
}) {
  const componentPropsData: PropsTableSubComponentData =
    PropsData[componentName];
  return (
    <>
      <PropsTableSet
        componentName={componentName}
        componentPropsData={componentPropsData}
      />
      {Object.keys(componentPropsData)
        .filter((subComponentName) => subComponentName !== componentName)
        .map((subComponentName) => (
          <PropsTableSet
            key={subComponentName}
            componentName={subComponentName}
            componentPropsData={componentPropsData}
          />
        ))}

      <Text>
        See <Link href="/react/theming/style-props">Style Props</Link> for all
        supported style and layout properties.
      </Text>
      <Text>
        {componentName} will also accept any of the standard HTML attributes
        that a <code>{htmlElement || 'div'}</code> element accepts, which can be
        found in the{' '}
        <Link
          href={
            mdnUrl ||
            `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${htmlElement}`
          }
          isExternal
        >
          MDN Documentation
        </Link>
      </Text>
    </>
  );
}
