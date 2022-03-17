## Button Props

### GridItemStyleProps

| name        | type                             | default | description |
| ----------- | -------------------------------- | ------- | ----------- |
| area        | ResponsiveStyle<GridArea>        |         |             |
| column      | ResponsiveStyle<GridColumn>      |         |             |
| columnEnd   | ResponsiveStyle<GridColumnEnd>   |         |             |
| columnSpan  | ResponsiveStyle<GridSpanType>    |         |             |
| columnStart | ResponsiveStyle<GridColumnStart> |         |             |
| row         | ResponsiveStyle<GridRow>         |         |             |
| rowEnd      | ResponsiveStyle<GridRowEnd>      |         |             |
| rowSpan     | ResponsiveStyle<GridSpanType>    |         |             |
| rowStart    | ResponsiveStyle<GridRowStart>    |         |             |

### ButtonHTMLAttributes

| name           | type             | default           | description |
| -------------- | ---------------- | ----------------- | ----------- | --- |
| form           | string           |                   |             |
| autoFocus      | boolean          |                   |             |
| disabled       | boolean          |                   |             |
| formAction     | string           |                   |             |
| formEncType    | string           |                   |             |
| formMethod     | string           |                   |             |
| formNoValidate | boolean          |                   |             |
| formTarget     | string           |                   |             |
| name           | string           |                   |             |
| value          | string \| number | readonly string[] |             |     |

### HTMLAttributes

| name                                                                                                   | type                    | default           | description                                                                               |
| ------------------------------------------------------------------------------------------------------ | ----------------------- | ----------------- | ----------------------------------------------------------------------------------------- | ----- | ------- | --------- | --------- | --- | ----------------------------------------------------------------------------------------------------- |
| slot                                                                                                   | string                  |                   |                                                                                           |
| title                                                                                                  | string                  |                   |                                                                                           |
| defaultChecked                                                                                         | boolean                 |                   |                                                                                           |
| defaultValue                                                                                           | string \| number        | readonly string[] |                                                                                           |       |
| suppressContentEditableWarning                                                                         | boolean                 |                   |                                                                                           |
| suppressHydrationWarning                                                                               | boolean                 |                   |                                                                                           |
| accessKey                                                                                              | string                  |                   |                                                                                           |
| contentEditable                                                                                        | Booleanish \| "inherit" |                   |                                                                                           |
| contextMenu                                                                                            | string                  |                   |                                                                                           |
| dir                                                                                                    | string                  |                   |                                                                                           |
| draggable                                                                                              | Booleanish              |                   |                                                                                           |
| hidden                                                                                                 | boolean                 |                   |                                                                                           |
| lang                                                                                                   | string                  |                   |                                                                                           |
| placeholder                                                                                            | string                  |                   |                                                                                           |
| spellCheck                                                                                             | Booleanish              |                   |                                                                                           |
| tabIndex                                                                                               | number                  |                   |                                                                                           |
| translate                                                                                              | "yes" \| "no"           |                   |                                                                                           |
| radioGroup                                                                                             | string                  |                   |                                                                                           |
| about                                                                                                  | string                  |                   |                                                                                           |
| datatype                                                                                               | string                  |                   |                                                                                           |
| inlist                                                                                                 | any                     |                   |                                                                                           |
| prefix                                                                                                 | string                  |                   |                                                                                           |
| property                                                                                               | string                  |                   |                                                                                           |
| resource                                                                                               | string                  |                   |                                                                                           |
| typeof                                                                                                 | string                  |                   |                                                                                           |
| vocab                                                                                                  | string                  |                   |                                                                                           |
| autoCapitalize                                                                                         | string                  |                   |                                                                                           |
| autoCorrect                                                                                            | string                  |                   |                                                                                           |
| autoSave                                                                                               | string                  |                   |                                                                                           |
| itemProp                                                                                               | string                  |                   |                                                                                           |
| itemScope                                                                                              | boolean                 |                   |                                                                                           |
| itemType                                                                                               | string                  |                   |                                                                                           |
| itemID                                                                                                 | string                  |                   |                                                                                           |
| itemRef                                                                                                | string                  |                   |                                                                                           |
| results                                                                                                | number                  |                   |                                                                                           |
| security                                                                                               | string                  |                   |                                                                                           |
| unselectable                                                                                           | "on" \| "off"           |                   |                                                                                           |
| inputMode                                                                                              | "text" \| "search"      | "none"            | "tel"                                                                                     | "url" | "email" | "numeric" | "decimal" |     | Hints at the type of data that might be entered by the user while editing the element or its contents |
| @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute |
| is                                                                                                     | string                  |                   | Specify that a standard HTML element should behave like a defined custom built-in element |
| @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is                               |

