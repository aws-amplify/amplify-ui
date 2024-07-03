import React from 'react';
import { ElementsBase } from './types';

export const ButtonElementBase: ElementsBase['Button'] = React.forwardRef(
  ({ isDisabled, ...rest }, ref) => (
    <button {...rest} disabled={isDisabled} ref={ref} />
  )
);
ButtonElementBase.displayName = 'Button';

export const TableElementBase: ElementsBase['Table'] = React.forwardRef(
  (props, ref) => <table {...props} ref={ref} />
);
TableElementBase.displayName = 'Table';

export const TableCaptionElementBase: ElementsBase['Caption'] =
  React.forwardRef((props, ref) => <caption {...props} ref={ref} />);
TableCaptionElementBase.displayName = 'TableCaption';

export const TableColElementBase: ElementsBase['Col'] = React.forwardRef(
  (props, ref) => <col {...props} ref={ref} />
);
TableColElementBase.displayName = 'TableCol';

export const TableRowElementBase: ElementsBase['Tr'] = React.forwardRef(
  (props, ref) => <tr {...props} ref={ref} />
);
TableRowElementBase.displayName = 'TableRow';

export const TableCellElementBase: ElementsBase['Td'] = React.forwardRef(
  (props, ref) => <td {...props} ref={ref} />
);
TableCellElementBase.displayName = 'TableCell';

export const TableHeaderElementBase: ElementsBase['Th'] = React.forwardRef(
  (props, ref) => <th {...props} ref={ref} />
);
TableHeaderElementBase.displayName = 'TableHeader';

export const TableHeadElementBase: ElementsBase['Thead'] = React.forwardRef(
  (props, ref) => <thead {...props} ref={ref} />
);
TableHeadElementBase.displayName = 'TableHead';

export const TableBodyElementBase: ElementsBase['Tbody'] = React.forwardRef(
  (props, ref) => <tbody {...props} ref={ref} />
);
TableBodyElementBase.displayName = 'TableBody';

export const TableFootElementBase: ElementsBase['Tfoot'] = React.forwardRef(
  (props, ref) => <tfoot {...props} ref={ref} />
);
TableFootElementBase.displayName = 'TableFoot';

export const ViewElementBase: ElementsBase['View'] = React.forwardRef(
  (props, ref) => <div {...props} ref={ref} />
);
ViewElementBase.displayName = 'View';
