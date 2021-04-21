export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export const supportedInputTypes = [
  'text',
  'number',
  'email',
  'password',
  'button',
  'submit',
  'radio',
  'tel'
] as const;

export type InputType = typeof supportedInputTypes[number];

export const isInputType = (value: string): value is InputType => {
  return supportedInputTypes.find(inputType => inputType === value)
    ? true
    : false;
};
