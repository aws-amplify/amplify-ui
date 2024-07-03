import {
  ButtonElementBase,
  TableElementBase,
  TableCaptionElementBase,
  TableColElementBase,
  TableRowElementBase,
  TableBodyElementBase,
  TableCellElementBase,
  TableFootElementBase,
  TableHeaderElementBase,
  TableHeadElementBase,
  ViewElementBase,
  createElementsContext,
  ElementsBase,
} from '@aws-amplify/ui-react/internal';

export interface StorageBrowserElements
  extends Pick<
    ElementsBase,
    | 'Button'
    | 'Table'
    | 'Caption'
    | 'Col'
    | 'Tr'
    | 'Tbody'
    | 'Td'
    | 'Tfoot'
    | 'Th'
    | 'Thead'
    | 'View'
  > {}

const defaultValue: StorageBrowserElements = {
  Button: ButtonElementBase,
  Table: TableElementBase,
  Caption: TableCaptionElementBase,
  Col: TableColElementBase,
  Tr: TableRowElementBase,
  Tbody: TableBodyElementBase,
  Td: TableCellElementBase,
  Tfoot: TableFootElementBase,
  Th: TableHeaderElementBase,
  Thead: TableHeadElementBase,
  View: ViewElementBase,
};

export const { ElementsProvider, useElement } =
  createElementsContext(defaultValue);