### ViewProps

| name  | type          | default | description |
| ----- | ------------- | ------- | ----------- |
| style | CSSProperties |         |             |

### TypeLiteral

| name | type        | default | description |
| ---- | ----------- | ------- | ----------- |
| as   | ElementType |         |             |

### ButtonProps

| name                                            | type                                 | default  | description                                                         |
| ----------------------------------------------- | ------------------------------------ | -------- | ------------------------------------------------------------------- |
| isDisabled                                      | boolean                              |          | If `true`, the button will be disabled.                             |
| type                                            | ButtonTypes                          | button   | Changes the button type                                             |
| onClick                                         | MouseEventHandler<HTMLButtonElement> |          | Button click event handler                                          |
| isFullWidth                                     | boolean                              | false    | If `true`, the button will take up the full width of its container. |
| isLoading                                       | boolean                              |          | If `true`, the button will show a spinner.                          |
| loadingText                                     | string                               |          | The label to show in the button when `loading` is true              |
| If no text is passed, it only shows the spinner |
| size                                            | Sizes                                | "medium" | Changes the size of the button.                                     |
| variation                                       | ButtonVariations                     |          | Changes the visual weight of the button.                            |

### BaseComponentProps

| name      | type   | default | description                                                    |
| --------- | ------ | ------- | -------------------------------------------------------------- |
| id        | string |         | Unique identifier                                              |
| className | string |         | Additional CSS class name for component                        |
| testId    | string |         | Used to provide a `data-testid` attribute for testing purposes |

### BaseStyleProps

