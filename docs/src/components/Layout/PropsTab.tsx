import {
  Link,
  Text,
  Badge,
  Heading,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from '@aws-amplify/ui-react';
import {
  ResponsiveTable,
  ResponsiveTableCell,
} from '@/components/ResponsiveTable';

interface PropsDataObject {
  displayName: string;
  htmlElement?: string;
  mdnUrl?: string;
  propLists: {
    name: string;
    props: {
      name: string;
      isOptional: boolean;
      type: string;
      description?: string;
    }[];
    utilityProps: any;
  }[];
}

interface PropsTabProps {
  propsData: PropsDataObject;
}

export const PropsTab = ({ propsData }: PropsTabProps) => {
  const { displayName, htmlElement, mdnUrl, propLists } = propsData;

  return (
    <>
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
    </>
  );
};
