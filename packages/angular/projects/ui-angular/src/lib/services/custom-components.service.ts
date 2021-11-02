import { Injectable } from '@angular/core';
import { CustomComponents } from '../common';

/**
 * Stores and provides custom components that users provide with `amplify-slot`.
 */
@Injectable({
  providedIn: 'root',
})
export class CustomComponentsService {
  private _customComponents: CustomComponents = {};

  public get customComponents(): CustomComponents {
    return this._customComponents;
  }

  public set customComponents(customComponents: CustomComponents) {
    this._customComponents = { ...this._customComponents, ...customComponents };
  }
}
