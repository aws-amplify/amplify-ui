export interface Component1Props extends Component2Props {
  textProp?: string;
}
export interface Component1State {
  testState?: number;
}

export interface Component2Props {
  readonly bemModifications?: Array<string>;
  readonly wrapperClass?: string;
  readonly children?: React.ReactNode;
}
