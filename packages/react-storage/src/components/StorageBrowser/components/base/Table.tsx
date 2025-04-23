import React from 'react';

import {
  TableBodyElement,
  TableDataCellElement,
  TableElement,
  TableHeadElement,
  TableHeaderElement,
  TableRowElement,
} from '../elements';
import type { WithKey } from '../types';

import { STORAGE_BROWSER_BLOCK } from './constants';

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
    <TableElement className={`${STORAGE_BROWSER_BLOCK}__table`}>
      <TableHeadElement className={`${STORAGE_BROWSER_BLOCK}__table-head`}>
        {headers.length ? (
          <TableRowElement className={`${STORAGE_BROWSER_BLOCK}__table-row`}>
            {headers.map(({ key, content }) => (
              <TableHeaderElement
                key={key}
                className={`${STORAGE_BROWSER_BLOCK}__table-header`}
              >
                {content}
              </TableHeaderElement>
            ))}
          </TableRowElement>
        ) : null}
      </TableHeadElement>
      <TableBodyElement className={`${STORAGE_BROWSER_BLOCK}__table-body`}>
        {rows?.map(({ key, content }) => (
          <TableRowElement
            key={key}
            className={`${STORAGE_BROWSER_BLOCK}__table-row`}
          >
            {content.map(({ key, content, type }) => {
              return type === 'header' ? (
                <TableHeaderElement
                  key={key}
                  className={`${STORAGE_BROWSER_BLOCK}__table-header`}
                  role="rowheader"
                >
                  {content}
                </TableHeaderElement>
              ) : (
                <TableDataCellElement
                  key={key}
                  className={`${STORAGE_BROWSER_BLOCK}__table-data-cell`}
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
