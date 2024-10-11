import { ControlKey } from '../types';
import { useStatusDisplay, UseStatusDisplay } from './useDisplayStatus';

interface ControlHookTypeMap {
  StatusDisplay: [typeof useStatusDisplay, UseStatusDisplay];
}

type ControlHookMap = {
  [K in ControlKey]: ControlHookTypeMap[K][0];
};

const controlHookMap: ControlHookMap = {
  StatusDisplay: useStatusDisplay,
};

export const useControl = <K extends ControlKey>(
  key: K
): ControlHookTypeMap[K][1] => controlHookMap[key]();
