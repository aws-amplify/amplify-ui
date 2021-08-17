import * as React from 'react';
export interface IConnectProps {
  mutation?: any;
  onSubscriptionMsg?: (prevData: any, data: any) => any;
  query?: any;
  subscription?: any;
}
export interface IConnectState {
  loading: boolean;
  data: any;
  errors: any;
  mutation: any;
}
export declare class Connect extends React.Component<
  IConnectProps,
  IConnectState
> {
  subSubscription: any;
  private mounted;
  constructor(props: any);
  getInitialState(): {
    loading: boolean;
    data: {};
    errors: any[];
    mutation: () => void;
  };
  getDefaultState(): {
    loading: boolean;
    data: {};
    errors: any[];
    mutation: () => void;
  };
  _fetchData(): Promise<void>;
  _unsubscribe(): void;
  componentDidMount(): Promise<void>;
  componentWillUnmount(): void;
  componentDidUpdate(prevProps: any): void;
  render(): any;
}
/**
 * @deprecated use named import
 */
export default Connect;
