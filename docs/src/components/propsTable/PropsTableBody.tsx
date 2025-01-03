import ReactMarkdown from 'react-markdown';
import { Badge, TableRow } from '@aws-amplify/ui-react';
import { ResponsiveTableCell } from '@/components/ResponsiveTable';
import { CodeHighlight } from '@/components/CodeHighlight';
import { Property } from '../../../scripts/types/catalog';

export const PropsTableBody = ([
  propName,
  { name, type, description, isOptional },
]: [string, Property]): JSX.Element => {
  return (
    <TableRow key={name}>
      <ResponsiveTableCell label="Name">
        {name} {` `}
        {isOptional ? null : (
          <Badge variation="info" size="small">
            Required
          </Badge>
        )}
      </ResponsiveTableCell>
      <ResponsiveTableCell label="Type">
        <CodeHighlight code={type} language="typescript" />
      </ResponsiveTableCell>
      <ResponsiveTableCell label="Description">
        <ReactMarkdown>{description || '\\-'}</ReactMarkdown>
      </ResponsiveTableCell>
    </TableRow>
  );
};