| name               | type                                                                | default | description |
| ------------------ | ------------------------------------------------------------------- | ------- | ----------- |
| alignSelf          | ResponsiveStyle<StyleToken<AlignSelf>>                              |         |             |
| backgroundColor    | ResponsiveStyle<StyleToken<BackgroundColor>>                        |         |             |
| backgroundImage    | ResponsiveStyle<StyleToken<BackgroundImage>>                        |         |             |
| border             | ResponsiveStyle<StyleToken<Border<0 \| (string & {})>>>             |         |             |
| borderRadius       | ResponsiveStyle<StyleToken<BorderRadius<0 \| (string & {})>>>       |         |             |
| bottom             | ResponsiveStyle<StyleToken<Bottom<0 \| (string & {})>>>             |         |             |
| boxShadow          | ResponsiveStyle<StyleToken<BoxShadow>>                              |         |             |
| color              | ResponsiveStyle<StyleToken<Color>>                                  |         |             |
| display            | ResponsiveStyle<StyleToken<Display>>                                |         |             |
| fontFamily         | ResponsiveStyle<StyleToken<FontFamily>>                             |         |             |
| fontSize           | ResponsiveStyle<StyleToken<FontSize<0 \| (string & {})>>>           |         |             |
| fontStyle          | ResponsiveStyle<StyleToken<FontStyle>>                              |         |             |
| fontWeight         | ResponsiveStyle<StyleToken<FontWeight>>                             |         |             |
| height             | ResponsiveStyle<StyleToken<Height<0 \| (string & {})>>>             |         |             |
| left               | ResponsiveStyle<StyleToken<Left<0 \| (string & {})>>>               |         |             |
| letterSpacing      | ResponsiveStyle<StyleToken<LetterSpacing<0 \| (string & {})>>>      |         |             |
| lineHeight         | ResponsiveStyle<StyleToken<LineHeight<0 \| (string & {})>>>         |         |             |
| margin             | ResponsiveStyle<StyleToken<Margin<0 \| (string & {})>>>             |         |             |
| marginBlockEnd     | ResponsiveStyle<StyleToken<MarginBlockEnd<0 \| (string & {})>>>     |         |             |
| marginBlockStart   | ResponsiveStyle<StyleToken<MarginBlockStart<0 \| (string & {})>>>   |         |             |
| marginBottom       | ResponsiveStyle<StyleToken<MarginBlockEnd<0 \| (string & {})>>>     |         |             |
| marginInlineEnd    | ResponsiveStyle<StyleToken<MarginInlineEnd<0 \| (string & {})>>>    |         |             |
| marginInlineStart  | ResponsiveStyle<StyleToken<MarginInlineStart<0 \| (string & {})>>>  |         |             |
| marginLeft         | ResponsiveStyle<StyleToken<MarginInlineStart<0 \| (string & {})>>>  |         |             |
| marginRight        | ResponsiveStyle<StyleToken<MarginInlineEnd<0 \| (string & {})>>>    |         |             |
| marginTop          | ResponsiveStyle<StyleToken<MarginBlockStart<0 \| (string & {})>>>   |         |             |
| maxHeight          | ResponsiveStyle<StyleToken<MaxHeight<0 \| (string & {})>>>          |         |             |
| maxWidth           | ResponsiveStyle<StyleToken<MaxWidth<0 \| (string & {})>>>           |         |             |
| minHeight          | ResponsiveStyle<StyleToken<MinHeight<0 \| (string & {})>>>          |         |             |
| minWidth           | ResponsiveStyle<StyleToken<MinWidth<0 \| (string & {})>>>           |         |             |
| opacity            | ResponsiveStyle<StyleToken<Opacity>>                                |         |             |
| overflow           | ResponsiveStyle<StyleToken<Overflow>>                               |         |             |
| padding            | ResponsiveStyle<StyleToken<Padding<0 \| (string & {})>>>            |         |             |
| paddingBlockEnd    | ResponsiveStyle<StyleToken<MarginBlockEnd<0 \| (string & {})>>>     |         |             |
| paddingBlockStart  | ResponsiveStyle<StyleToken<MarginBlockStart<0 \| (string & {})>>>   |         |             |
| paddingBottom      | ResponsiveStyle<StyleToken<PaddingBlockEnd<0 \| (string & {})>>>    |         |             |
| paddingInlineEnd   | ResponsiveStyle<StyleToken<MarginInlineEnd<0 \| (string & {})>>>    |         |             |
| paddingInlineStart | ResponsiveStyle<StyleToken<MarginInlineStart<0 \| (string & {})>>>  |         |             |
| paddingLeft        | ResponsiveStyle<StyleToken<PaddingInlineStart<0 \| (string & {})>>> |         |             |
| paddingRight       | ResponsiveStyle<StyleToken<PaddingInlineEnd<0 \| (string & {})>>>   |         |             |
| paddingTop         | ResponsiveStyle<StyleToken<PaddingBlockStart<0 \| (string & {})>>>  |         |             |
| position           | ResponsiveStyle<StyleToken<Position>>                               |         |             |
| right              | ResponsiveStyle<StyleToken<Right<0 \| (string & {})>>>              |         |             |
| textAlign          | ResponsiveStyle<StyleToken<TextAlign>>                              |         |             |
| textDecoration     | ResponsiveStyle<StyleToken<TextDecoration<0 \| (string & {})>>>     |         |             |
| textTransform      | ResponsiveStyle<StyleToken<TextTransform>>                          |         |             |
| top                | ResponsiveStyle<StyleToken<Top<0 \| (string & {})>>>                |         |             |
| transform          | ResponsiveStyle<StyleToken<Transform>>                              |         |             |
| transformOrigin    | ResponsiveStyle<StyleToken<TransformOrigin<0 \| (string & {})>>>    |         |             |
| width              | ResponsiveStyle<StyleToken<Width<0 \| (string & {})>>>              |         |             |
| whiteSpace         | ResponsiveStyle<StyleToken<WhiteSpace>>                             |         |             |

### FlexItemStyleProps

