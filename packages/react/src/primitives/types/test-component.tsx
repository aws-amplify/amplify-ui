/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { Component2 } from './test-component2';
import {
  Component1Props,
  Component1State,
  Component2Props,
} from './test-component-props';

export class Component1 extends Component2<Component1Props, Component1State> {
  constructor(props: Component1Props) {
    super(props);

    this.state = {
      testState: 2,
    };
  }

  testMethod = () => {};

  render() {
    return <div>React Folder</div>;
  }
}
