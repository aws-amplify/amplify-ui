import React from 'react';

import { Table } from '../../base';
import type { WithKey } from '../../types';

import { SortHeader } from './headers/SortHeader';
import { TextHeader } from './headers/TextHeader';
import { ButtonDataCell } from './dataCells/ButtonDataCell';
import { DateDataCell } from './dataCells/DateDataCell';
import { NumberDataCell } from './dataCells/NumberDataCell';
import { CheckboxDataCell } from './dataCells/CheckboxDataCell';
import { TextDataCell } from './dataCells/TextDataCell';
import type { DataTableDataCell, DataTableHeader } from './types';
import { CheckboxHeader } from './headers/CheckboxHeader';

export interface DataTableRow {
  content: WithKey<DataTableDataCell>[];
}

export interface DataTableProps {
  headers: WithKey<DataTableHeader>[];
  isLoading?: boolean;
  rows: WithKey<DataTableRow>[];
}

export const DataTable = ({
  headers,
  isLoading,
  rows,
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

  const mappedRows = isLoading
    ? []
    : rows.map(({ key, content }) => ({
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

  return <Table headers={mappedHeaders} rows={mappedRows} />;
};
