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
import { Dict, NoInfer, Phrase } from '../types';
import { deDict, esDict, frDict, itDict, jaDict, zhDict } from './dictionaries';

/**
 * This helper type checks that given phrase is one of the texts @aws-amplify/ui
 * provides by default.
 *
 * This will enable vscode autocompleted and help catch typos during development.
 * For example, translate('Submit') is valid but translate('Subnit') is not.
 *
 * You can also use translate<string> to handle custom strings or dynamic content.
 */
export function translate<T = Phrase>(phrase: NoInfer<T>): string {
  return I18n.get(phrase);
}

/**
 * TODO: The string keys below can be inferred from DefaultTexts using
 * https://github.com/aws-amplify/amplify-ui/pull/189#discussion_r690896123,
 * but this needs translation key standarization. DefaultTexts above is more
 * accurate to what we use in authenticator@next.
 */
export const translations: Record<string, Dict> = {
  de: deDict,
  es: esDict,
  fr: frDict,
  it: itDict,
  ja: jaDict,
  zh: zhDict,
};