| name   | type                                           | default | description                                                   |
| ------ | ---------------------------------------------- | ------- | ------------------------------------------------------------- |
| flex   | ResponsiveStyle<Flex<0 \| (string & {})>>      |         | Shorthand for flex grow / shrink / basis                      |
| order  | ResponsiveStyle<Order>                         |         | Controls order flex items appear                              |
| grow   | ResponsiveStyle<FlexGrow>                      |         | Ability for flex item to grow                                 |
| shrink | ResponsiveStyle<FlexShrink>                    |         | Ability for flex item to shrink                               |
| basis  | ResponsiveStyle<FlexBasis<0 \| (string & {})>> |         | Default size of element before remaining space is distributed |

### AriaProps

| name          | type           | default | description |
| ------------- | -------------- | ------- | ----------- |
| ariaLabel     | string         |         |             |
| ariaValuetext | string         |         |             |
| role          | React.AriaRole |         |             |

### Attributes

| name | type | default | description |
| ---- | ---- | ------- | ----------- |
| key  | Key  |         |             |

### AriaAttributes

| name                        | type              | default  | description                                                                                                                                                               |
| --------------------------- | ----------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| aria-activedescendant       | string            |          | Identifies the currently active element when DOM focus is on a composite widget, textbox, group, or application.                                                          |
| aria-atomic                 | Booleanish        |          | Indicates whether assistive technologies will present all, or only parts of, the changed region based on the change notifications defined by the aria-relevant attribute. |
| aria-autocomplete           | "list" \| "none"  | "inline" | "both"                                                                                                                                                                    |     | Indicates whether inputting text could trigger display of one or more predictions of the user's intended value for an input and specifies how predictions would be |
| presented if they are made. |
| aria-busy                   | Booleanish        |          | Indicates an element is being modified and that assistive technologies MAY want to wait until the modifications are complete before exposing them to the user.            |
| aria-checked                | boolean \| "true" | "false"  | "mixed"                                                                                                                                                                   |     | Indicates the current "checked" state of checkboxes, radio buttons, and other widgets.                                                                             |

