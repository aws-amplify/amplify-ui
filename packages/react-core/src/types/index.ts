export type MergeProps<C, P> = C & Omit<P, keyof C>;
