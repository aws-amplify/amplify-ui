/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Component2, Component2Props } from './test-component2';

export interface Component1Props extends Component2Props {
  textProp?: string;
}
export interface Component1State {
  testState?: number;
}

export class Component1 extends Component2<Component1Props, Component1State> {
  constructor(props: Component1Props) {
    super(props);

    this.state = {
      testState: 2,
    };
  }

  testMethod = () => {};

  render() {
    return <div>Test</div>;
  }
}
