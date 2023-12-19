interface DialCodeFormat {
  match: RegExp;
  replace: string;
}
export const dialCodeFormats: Record<string, DialCodeFormat> = {
  '+1': {
    match: /(\d{3})(\d{3})?(\d{4})?/,
    replace: '($1) $2 $3',
  },
  '+7': {
    match: /(\d{3})(\d{3})?(\d{4})?/,
    replace: '($1) $2 $3',
  },
  '+33': {
    match: /(\d{2})(\d{2})?(\d{2})?(\d{2})?(\d{2})?/,
    replace: '$1 $2 $3 $4 $5',
  },
  '+39': {
    match: /(\d{4})(\d{4})?(\d{3})?/,
    replace: '$1 $2 $3',
  },
  '+44': {
    match: /(\d{4})(\d{3})?(\d{4})?/,
    replace: '$1 $2 $3',
  },
  '+49': {
    match: /(\d{4})(\d{3})?(\d{4})?/,
    replace: '$1 $2 $3',
  },
  '+52': {
    match: /(\d{3})(\d{3})?(\d{4})?/,
    replace: '$1 $2 $3',
  },
  '+81': {
    match: /(\d{3})(\d{4})?(\d{4})?/,
    replace: '$1 $2 $3',
  },
  '+91': {
    match: /(\d{5})(\d{5})?/,
    replace: '$1 $2',
  },
  '+234': {
    match: /(\d{3})(\d{4})?(\d{4})?/,
    replace: '$1 $2 $3',
  },
  // Add more cases for other country codes as needed
};
