import { OutputVariantKey } from '../types';

type ViewBox = {
  minX?: number;
  minY?: number;
  width?: number;
  height?: number;
};

export type Icon = {
  viewBox?: ViewBox;
  pathData?: string;
  paths?: React.SVGAttributes<SVGPathElement>[];
};

export type ComponentIcons<
  OutputType extends OutputVariantKey,
  BaseComponentIcons
> = OutputType extends 'required'
  ? Required<BaseComponentIcons>
  : OutputType extends 'default'
  ? Required<BaseComponentIcons>
  : BaseComponentIcons;

export type AlertIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    close?: Icon;
    info?: Icon;
    warning?: Icon;
    error?: Icon;
    success?: Icon;
  }
>;

export type CheckboxIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    indeterminate?: Icon;
    checked?: Icon;
  }
>;

export type ExpanderIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    more?: Icon;
  }
>;

export type PasswordFieldIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    visibility?: Icon;
    visibilityOff?: Icon;
  }
>;

export type RatingIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    filled?: Icon;
    empty?: Icon;
  }
>;

export type SearchFieldIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    search?: Icon;
  }
>;

export type StepperFieldIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    add?: Icon;
    remove?: Icon;
  }
>;

export type StorageManagerIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    upload?: Icon;
    remove?: Icon;
    error?: Icon;
    success?: Icon;
    file?: Icon;
  }
>;

export type SelectIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    expand?: Icon;
  }
>;

export type MenuIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    menu?: Icon;
  }
>;

type FieldIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    clear?: Icon;
  }
>;

type PaginationIcons<OutputType> = ComponentIcons<
  OutputType,
  {
    previous?: Icon;
    next?: Icon;
  }
>;

export type Icons<Output extends OutputVariantKey = unknown> = {
  alert?: AlertIcons<Output>;
  checkbox?: CheckboxIcons<Output>;
  expander?: ExpanderIcons<Output>;
  field?: FieldIcons<Output>;
  menu?: MenuIcons<Output>;
  pagination?: PaginationIcons<Output>;
  passwordField?: PasswordFieldIcons<Output>;
  rating?: RatingIcons<Output>;
  searchField?: SearchFieldIcons<Output>;
  select?: SelectIcons<Output>;
  stepperField?: StepperFieldIcons<Output>;
  storageManager?: StorageManagerIcons<Output>;
};

export type WebIcons = Required<Icons<'required'>>;

export type DefaultIcons = Required<Icons<'default'>>;
