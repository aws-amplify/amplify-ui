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
      {propLists.map((propList) => {
        return (
          <>
            <Heading level={2} className="amplify-heading--4">
              {'<'}
              {propList.name}
              {'>'}
            </Heading>
            <ResponsiveTable>
              <TableHead>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
              </TableHead>
              <TableBody>
                {propList.props.map((prop, index) => {
                  const { name, isOptional, type, description } = prop;
                  return (
                    <TableRow key={`${prop}-${index}`}>
                      <ResponsiveTableCell label="Name">
                        {name}
                      </ResponsiveTableCell>
                      <ResponsiveTableCell label="Type">
                        <code>{type}</code>
                      </ResponsiveTableCell>
                      <ResponsiveTableCell label="Description">
                        {!isOptional && (
                          <Badge variation="info">required</Badge>
                        )}
                        {description}
                      </ResponsiveTableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </ResponsiveTable>
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
    </>
  );
};
