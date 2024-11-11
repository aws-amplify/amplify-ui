import React from 'react';

import {
  TableBodyElement,
  TableDataCellElement,
  TableElement,
  TableHeadElement,
  TableHeaderElement,
  TableRowElement,
} from '../context/elements';

import { CLASS_BASE } from '../views/constants';
import { WithKey } from './types';

interface TableItem {
  type?: 'dataCell' | 'header';
  content: React.ReactNode;
}

interface TableRow {
  content: WithKey<TableItem>[];
}

interface TableProps {
  headers: WithKey<TableItem>[];
  rows: WithKey<TableRow>[];
}

export const Table = ({ headers, rows }: TableProps): React.JSX.Element => {
  return (
    <TableElement className={`${CLASS_BASE}__table`}>
      <TableHeadElement className={`${CLASS_BASE}__table-head`}>
        {headers.length ? (
          <TableRowElement className={`${CLASS_BASE}__table-row`}>
            {headers.map(({ key, content }) => (
              <TableHeaderElement
                key={key}
                className={`${CLASS_BASE}__table-header`}
              >
                {content}
              </TableHeaderElement>
            ))}
          </TableRowElement>
        ) : null}
      </TableHeadElement>
      <TableBodyElement className={`${CLASS_BASE}__table-body`}>
        {rows?.map(({ key, content }) => (
          <TableRowElement key={key} className={`${CLASS_BASE}__table-row`}>
            {content.map(({ key, content, type }) => {
              return type === 'header' ? (
                <TableHeaderElement
                  key={key}
                  className={`${CLASS_BASE}__table-header`}
                  role="rowheader"
                >
                  {content}
                </TableHeaderElement>
              ) : (
                <TableDataCellElement
                  key={key}
                  className={`${CLASS_BASE}__table-data-cell`}
                >
                  {content}
                </TableDataCellElement>
              );
            })}
          </TableRowElement>
        ))}
      </TableBodyElement>
    </TableElement>
  );
};
