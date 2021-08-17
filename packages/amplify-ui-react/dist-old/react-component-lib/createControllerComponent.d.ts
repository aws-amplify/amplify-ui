import React from 'react';
interface LoadingElement {
  present: () => any;
  dismiss: () => any;
}
interface ReactControllerProps<E> {
  isOpen: boolean;
  onDidDismiss: (event: CustomEvent<E>) => void;
}
export declare function createControllerComponent<
  OptionsType extends object,
  LoadingElementType extends LoadingElement,
  OverlayEventDetail
>(
  displayName: string,
  controller: {
    create: (options: any) => Promise<LoadingElementType>;
  }
): {
  new (props: OptionsType & ReactControllerProps<OverlayEventDetail>): {
    controller?: LoadingElementType;
    componentDidMount(): Promise<void>;
    componentDidUpdate(
      prevProps: OptionsType & ReactControllerProps<OverlayEventDetail>
    ): Promise<void>;
    present(
      prevProps?: OptionsType & ReactControllerProps<OverlayEventDetail>
    ): Promise<void>;
    render(): null;
    context: any;
    setState<K extends never>(
      state:
        | {}
        | ((
            prevState: Readonly<{}>,
            props: Readonly<
              OptionsType & ReactControllerProps<OverlayEventDetail>
            >
          ) => {} | Pick<{}, K>)
        | Pick<{}, K>,
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    readonly props: Readonly<
      OptionsType & ReactControllerProps<OverlayEventDetail>
    > &
      Readonly<{
        children?: React.ReactNode;
      }>;
    state: Readonly<{}>;
    refs: {
      [key: string]: React.ReactInstance;
    };
    shouldComponentUpdate?(
      nextProps: Readonly<
        OptionsType & ReactControllerProps<OverlayEventDetail>
      >,
      nextState: Readonly<{}>,
      nextContext: any
    ): boolean;
    componentWillUnmount?(): void;
    componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
    getSnapshotBeforeUpdate?(
      prevProps: Readonly<
        OptionsType & ReactControllerProps<OverlayEventDetail>
      >,
      prevState: Readonly<{}>
    ): any;
    componentWillMount?(): void;
    UNSAFE_componentWillMount?(): void;
    componentWillReceiveProps?(
      nextProps: Readonly<
        OptionsType & ReactControllerProps<OverlayEventDetail>
      >,
      nextContext: any
    ): void;
    UNSAFE_componentWillReceiveProps?(
      nextProps: Readonly<
        OptionsType & ReactControllerProps<OverlayEventDetail>
      >,
      nextContext: any
    ): void;
    componentWillUpdate?(
      nextProps: Readonly<
        OptionsType & ReactControllerProps<OverlayEventDetail>
      >,
      nextState: Readonly<{}>,
      nextContext: any
    ): void;
    UNSAFE_componentWillUpdate?(
      nextProps: Readonly<
        OptionsType & ReactControllerProps<OverlayEventDetail>
      >,
      nextState: Readonly<{}>,
      nextContext: any
    ): void;
  };
  readonly displayName: string;
  contextType?: React.Context<any>;
};
export {};
