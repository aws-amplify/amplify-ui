/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
import { I18n } from 'aws-amplify';
import { NoInfer } from '../types';
import {
  deDict,
  enDict,
  esDict,
  frDict,
  itDict,
  jaDict,
  krDict,
  plDict,
  ptDict,
  zhDict,
  defaultTexts,
} from './dictionaries';

/**
 * Contains translatable strings that authenticator provides by default. Customers
 * can use this to add custom vocabularies:
 *
 * ```
 * I18n.putVocabulariesForLanguage("en", {
 *  [DefaultTexts.SIGN_IN]: "Custom Sign In Text",
 *  [DefaultTexts.SIGN_IN_BUTTON]: "Custom Click Here to Sign In"
 * });
 * ```
 */
export const DefaultTexts = { ...defaultTexts } as const;

// type Phrase = "Back to Sign In" | "Change Password" | ...
export type Phrase = typeof DefaultTexts[keyof typeof DefaultTexts];

/**
 * TODO: Translation keys for dictionaries can be inferred from DefaultTexts
 * by typing it to Partial<Record<Phrase, string>>.
 *
 * But this requires error string keys to be standarized as well, and can be a
 * limiting factor for custom translation keys. Marking it as TODO until we see
 * a reason to strongly type this.
 */
export type Dict = Record<string, string>;

/**
 * This helper type checks that given phrase is one of the texts @aws-amplify/ui
 * provides by default. This enables vscode autocompletion to help catch typos
 * during development.
 *
 * You can also use translate<string> to handle custom strings or dynamic content.
 */
export function translate<T = Phrase>(phrase: NoInfer<T>): string {
  return I18n.get(phrase);
}

export const translations: Record<string, Dict> = {
  de: deDict,
  en: enDict,
  es: esDict,
  fr: frDict,
  it: itDict,
  ja: jaDict,
  kr: krDict,
  pl: plDict,
  pt: ptDict,
  zh: zhDict,
};
