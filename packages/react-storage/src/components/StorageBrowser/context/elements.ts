import {
  ButtonElementBase,
  TableElementBase,
  TableCaptionElementBase,
  TableColElementBase,
  TableRowElementBase,
  TableTbodyElementBase,
  TableTdElementBase,
  TableTfootElementBase,
  TableThElementBase,
  TableTheadElementBase,
  ViewElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface StorageBrowserElements
  extends Pick<
    ElementsBase,
    | 'Button'
    | 'Table'
    | 'TableCaption'
    | 'TableCol'
    | 'TableRow'
    | 'TableTbody'
    | 'TableTd'
    | 'TableTfoot'
    | 'TableTh'
    | 'TableThead'
    | 'View'
  > {}

const defaultValue: StorageBrowserElements = {
  Button: ButtonElementBase,
  Table: TableElementBase,
  TableCaption: TableCaptionElementBase,
  TableCol: TableColElementBase,
  TableRow: TableRowElementBase,
  TableTbody: TableTbodyElementBase,
  TableTd: TableTdElementBase,
  TableTfoot: TableTfootElementBase,
  TableTh: TableThElementBase,
  TableThead: TableTheadElementBase,
  View: ViewElementBase,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
