import React from 'react';

import {
  TableBodyElement,
  TableDataCellElement,
  TableElement,
  TableHeadElement,
  TableHeaderElement,
  TableRowElement,
  ViewElement,
} from '../context/elements';

import { STORAGE_BROWSER_BLOCK } from '../constants';
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
  isLoading?: boolean;
  renderPlaceholder: () => React.JSX.Element | null;
}

export const Table = ({
  headers,
  rows,
  isLoading,
  renderPlaceholder,
}: TableProps): React.JSX.Element => {
  return (
    <ViewElement className={`${STORAGE_BROWSER_BLOCK}__data-table`}>
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
          {isLoading
            ? renderPlaceholder()
            : rows?.map(({ key, content }) => (
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
    </ViewElement>
  );
};
