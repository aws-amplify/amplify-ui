import { defineBaseElement } from '@aws-amplify/ui-react-core/elements';

export interface StorageBrowserElements {
  Button: typeof ButtonElement;
  Divider: typeof DividerElement;
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

type IconVariant =
  | 'action-queued'
  | 'action-progress'
  | 'action-canceled'
  | 'action-success'
  | 'action-error'
  | 'download'
  | 'file'
  | 'folder'
  | 'menu'
  | 'paginate-next'
  | 'paginate-previous'
  | 'refresh'
  | 'search'
  | 'sort-ascending'
  | 'sort-descending'
  | 'sort-indeterminate'
  | 'vertical-kebab';

export const LabelElement = defineBaseElement({
  type: 'label',
  displayName: 'Label',
});

export const NavElement = defineBaseElement({
  type: 'nav',
  displayName: 'Nav',
});

export const DividerElement = defineBaseElement({
  type: 'hr',
  displayName: 'Divider',
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

export const IconElement = defineBaseElement<'svg', never, IconVariant>({
  type: 'svg',
  displayName: 'Icon',
});

export const ProgressBarElement = defineBaseElement({
  type: 'svg',
  displayName: 'ProgressBar',
});

export const InputElement = defineBaseElement<'input', 'type'>({
  type: 'input',
  displayName: 'Input',
});

type ButtonElementProps = 'onClick' | 'type';
type ButtonElementVariant = 'action-submit' | 'search-submit';

export const ButtonElement = defineBaseElement<
  'button',
  ButtonElementProps,
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
  Divider: DividerElement,
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

export const StorageBrowserElementsDefault = {
  Button: ButtonElement,
  Divider: DividerElement,
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
