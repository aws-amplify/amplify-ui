import classNames from 'classnames';
import * as React from 'react';

import { Text } from '../';
import { ComponentClassNames } from '../shared/constants';
import { useNonStyleProps, usePropStyles } from '../shared/styleUtils';
import { TableControls } from '../types/table';

export const Table: TableControls = (props) => {
  const { caption, children, className, label, style, summary, ...rest } =
    props;

  const propStyles = usePropStyles(props, style);
  const nonStyleProps = useNonStyleProps(rest);

  return (
    <table
      aria-label={label}
      className={classNames(ComponentClassNames.Table, className)}
      style={propStyles}
      {...nonStyleProps}
    >
      <caption>
        {caption}
        {caption && summary ? <br /> : null}
        {summary && (
          <Text as="span" className={ComponentClassNames.TableSummary}>
            {summary}
          </Text>
        )}
      </caption>
      {children}
    </table>
  );
};

Table.Body = ({ children, ...rest }) => {
  const nonStyleProps = useNonStyleProps(rest);
  return <tbody {...nonStyleProps}>{children}</tbody>;
};

Table.Cell = ({ as: CellTag = 'td', children, ...rest }) => {
  const nonStyleProps = useNonStyleProps(rest);
  console.log('nonStyleProps', nonStyleProps);
  return <CellTag {...nonStyleProps}>{children}</CellTag>;
};

Table.Head = ({ children, ...rest }) => {
  const nonStyleProps = useNonStyleProps(rest);
  return <thead {...nonStyleProps}>{children}</thead>;
};

Table.Row = ({ children, ...rest }) => {
  const nonStyleProps = useNonStyleProps(rest);
  return <tr {...nonStyleProps}>{children}</tr>;
};