@see aria-pressed
@see aria-selected. |
| aria-colcount | number | | Defines the total number of columns in a table, grid, or treegrid.
@see aria-colindex. |
| aria-colindex | number | | Defines an element's column index or position with respect to the total number of columns within a table, grid, or treegrid.
@see aria-colcount
@see aria-colspan. |
| aria-colspan | number | | Defines the number of columns spanned by a cell or gridcell within a table, grid, or treegrid.
@see aria-colindex
@see aria-rowspan. |
| aria-controls | string | | Identifies the element (or elements) whose contents or presence are controlled by the current element.
@see aria-owns. |
| aria-current | boolean \| "time" | "true" | "false" | "page" | "step" | "location" | "date" | | Indicates the element that represents the current item within a container or set of related elements. |
| aria-describedby | string | | Identifies the element (or elements) that describes the object.
@see aria-labelledby |
| aria-details | string | | Identifies the element that provides a detailed, extended description for the object.
@see aria-describedby. |
| aria-disabled | Booleanish | | Indicates that the element is perceivable but disabled, so it is not editable or otherwise operable.
@see aria-hidden
@see aria-readonly. |
| aria-dropeffect | "link" \| "none" | "copy" | "execute" | "move" | "popup" | | Indicates what functions can be performed when a dragged object is released on the drop target.
@deprecated in ARIA 1.1 |
| aria-errormessage | string | | Identifies the element that provides an error message for the object.
@see aria-invalid
@see aria-describedby. |
| aria-expanded | Booleanish | | Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. |
| aria-flowto | string | | Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
allows assistive technology to override the general default of reading in document source order. |
| aria-grabbed | Booleanish | | Indicates an element's "grabbed" state in a drag-and-drop operation.
@deprecated in ARIA 1.1 |
| aria-haspopup | boolean \| "dialog" | "menu" | "true" | "false" | "grid" | "listbox" | "tree" | | Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. |
| aria-hidden | Booleanish | | Indicates whether the element is exposed to an accessibility API.
@see aria-disabled. |
| aria-invalid | boolean \| "true" | "false" | "grammar" | "spelling" | | Indicates the entered value does not conform to the format expected by the application.
@see aria-errormessage. |
| aria-keyshortcuts | string | | Indicates keyboard shortcuts that an author has implemented to activate or give focus to an element. |
| aria-label | string | | Defines a string value that labels the current element.
@see aria-labelledby. |
| aria-labelledby | string | | Identifies the element (or elements) that labels the current element.
@see aria-describedby. |
| aria-level | number | | Defines the hierarchical level of an element within a structure. |
| aria-live | "off" \| "assertive" | "polite" | | Indicates that an element will be updated, and describes the types of updates the user agents, assistive technologies, and user can expect from the live region. |
| aria-modal | Booleanish | | Indicates whether an element is modal when displayed. |
| aria-multiline | Booleanish | | Indicates whether a text box accepts multiple lines of input or only a single line. |
| aria-multiselectable | Booleanish | | Indicates that the user may select more than one item from the current selectable descendants. |
| aria-orientation | "horizontal" \| "vertical" | | Indicates whether the element's orientation is horizontal, vertical, or unknown/ambiguous. |
| aria-owns | string | | Identifies an element (or elements) in order to define a visual, functional, or contextual parent/child relationship
between DOM elements where the DOM hierarchy cannot be used to represent the relationship.
@see aria-controls. |
| aria-placeholder | string | | Defines a short hint (a word or short phrase) intended to aid the user with data entry when the control has no value.
A hint could be a sample value or a brief description of the expected format. |
| aria-posinset | number | | Defines an element's number or position in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
@see aria-setsize. |
| aria-pressed | boolean \| "true" | "false" | "mixed" | | Indicates the current "pressed" state of toggle buttons.
@see aria-checked
@see aria-selected. |
| aria-readonly | Booleanish | | Indicates that the element is not editable, but is otherwise operable.
@see aria-disabled. |
| aria-relevant | "text" \| "additions" | "additions removals" | "additions text" | "all" | "removals" | "removals additions" | "removals text" | "text additions" | "text removals" | | Indicates what notifications the user agent will trigger when the accessibility tree within a live region is modified.
@see aria-atomic. |
| aria-required | Booleanish | | Indicates that user input is required on the element before a form may be submitted. |
| aria-roledescription | string | | Defines a human-readable, author-localized description for the role of an element. |
| aria-rowcount | number | | Defines the total number of rows in a table, grid, or treegrid.
@see aria-rowindex. |
| aria-rowindex | number | | Defines an element's row index or position with respect to the total number of rows within a table, grid, or treegrid.
@see aria-rowcount
@see aria-rowspan. |
| aria-rowspan | number | | Defines the number of rows spanned by a cell or gridcell within a table, grid, or treegrid.
@see aria-rowindex
@see aria-colspan. |
| aria-selected | Booleanish | | Indicates the current "selected" state of various widgets.
@see aria-checked
@see aria-pressed. |
| aria-setsize | number | | Defines the number of items in the current set of listitems or treeitems. Not required if all elements in the set are present in the DOM.
@see aria-posinset. |
| aria-sort | "none" \| "ascending" | "descending" | "other" | | Indicates if items in a table or grid are sorted in ascending or descending order. |
| aria-valuemax | number | | Defines the maximum allowed value for a range widget. |
| aria-valuemin | number | | Defines the minimum allowed value for a range widget. |
| aria-valuenow | number | | Defines the current value for a range widget.
@see aria-valuetext. |
| aria-valuetext | string | | Defines the human readable text alternative of aria-valuenow for a range widget. |

### DOMAttributes

