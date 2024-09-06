import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';
import { IconElement } from './IconElement';

export interface StorageBrowserElements {
  Button: typeof ButtonElement;
  DefinitionList: typeof DefinitionListElement;
  DefinitionTerm: typeof DefinitionTermElement;
  DefinitionDetail: typeof DefinitionDetailElement;
  Heading: typeof HeadingElement;
  Icon: typeof IconElement;
  Input: typeof InputElement;
  Label: typeof LabelElement;
  ListItem: typeof ListItemElement;
  Nav: typeof NavElement;
  OrderedList: typeof OrderedListElement;
  ProgressBar: typeof ProgressBarElement;
  Span: typeof SpanElement;
  Table: typeof TableElement;
  TableBody: typeof TableBodyElement;
  TableData: typeof TableDataElement;
  TableHead: typeof TableHeadElement;
  TableHeader: typeof TableHeaderElement;
  TableRow: typeof TableRowElement;
  Text: typeof TextElement;
  UnorderedList: typeof UnorderedListElement;
  View: typeof ViewElement;
}

export type PaginateVariant = `paginate-${'next' | 'current' | 'previous'}`;
export type MessageVariant = 'info' | 'success' | 'error' | 'warning';

export type ButtonElementVariant =
  | 'actions-menu-item'
  | 'actions-menu-toggle'
  | 'action-submit'
  | 'add-files'
  | 'add-folder'
  | 'cancel'
  | 'download'
  | 'exit'
  | 'message-dismiss'
  | 'navigate'
  | 'primary'
  | 'refresh'
  | 'search-submit'
  | 'sort'
  | 'table-data'
  | PaginateVariant;

export interface DefinitionListElementProps
  extends React.ComponentProps<typeof DefinitionListElement> {}
export const DefinitionListElement = defineBaseElement({
  type: 'dl',
  displayName: 'DefinitionList',
});

export interface DefinitionTermElementProps
  extends React.ComponentProps<typeof DefinitionTermElement> {}
export const DefinitionTermElement = defineBaseElement({
  type: 'dt',
  displayName: 'DefinitionTerm',
});

export interface DefinitionDetailElementProps
  extends React.ComponentProps<typeof DefinitionDetailElement> {}
export const DefinitionDetailElement = defineBaseElement({
  type: 'dd',
  displayName: 'DefinitionDetail',
});

export interface LabelElementProps
  extends React.ComponentProps<typeof LabelElement> {}
export const LabelElement = defineBaseElement<'label', 'htmlFor'>({
  type: 'label',
  displayName: 'Label',
});

export interface NavElementProps
  extends React.ComponentProps<typeof NavElement> {}
export const NavElement = defineBaseElement({
  type: 'nav',
  displayName: 'Nav',
});

export interface TextElementProps
  extends React.ComponentProps<typeof TextElement> {}
export const TextElement = defineBaseElement<'p', 'id'>({
  type: 'p',
  displayName: 'Text',
});

export interface OrderedListElementProps
  extends React.ComponentProps<typeof OrderedListElement> {}

export interface OrderedListElementProps
  extends React.ComponentProps<typeof OrderedListElement> {}
export const OrderedListElement = defineBaseElement({
  type: 'ol',
  displayName: 'OrderedList',
});

export interface UnorderedListElementProps
  extends React.ComponentProps<typeof UnorderedListElement> {}
export const UnorderedListElement = defineBaseElement({
  type: 'ul',
  displayName: 'UnorderedList',
});

export interface ListItemElementProps
  extends React.ComponentProps<typeof ListItemElement> {}
export const ListItemElement = defineBaseElement({
  type: 'li',
  displayName: 'ListItem',
});

export interface TableElementProps
  extends React.ComponentProps<typeof TableElement> {}
export const TableElement = defineBaseElement({
  type: 'table',
  displayName: 'Table',
});

export interface TableDataElementProps
  extends React.ComponentProps<typeof TableDataElement> {}
export const TableDataElement = defineBaseElement({
  type: 'td',
  displayName: 'TableData',
});

export interface TableRowElementProps
  extends React.ComponentProps<typeof TableRowElement> {}
export const TableRowElement = defineBaseElement({
  type: 'tr',
  displayName: 'TableRow',
});

export interface TableHeaderElementProps
  extends React.ComponentProps<typeof TableHeaderElement> {}
export const TableHeaderElement = defineBaseElement({
  type: 'th',
  displayName: 'TableHeader',
});

export interface TableHeadElementProps
  extends React.ComponentProps<typeof TableHeadElement> {}
export const TableHeadElement = defineBaseElement({
  type: 'thead',
  displayName: 'TableHead',
});

export interface TableBodyElementProps
  extends React.ComponentProps<typeof TableBodyElement> {}
export const TableBodyElement = defineBaseElement({
  type: 'tbody',
  displayName: 'TableBody',
});

export interface HeadingElementProps
  extends React.ComponentProps<typeof HeadingElement> {}
export const HeadingElement = defineBaseElement({
  type: 'h2',
  displayName: 'Title',
});

export interface ProgressBarElementProps
  extends React.ComponentProps<typeof ProgressBarElement> {}
export const ProgressBarElement = defineBaseElement({
  type: 'svg',
  displayName: 'ProgressBar',
});

export type InputElementProps = React.ComponentProps<typeof InputElement>;
export const InputElement = defineBaseElement<
  'input',
  | 'disabled'
  | 'type'
  | 'id'
  | 'onBlur'
  | 'onChange'
  | 'onFocus'
  | 'defaultChecked'
>({
  type: 'input',
  displayName: 'Input',
});

export interface ButtonElementProps
  extends React.ComponentProps<typeof ButtonElement> {}
export const ButtonElement = defineBaseElement<
  'button',
  'disabled' | 'onClick' | 'role' | 'type' | 'value',
  ButtonElementVariant
>({ type: 'button', displayName: 'Button' });

export interface ViewElementProps
  extends React.ComponentProps<typeof ViewElement> {}
export const ViewElement = defineBaseElement<'div', 'id' | 'role'>({
  type: 'div',
  displayName: 'View',
});

export interface SpanElementProps
  extends React.ComponentProps<typeof SpanElement> {}
export const SpanElement = defineBaseElement<'span', 'id'>({
  type: 'span',
  displayName: 'Span',
});

export const StorageBrowserElements: StorageBrowserElements = {
  Button: ButtonElement,
  DefinitionList: DefinitionListElement,
  DefinitionTerm: DefinitionTermElement,
  DefinitionDetail: DefinitionDetailElement,
  Heading: HeadingElement,
  Icon: IconElement,
  Input: InputElement,
  Label: LabelElement,
  ListItem: ListItemElement,
  Nav: NavElement,
  OrderedList: OrderedListElement,
  ProgressBar: ProgressBarElement,
  Span: SpanElement,
  Table: TableElement,
  TableBody: TableBodyElement,
  TableData: TableDataElement,
  TableHead: TableHeadElement,
  TableHeader: TableHeaderElement,
  TableRow: TableRowElement,
  Text: TextElement,
  UnorderedList: UnorderedListElement,
  View: ViewElement,
};
