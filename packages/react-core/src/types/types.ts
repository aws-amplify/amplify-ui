export type AnyComponent = React.ComponentType<any>;

export type MergeProps<C, P> = C & Omit<P, keyof C>;
