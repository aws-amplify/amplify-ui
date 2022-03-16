import * as React from 'react';
import { Component2Props } from './test-component-props';

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
