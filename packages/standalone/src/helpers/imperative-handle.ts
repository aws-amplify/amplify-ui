import * as ReactDOM from 'react-dom';

export interface BaseImperativeHandleProps {
  /**
   * The DOM element or its ID where the component will be mounted
   */
  container: string | HTMLElement;
}

export abstract class BaseImperativeHandle {
  protected _container: HTMLElement;

  constructor(props: BaseImperativeHandleProps) {
    this._container = this._getContainer(props.container);
  }

  protected _getContainer(container: string | HTMLElement): HTMLElement {
    if (typeof container !== 'string') {
      return container;
    }

    return document.getElementById(container);
  }

  protected _render(element: React.ReactElement) {
    ReactDOM.render(element, this._container);
  }

  public destroy() {
    ReactDOM.render(null, this._container);
  }
}
