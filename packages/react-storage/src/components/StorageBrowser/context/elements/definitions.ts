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
export type ActionVariant = 'upload-folder' | 'upload-file';
export type PaginateVariant = `paginate-${'next' | 'current' | 'previous'}`;
export type MessageVariant = 'info' | 'success' | 'error' | 'warning';
export type IconElementProps = React.ComponentProps<typeof IconElement>;

export type ButtonElementProps = React.ComponentProps<typeof ButtonElement>;
type ButtonElementVariant = 'action-submit' | 'search-submit' | PaginateVariant;

export type ListItemVariant = PaginateVariant;

export const DefinitionListElement = defineBaseElement({
  type: 'dl',
  displayName: 'DefinitionList',
});

export const DefinitionTermElement = defineBaseElement({
  type: 'dt',
  displayName: 'DefinitionTerm',
});

export const DefinitionDetailElement = defineBaseElement({
  type: 'dd',
  displayName: 'DefinitionDetail',
});

export const LabelElement = defineBaseElement<'label', 'htmlFor'>({
  type: 'label',
  displayName: 'Label',
});

export const NavElement = defineBaseElement({
  type: 'nav',
  displayName: 'Nav',
});

export const TextElement = defineBaseElement({
  type: 'p',
  displayName: 'Text',
});

export const OrderedListElement = defineBaseElement({
  type: 'ol',
  displayName: 'OrderedList',
});

export const UnorderedListElement = defineBaseElement({
  type: 'ul',
  displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElement({
  type: 'li',
  displayName: 'ListItem',
});

export const TableElement = defineBaseElement({
  type: 'table',
  displayName: 'Table',
});

export const TableDataElement = defineBaseElement({
  type: 'td',
  displayName: 'TableData',
});

export const TableRowElement = defineBaseElement({
  type: 'tr',
  displayName: 'TableRow',
});

export const TableHeaderElement = defineBaseElement({
  type: 'th',
  displayName: 'TableHeader',
});

export const TableHeadElement = defineBaseElement({
  type: 'thead',
  displayName: 'TableHead',
});

export const TableBodyElement = defineBaseElement({
  type: 'tbody',
  displayName: 'TableBody',
});

export const HeadingElement = defineBaseElement({
  type: 'h2',
  displayName: 'Title',
});

export const ProgressBarElement = defineBaseElement({
  type: 'svg',
  displayName: 'ProgressBar',
});

export const InputElement = defineBaseElement<'input', 'type' | 'id'>({
  type: 'input',
  displayName: 'Input',
});

export const ButtonElement = defineBaseElement<
  'button',
  'disabled' | 'onClick' | 'type',
  ButtonElementVariant
>({ type: 'button', displayName: 'Button' });

export const ViewElement = defineBaseElement({
  type: 'div',
  displayName: 'View',
});

export const SpanElement = defineBaseElement({
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
