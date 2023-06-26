import { OutputVariantKey } from '../types';
import { alert, AlertIcons } from './alert';

export type Icons<Output extends OutputVariantKey = unknown> = {
  alert?: AlertIcons<Output>;
};

export type WebIcons = Required<Icons<'required'>>;

export type DefaultIcons = Required<Icons<'default'>>;

export const icons: DefaultIcons = {
  alert,
};
