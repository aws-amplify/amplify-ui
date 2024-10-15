import React from 'react';

import { EmptyMessage } from '../../components/EmptyMessage';
import { LoadingIndicator } from '../../components/LoadingIndicator';
import { Table } from '../../components/Table';
import { SortHeader } from './headers/SortHeader';
import { TextHeader } from './headers/TextHeader';
import { ButtonDataCell } from './dataCells/ButtonDataCell';
import { DateDataCell } from './dataCells/DateDataCell';
import { NumberDataCell } from './dataCells/NumberDataCell';
import { CheckboxDataCell } from './dataCells/CheckboxDataCell';
import { TextDataCell } from './dataCells/TextDataCell';
import { DataTableDataCell, DataTableHeader } from './types';
import { WithKey } from '../../components/types';
import { CheckboxHeader } from './headers/CheckboxHeader';

export interface DataTableRow {
  content: WithKey<DataTableDataCell>[];
}

export interface DataTableProps {
  headers: WithKey<DataTableHeader>[];
  rows: WithKey<DataTableRow>[];
  isLoading?: boolean;
}

export const DataTable = ({
  headers,
  rows,
  isLoading,
}: DataTableProps): React.JSX.Element => {
  const mappedHeaders = headers.map(({ key, content, type }) => {
    switch (type) {
      case 'checkbox': {
        return {
          key,
          content: <CheckboxHeader content={content} />,
        };
      }
      case 'sort': {
        return {
          key,
          content: <SortHeader content={content} />,
        };
      }
      case 'text':
      default: {
        return {
          key,
          content: <TextHeader content={content} />,
        };
      }
    }
  });

  const mappedRows = rows.map(({ key, content }) => ({
    key,
    content: content.map(({ key, content, type }) => {
      switch (type) {
        case 'button': {
          return {
            key,
            content: <ButtonDataCell content={content} />,
          };
        }
        case 'checkbox': {
          return {
            key,
            content: <CheckboxDataCell content={content} />,
          };
        }
        case 'date': {
          return {
            key,
            content: <DateDataCell content={content} />,
          };
        }
        case 'number': {
          return {
            key,
            content: <NumberDataCell content={content} />,
          };
        }
        case 'text':
        default: {
          return {
            key,
            content: <TextDataCell content={content} />,
          };
        }
      }
    }),
  }));

  return (
    <>
      <Table headers={mappedHeaders} rows={mappedRows} />
      {isLoading ? (
        <LoadingIndicator />
      ) : mappedRows.length ? null : (
        <EmptyMessage>No data available</EmptyMessage>
      )}
    </>
  );
};
