import {
  defineBaseElement,
  defineBaseElementWithRef,
} from '@aws-amplify/ui-react-core/elements';
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
export type ActionVariant = 'upload-folder' | 'upload-file' | 'create-folder';
export type PaginateVariant = `paginate-${'next' | 'current' | 'previous'}`;
export type MessageVariant = 'info' | 'success' | 'error' | 'warning';
export type IconElementProps = React.ComponentProps<typeof IconElement>;

export type ButtonElementProps = React.ComponentProps<typeof ButtonElement>;
type ButtonElementVariant =
  | 'action-select-item'
  | 'action-select-toggle'
  | 'action-submit'
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

export const TestButton = defineBaseElement({
  type: 'button',
  displayName: 'Button',
});

export const DefinitionListElement = defineBaseElementWithRef({
  type: 'dl',
  displayName: 'DefinitionList',
});

export const DefinitionTermElement = defineBaseElementWithRef({
  type: 'dt',
  displayName: 'DefinitionTerm',
});

export const DefinitionDetailElement = defineBaseElementWithRef({
  type: 'dd',
  displayName: 'DefinitionDetail',
});

export const LabelElement = defineBaseElementWithRef<'label', 'htmlFor'>({
  type: 'label',
  displayName: 'Label',
});

export const NavElement = defineBaseElement({
  type: 'nav',
  displayName: 'Nav',
});

export const TextElement = defineBaseElementWithRef<'p', 'id'>({
  type: 'p',
  displayName: 'Text',
});

export const OrderedListElement = defineBaseElementWithRef({
  type: 'ol',
  displayName: 'OrderedList',
});

export const UnorderedListElement = defineBaseElementWithRef({
  type: 'ul',
  displayName: 'UnorderedList',
});

export const ListItemElement = defineBaseElementWithRef({
  type: 'li',
  displayName: 'ListItem',
});

export const TableElement = defineBaseElementWithRef({
  type: 'table',
  displayName: 'Table',
});

export const TableDataElement = defineBaseElementWithRef({
  type: 'td',
  displayName: 'TableData',
});

export const TableRowElement = defineBaseElementWithRef({
  type: 'tr',
  displayName: 'TableRow',
});

export const TableHeaderElement = defineBaseElementWithRef({
  type: 'th',
  displayName: 'TableHeader',
});

export const TableHeadElement = defineBaseElementWithRef({
  type: 'thead',
  displayName: 'TableHead',
});

export const TableBodyElement = defineBaseElementWithRef({
  type: 'tbody',
  displayName: 'TableBody',
});

export const HeadingElement = defineBaseElementWithRef({
  type: 'h2',
  displayName: 'Title',
});

export const ProgressBarElement = defineBaseElementWithRef({
  type: 'svg',
  displayName: 'ProgressBar',
});

export const InputElement = defineBaseElementWithRef<
  'input',
  'disabled' | 'type' | 'id' | 'onBlur' | 'onFocus'
>({
  type: 'input',
  displayName: 'Input',
});

export const ButtonElement = defineBaseElementWithRef<
  'button',
  'disabled' | 'onClick' | 'role' | 'type',
  ButtonElementVariant
>({ type: 'button', displayName: 'Button' });

export const ViewElement = defineBaseElementWithRef<'div', 'id'>({
  type: 'div',
  displayName: 'View',
});

export const SpanElement = defineBaseElementWithRef({
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
