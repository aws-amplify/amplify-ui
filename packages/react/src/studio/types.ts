/**
 * 🚨 WARNING:🚨
 * These types are owned by the Studio UI Builder team
 * and are used during code generation triggered by Amplify CLI.
 *
 * When considering making changing to this file, please consult
 * a member from the Studio UI Builder team.
 */

export type EscapeHatchProps = {
  [elementHierarchy: string]: Record<string, unknown>;
} | null;

export type VariantValues = { [key: string]: string };
export type Variant = {
  variantValues: VariantValues;
  overrides: EscapeHatchProps;
};
