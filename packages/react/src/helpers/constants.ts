export const AMPLIFY_SYMBOL = (
  typeof Symbol !== 'undefined' && typeof Symbol.for === 'function'
    ? Symbol.for('amplify_default')
    : '@@amplify_default'
) as Symbol;

export const LABEL_HIDDEN_DEPRECATED =
  'labelHidden is deprecated and will be removed in next release. Please use isLabelHidden instead.';
