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

export const TableCaptionElementBase: ElementsBase['TableCaption'] =
  React.forwardRef((props, ref) => <caption {...props} ref={ref} />);
TableCaptionElementBase.displayName = 'TableCaption';

export const TableColElementBase: ElementsBase['TableCol'] = React.forwardRef(
  (props, ref) => <col {...props} ref={ref} />
);
TableColElementBase.displayName = 'TableCol';

export const TableRowElementBase: ElementsBase['TableRow'] = React.forwardRef(
  (props, ref) => <tr {...props} ref={ref} />
);
TableRowElementBase.displayName = 'TableRow';

export const TableTdElementBase: ElementsBase['TableCell'] = React.forwardRef(
  (props, ref) => <td {...props} ref={ref} />
);
TableTdElementBase.displayName = 'TableTd';

export const TableThElementBase: ElementsBase['TableCell'] = React.forwardRef(
  (props, ref) => <th {...props} ref={ref} />
);
TableThElementBase.displayName = 'TableTh';

export const TableTheadElementBase: ElementsBase['TableSection'] =
  React.forwardRef((props, ref) => <thead {...props} ref={ref} />);
TableTheadElementBase.displayName = 'TableThead';

export const TableTbodyElementBase: ElementsBase['TableSection'] =
  React.forwardRef((props, ref) => <tbody {...props} ref={ref} />);
TableTbodyElementBase.displayName = 'TableTbody';

export const TableTfootElementBase: ElementsBase['TableSection'] =
  React.forwardRef((props, ref) => <tfoot {...props} ref={ref} />);
TableTfootElementBase.displayName = 'TableTfoot';

export const ViewElementBase: ElementsBase['View'] = React.forwardRef(
  (props, ref) => <div {...props} ref={ref} />
);
ViewElementBase.displayName = 'View';
