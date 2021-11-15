import * as React from 'react';

import { Flex } from '@aws-amplify/ui-react';

import { Example } from '@/components/Example';
import { TablePropControls } from '@/components/TablePropControls';
import { useTableProps } from '@/components/useTableProps';
import { BasicExample } from './examples';

export const TableDemo = () => {
  const tableProps = useTableProps({});

  return (
    <Flex direction="column" gap="0.5rem">
      <TablePropControls {...tableProps} />
      <Example>
        <BasicExample
          caption={tableProps.caption}
          highlightOnHover={tableProps.highlightOnHover}
          size={tableProps.size}
          variation={tableProps.variation}
        />
      </Example>
    </Flex>
  );
};
