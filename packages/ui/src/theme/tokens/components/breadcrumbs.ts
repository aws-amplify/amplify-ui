import { DesignTokenProperties, OutputVariantKey } from '../types/designToken';

export type BreadcrumbsTokens<OutputType extends OutputVariantKey> =
  DesignTokenProperties<'gap', OutputType>;

export const breadcrumbs: Required<BreadcrumbsTokens<'default'>> = {
  gap: { value: '{space.medium}' },
};
