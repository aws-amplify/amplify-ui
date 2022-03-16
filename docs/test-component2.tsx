import * as React from 'react';

export interface Component2Props {
  readonly bemModifications?: Array<string>;
  readonly wrapperClass?: string;
  readonly children?: React.ReactNode;
}

export class Component2<
  Props extends Component2Props,
  State
> extends React.Component<Props, State> {
  testMethod1(params: {
    prefix: string;
    additionalClasses?: string;
    modifications?: Array<{ [index: string]: boolean } | string>;
  }): string {
    return '';
  }
}