| name                        | type                                       | default | description |
| --------------------------- | ------------------------------------------ | ------- | ----------- |
| dangerouslySetInnerHTML     | { \_\_html: string; }                      |         |             |
| onCopy                      | ClipboardEventHandler<HTMLButtonElement>   |         |             |
| onCopyCapture               | ClipboardEventHandler<HTMLButtonElement>   |         |             |
| onCut                       | ClipboardEventHandler<HTMLButtonElement>   |         |             |
| onCutCapture                | ClipboardEventHandler<HTMLButtonElement>   |         |             |
| onPaste                     | ClipboardEventHandler<HTMLButtonElement>   |         |             |
| onPasteCapture              | ClipboardEventHandler<HTMLButtonElement>   |         |             |
| onCompositionEnd            | CompositionEventHandler<HTMLButtonElement> |         |             |
| onCompositionEndCapture     | CompositionEventHandler<HTMLButtonElement> |         |             |
| onCompositionStart          | CompositionEventHandler<HTMLButtonElement> |         |             |
| onCompositionStartCapture   | CompositionEventHandler<HTMLButtonElement> |         |             |
| onCompositionUpdate         | CompositionEventHandler<HTMLButtonElement> |         |             |
| onCompositionUpdateCapture  | CompositionEventHandler<HTMLButtonElement> |         |             |
| onFocus                     | FocusEventHandler<HTMLButtonElement>       |         |             |
| onFocusCapture              | FocusEventHandler<HTMLButtonElement>       |         |             |
| onBlur                      | FocusEventHandler<HTMLButtonElement>       |         |             |
| onBlurCapture               | FocusEventHandler<HTMLButtonElement>       |         |             |
| onChange                    | FormEventHandler<HTMLButtonElement>        |         |             |
| onChangeCapture             | FormEventHandler<HTMLButtonElement>        |         |             |
| onBeforeInput               | FormEventHandler<HTMLButtonElement>        |         |             |
| onBeforeInputCapture        | FormEventHandler<HTMLButtonElement>        |         |             |
| onInput                     | FormEventHandler<HTMLButtonElement>        |         |             |
| onInputCapture              | FormEventHandler<HTMLButtonElement>        |         |             |
| onReset                     | FormEventHandler<HTMLButtonElement>        |         |             |
| onResetCapture              | FormEventHandler<HTMLButtonElement>        |         |             |
| onSubmit                    | FormEventHandler<HTMLButtonElement>        |         |             |
| onSubmitCapture             | FormEventHandler<HTMLButtonElement>        |         |             |
| onInvalid                   | FormEventHandler<HTMLButtonElement>        |         |             |
| onInvalidCapture            | FormEventHandler<HTMLButtonElement>        |         |             |
| onLoad                      | ReactEventHandler<HTMLButtonElement>       |         |             |
| onLoadCapture               | ReactEventHandler<HTMLButtonElement>       |         |             |
| onError                     | ReactEventHandler<HTMLButtonElement>       |         |             |
| onErrorCapture              | ReactEventHandler<HTMLButtonElement>       |         |             |
| onKeyDown                   | KeyboardEventHandler<HTMLButtonElement>    |         |             |
| onKeyDownCapture            | KeyboardEventHandler<HTMLButtonElement>    |         |             |
| onKeyPress                  | KeyboardEventHandler<HTMLButtonElement>    |         |             |
| onKeyPressCapture           | KeyboardEventHandler<HTMLButtonElement>    |         |             |
| onKeyUp                     | KeyboardEventHandler<HTMLButtonElement>    |         |             |
| onKeyUpCapture              | KeyboardEventHandler<HTMLButtonElement>    |         |             |
| onAbort                     | ReactEventHandler<HTMLButtonElement>       |         |             |
| onAbortCapture              | ReactEventHandler<HTMLButtonElement>       |         |             |
| onCanPlay                   | ReactEventHandler<HTMLButtonElement>       |         |             |
| onCanPlayCapture            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onCanPlayThrough            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onCanPlayThroughCapture     | ReactEventHandler<HTMLButtonElement>       |         |             |
| onDurationChange            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onDurationChangeCapture     | ReactEventHandler<HTMLButtonElement>       |         |             |
| onEmptied                   | ReactEventHandler<HTMLButtonElement>       |         |             |
| onEmptiedCapture            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onEncrypted                 | ReactEventHandler<HTMLButtonElement>       |         |             |
| onEncryptedCapture          | ReactEventHandler<HTMLButtonElement>       |         |             |
| onEnded                     | ReactEventHandler<HTMLButtonElement>       |         |             |
| onEndedCapture              | ReactEventHandler<HTMLButtonElement>       |         |             |
| onLoadedData                | ReactEventHandler<HTMLButtonElement>       |         |             |
| onLoadedDataCapture         | ReactEventHandler<HTMLButtonElement>       |         |             |
| onLoadedMetadata            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onLoadedMetadataCapture     | ReactEventHandler<HTMLButtonElement>       |         |             |
| onLoadStart                 | ReactEventHandler<HTMLButtonElement>       |         |             |
| onLoadStartCapture          | ReactEventHandler<HTMLButtonElement>       |         |             |
| onPause                     | ReactEventHandler<HTMLButtonElement>       |         |             |
| onPauseCapture              | ReactEventHandler<HTMLButtonElement>       |         |             |
| onPlay                      | ReactEventHandler<HTMLButtonElement>       |         |             |
| onPlayCapture               | ReactEventHandler<HTMLButtonElement>       |         |             |
| onPlaying                   | ReactEventHandler<HTMLButtonElement>       |         |             |
| onPlayingCapture            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onProgress                  | ReactEventHandler<HTMLButtonElement>       |         |             |
| onProgressCapture           | ReactEventHandler<HTMLButtonElement>       |         |             |
| onRateChange                | ReactEventHandler<HTMLButtonElement>       |         |             |
| onRateChangeCapture         | ReactEventHandler<HTMLButtonElement>       |         |             |
| onSeeked                    | ReactEventHandler<HTMLButtonElement>       |         |             |
| onSeekedCapture             | ReactEventHandler<HTMLButtonElement>       |         |             |
| onSeeking                   | ReactEventHandler<HTMLButtonElement>       |         |             |
| onSeekingCapture            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onStalled                   | ReactEventHandler<HTMLButtonElement>       |         |             |
| onStalledCapture            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onSuspend                   | ReactEventHandler<HTMLButtonElement>       |         |             |
| onSuspendCapture            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onTimeUpdate                | ReactEventHandler<HTMLButtonElement>       |         |             |
| onTimeUpdateCapture         | ReactEventHandler<HTMLButtonElement>       |         |             |
| onVolumeChange              | ReactEventHandler<HTMLButtonElement>       |         |             |
| onVolumeChangeCapture       | ReactEventHandler<HTMLButtonElement>       |         |             |
| onWaiting                   | ReactEventHandler<HTMLButtonElement>       |         |             |
| onWaitingCapture            | ReactEventHandler<HTMLButtonElement>       |         |             |
| onAuxClick                  | MouseEventHandler<HTMLButtonElement>       |         |             |
| onAuxClickCapture           | MouseEventHandler<HTMLButtonElement>       |         |             |
| onClickCapture              | MouseEventHandler<HTMLButtonElement>       |         |             |
| onContextMenu               | MouseEventHandler<HTMLButtonElement>       |         |             |
| onContextMenuCapture        | MouseEventHandler<HTMLButtonElement>       |         |             |
| onDoubleClick               | MouseEventHandler<HTMLButtonElement>       |         |             |
| onDoubleClickCapture        | MouseEventHandler<HTMLButtonElement>       |         |             |
| onDrag                      | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragCapture               | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragEnd                   | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragEndCapture            | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragEnter                 | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragEnterCapture          | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragExit                  | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragExitCapture           | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragLeave                 | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragLeaveCapture          | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragOver                  | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragOverCapture           | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragStart                 | DragEventHandler<HTMLButtonElement>        |         |             |
| onDragStartCapture          | DragEventHandler<HTMLButtonElement>        |         |             |
| onDrop                      | DragEventHandler<HTMLButtonElement>        |         |             |
| onDropCapture               | DragEventHandler<HTMLButtonElement>        |         |             |
| onMouseDown                 | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseDownCapture          | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseEnter                | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseLeave                | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseMove                 | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseMoveCapture          | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseOut                  | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseOutCapture           | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseOver                 | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseOverCapture          | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseUp                   | MouseEventHandler<HTMLButtonElement>       |         |             |
| onMouseUpCapture            | MouseEventHandler<HTMLButtonElement>       |         |             |
| onSelect                    | ReactEventHandler<HTMLButtonElement>       |         |             |
| onSelectCapture             | ReactEventHandler<HTMLButtonElement>       |         |             |
| onTouchCancel               | TouchEventHandler<HTMLButtonElement>       |         |             |
| onTouchCancelCapture        | TouchEventHandler<HTMLButtonElement>       |         |             |
| onTouchEnd                  | TouchEventHandler<HTMLButtonElement>       |         |             |
| onTouchEndCapture           | TouchEventHandler<HTMLButtonElement>       |         |             |
| onTouchMove                 | TouchEventHandler<HTMLButtonElement>       |         |             |
| onTouchMoveCapture          | TouchEventHandler<HTMLButtonElement>       |         |             |
| onTouchStart                | TouchEventHandler<HTMLButtonElement>       |         |             |
| onTouchStartCapture         | TouchEventHandler<HTMLButtonElement>       |         |             |
| onPointerDown               | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerDownCapture        | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerMove               | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerMoveCapture        | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerUp                 | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerUpCapture          | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerCancel             | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerCancelCapture      | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerEnter              | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerEnterCapture       | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerLeave              | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerLeaveCapture       | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerOver               | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerOverCapture        | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerOut                | PointerEventHandler<HTMLButtonElement>     |         |             |
| onPointerOutCapture         | PointerEventHandler<HTMLButtonElement>     |         |             |
| onGotPointerCapture         | PointerEventHandler<HTMLButtonElement>     |         |             |
| onGotPointerCaptureCapture  | PointerEventHandler<HTMLButtonElement>     |         |             |
| onLostPointerCapture        | PointerEventHandler<HTMLButtonElement>     |         |             |
| onLostPointerCaptureCapture | PointerEventHandler<HTMLButtonElement>     |         |             |
| onScroll                    | UIEventHandler<HTMLButtonElement>          |         |             |
| onScrollCapture             | UIEventHandler<HTMLButtonElement>          |         |             |
| onWheel                     | WheelEventHandler<HTMLButtonElement>       |         |             |
| onWheelCapture              | WheelEventHandler<HTMLButtonElement>       |         |             |
| onAnimationStart            | AnimationEventHandler<HTMLButtonElement>   |         |             |
| onAnimationStartCapture     | AnimationEventHandler<HTMLButtonElement>   |         |             |
| onAnimationEnd              | AnimationEventHandler<HTMLButtonElement>   |         |             |
| onAnimationEndCapture       | AnimationEventHandler<HTMLButtonElement>   |         |             |
| onAnimationIteration        | AnimationEventHandler<HTMLButtonElement>   |         |             |
| onAnimationIterationCapture | AnimationEventHandler<HTMLButtonElement>   |         |             |
| onTransitionEnd             | TransitionEventHandler<HTMLButtonElement>  |         |             |
| onTransitionEndCapture      | TransitionEventHandler<HTMLButtonElement>  |         |             |

