export type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export type InputType = 'text' | 'number' | 'email' | 'password';
