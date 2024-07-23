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

export type PaginateVariant = `paginate-${'next' | 'current' | 'previous'}`;
export type IconVariant =
  | 'action-queued'
  | 'action-progress'
  | 'action-canceled'
  | 'action-success'
  | 'action-error'
  | 'download'
  | 'file'
  | 'folder'
  | 'menu'
  | Exclude<PaginateVariant, 'paginate-current'>
  | 'refresh'
  | 'search'
  | 'sort-ascending'
  | 'sort-descending'
  | 'sort-indeterminate'
  | 'vertical-kebab';

export type IconElementProps = React.ComponentProps<typeof IconElement>;

export const DEFAULT_ICON_PATHS: Record<IconVariant, string> = {
  'action-queued':
    'M280-420q25 0 42.5-17.5T340-480q0-25-17.5-42.5T280-540q-25 0-42.5 17.5T220-480q0 25 17.5 42.5T280-420Zm200 0q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm200 0q25 0 42.5-17.5T740-480q0-25-17.5-42.5T680-540q-25 0-42.5 17.5T620-480q0 25 17.5 42.5T680-420ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  'action-progress':
    'M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z',
  'action-canceled':
    'M280-440h400v-80H280v80ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  'action-success':
    'm424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  'action-error':
    'm336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z',
  download:
    'M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z',
  file: 'M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z',
  folder:
    'M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z',
  menu: '',
  'paginate-next':
    'M9.99984 6L8.58984 7.41L13.1698 12L8.58984 16.59L9.99984 18L15.9998 12L9.99984 6Z',
  'paginate-previous':
    'M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z',
  refresh:
    'M480-160q-134 0-227-93t-93-227q0-134 93-227t227-93q69 0 132 28.5T720-690v-110h80v280H520v-80h168q-32-56-87.5-88T480-720q-100 0-170 70t-70 170q0 100 70 170t170 70q77 0 139-44t87-116h84q-28 106-114 173t-196 67Z',
  search:
    'M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z',
  'sort-ascending': 'm280-400 200-200 200 200H280Z',
  'sort-descending': 'M480-360 280-560h400L480-360Z',
  'sort-indeterminate': 'M240-440v-80h480v80H240Z',
  'vertical-kebab':
    'M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z',
};

export type ButtonElementProps = React.ComponentProps<typeof ButtonElement>;
type ButtonElementVariant = 'action-submit' | 'search-submit' | PaginateVariant;

export type ListItemVariant = PaginateVariant;

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

export const IconElement = defineBaseElement({
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
