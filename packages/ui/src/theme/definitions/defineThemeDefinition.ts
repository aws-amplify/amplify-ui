import type * as CSS from 'csstype';
import { DesignToken } from '../types';

type Selectors = Partial<
  Record<CSS.HtmlAttributes | CSS.Pseudos, CSS.Properties>
>;

type Vars = Record<string, DesignToken | string>;

export interface BaseProperties extends CSS.Properties, Selectors {}

type ThemeModifiers<T extends Partial<Record<keyof T, string | boolean>>> = {
  [K in keyof T]?: T[K] extends string
    ? { [U in T[K]]?: BaseProperties }
    : T[K] extends boolean
    ? BaseProperties
    : never;
};

type ElementModifiers<K extends string, U> = Partial<
  Record<K, BaseProperties | Partial<Record<'_modifiers', U>>>
>;

export type DefineThemeDefinition<
  Modifiers extends
    | Partial<Record<keyof Modifiers, string | boolean>>
    | never = never,
  ElementName extends string | never = never,
> = BaseProperties & {
  vars?: Vars;
} & {
  [K in '_modifiers' as Modifiers extends never
    ? never
    : K]?: ThemeModifiers<Modifiers>;
} & {
  [U in '_elements' as ElementName extends never
    ? never
    : U]?: ElementModifiers<ElementName, ThemeModifiers<Modifiers>>;
};
