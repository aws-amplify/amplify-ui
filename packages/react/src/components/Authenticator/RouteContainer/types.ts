export type RouteProps = {
  className?: string;
  variation?: 'default' | 'modal';
};

export type RouteContainerProps = { children: React.ReactNode } & RouteProps;
