import { useEffect, useState } from 'react';
import { remark } from 'remark';
import html from 'remark-html';
import { TableRow } from '@aws-amplify/ui-react';
import { ResponsiveTableCell } from '@/components/ResponsiveTable';
import { CodeHighlight } from '@/components/CodeHighlight';
import { Property } from '../../../scripts/types/catalog';

export const PropsTableBody = ([
  propName,
  { name, type, description, isOptional },
]: [string, Property]): JSX.Element => {
  const [htmlDescription, setHtmlDescription] = useState('-');

  useEffect(() => {
    const getDesc = async () => {
      const descriptionHTML = await remark().use(html).process(description);
      setHtmlDescription(descriptionHTML.toString());
    };
    getDesc();
  }, [description]);

  return (
    <TableRow key={name}>
      <ResponsiveTableCell label="Name">
        {name}
        {isOptional ? '' : '<sup>*</sup>'}
      </ResponsiveTableCell>
      <ResponsiveTableCell label="Type">
        <CodeHighlight code={type} />
      </ResponsiveTableCell>
      <ResponsiveTableCell label="Description">
        {/**
         * [`dangerouslySetInnerHTML`](https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml) here only use the pre-generated props-table data,
         * so there's no cross-site scripting concern.
         * more details: https://nextjs.org/learn/basics/dynamic-routes/render-markdown
         */}
        <div dangerouslySetInnerHTML={{ __html: htmlDescription }} />
      </ResponsiveTableCell>
    </TableRow>
  );
};