### FlexContainerStyleProps

| name                                                                          | type                           | default | description                                                                  |
| ----------------------------------------------------------------------------- | ------------------------------ | ------- | ---------------------------------------------------------------------------- |
| direction                                                                     | ResponsiveStyle<FlexDirection> |         | Sets how flex items are placed in the flex container defining the main axis  |
| and the direction (normal or reversed). (maps to flex-direction CSS property) |
| wrap                                                                          | ResponsiveStyle<FlexWrap>      |         | The flexWrap property is set on containers and it controls what happens when |

children overflow the size of the container along the main axis. By default,
children are forced into a single line (which can shrink elements). If
wrapping is allowed, items are wrapped into multiple lines along the main
axis if needed.
(maps to flex-wrap CSS property) |

### CSSLayoutStyleProps

| name           | type                                                           | default | description                                                           |
| -------------- | -------------------------------------------------------------- | ------- | --------------------------------------------------------------------- |
| alignItems     | ResponsiveStyle<AlignItems>                                    |         | Controls where the Flex/Grid items sit on the cross axis.             |
| alignContent   | ResponsiveStyle<AlignContent>                                  |         | Sets the distribution of space between and around content items       |
| justifyContent | ResponsiveStyle<JustifyContent>                                |         | Controls where the Flex/Grid items sit on the main axis.              |
| gap            | ResponsiveStyle<StyleToken<Gap<0 \| (string & {})>>>           |         | Spacing between child components. Shorthand for rowGap and columnGap. |
| columnGap      | ResponsiveStyle<StyleToken<GridColumnGap<0 \| (string & {})>>> |         | Spacing between Flex/Grid child columns                               |
| rowGap         | ResponsiveStyle<StyleToken<RowGap<0 \| (string & {})>>>        |         | Spacing between Flex/Grid child rows                                  |

### RefAttributes

| name | type                   | default | description |
| ---- | ---------------------- | ------- | ----------- |
| ref  | Ref<HTMLButtonElement> |         |             |
