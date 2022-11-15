import { Heading, Link } from '@aws-amplify/ui-react';
import { Properties } from '../../../scripts/types/catalog';
import { PropsTable } from './PropsTable';
import { PropsTableExpander } from './PropsTableExpander';
export function PropsTableTab({
  componentName,
  PropsData,
  htmlElement,
  mdnUrl,
}: {
  componentName: string;
  PropsData: {};
  htmlElement: string;
  mdnUrl: string;
}) {
  const componentPropsData = PropsData[componentName];
  return (
    <>
      <Heading level={4}>{`<${componentName}>`}</Heading>
      <PropsTable properties={componentPropsData[componentName][0]['Main']} />
      <PropsTableExpander
        propsSortedByCategory={componentPropsData[componentName].slice(1)}
      />
      {Object.keys(componentPropsData)
        .filter((subComponentName) => subComponentName !== componentName)
        .map((subComponentName) => (
          <>
            <Heading level={4}>{`<${subComponentName}>`}</Heading>
            <PropsTable
              properties={componentPropsData[subComponentName][0]['Main']}
            />
            <PropsTableExpander
              propsSortedByCategory={componentPropsData[subComponentName].slice(
                1
              )}
            />
          </>
        ))}
      <p>`*` indicates required props.</p>
      <p>
        See [Style Props](/react/theming/style-props) for all supported style
        and layout properties.
      </p>
      <p>
        {componentName} will also accept any of the standard HTML attributes
        that a <code>{htmlElement || 'div'}</code> element accepts, which can be
        found in the{' '}
        <Link
          href={
            mdnUrl ??
            'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div'
          }
          isExternal
        >
          MDN Documentation
        </Link>
      </p>
    </>
  );
}
