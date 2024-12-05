import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';
import { IconElement } from './IconElement';

export interface StorageBrowserElements {
  Button: typeof ButtonElement;
  DescriptionList: typeof DescriptionListElement;
  DescriptionTerm: typeof DescriptionTermElement;
  DescriptionDetails: typeof DescriptionDetailsElement;
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
  TableData: typeof TableDataCellElement;
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
  | 'menu-item'
  | 'menu-toggle'
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

export interface DescriptionListElementProps
  extends React.ComponentProps<typeof DescriptionListElement> {}
export const DescriptionListElement = defineBaseElement<'dl', 'id' | 'role'>({
  type: 'dl',
  displayName: 'DescriptionList',
});

export interface DescriptionTermElementProps
  extends React.ComponentProps<typeof DescriptionTermElement> {}
export const DescriptionTermElement = defineBaseElement<'dt', 'id' | 'role'>({
  type: 'dt',
  displayName: 'DescriptionTerm',
});

export interface DescriptionDetailsElementProps
  extends React.ComponentProps<typeof DescriptionDetailsElement> {}
export const DescriptionDetailsElement = defineBaseElement<'dd', 'id' | 'role'>(
  {
    type: 'dd',
    displayName: 'DescriptionDetails',
  }
);

export interface LabelElementProps
  extends React.ComponentProps<typeof LabelElement> {}
export const LabelElement = defineBaseElement<'label', 'htmlFor'>({
  type: 'label',
  displayName: 'Label',
});

export interface NavElementProps
  extends React.ComponentProps<typeof NavElement> {}
export const NavElement = defineBaseElement<'nav', 'role'>({
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
export const UnorderedListElement = defineBaseElement<'ul', 'role'>({
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

export interface TableDataCellElementProps
  extends React.ComponentProps<typeof TableDataCellElement> {}
export const TableDataCellElement = defineBaseElement({
  type: 'td',
  displayName: 'TableDataCell',
});

export interface TableRowElementProps
  extends React.ComponentProps<typeof TableRowElement> {}
export const TableRowElement = defineBaseElement({
  type: 'tr',
  displayName: 'TableRow',
});

export interface TableHeaderElementProps
  extends React.ComponentProps<typeof TableHeaderElement> {}
export const TableHeaderElement = defineBaseElement<'th', 'role'>({
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
  | 'checked'
  | 'defaultChecked'
  | 'placeholder'
  | 'value'
  | 'onKeyUp'
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
export const SpanElement = defineBaseElement<'span', 'id' | 'title'>({
  type: 'span',
  displayName: 'Span',
});

export const StorageBrowserElements: StorageBrowserElements = {
  Button: ButtonElement,
  DescriptionList: DescriptionListElement,
  DescriptionTerm: DescriptionTermElement,
  DescriptionDetails: DescriptionDetailsElement,
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
  TableData: TableDataCellElement,
  TableHead: TableHeadElement,
  TableHeader: TableHeaderElement,
  TableRow: TableRowElement,
  Text: TextElement,
  UnorderedList: UnorderedListElement,
  View: ViewElement,
};
