import { Prettify } from '@aws-amplify/ui';

export type MergeProps<C, P> = Prettify<C & Omit<P, keyof C>>;
