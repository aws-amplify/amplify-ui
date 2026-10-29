/**
 * @jest-environment node
 */
import path from 'path';
import { buildSync } from 'esbuild';

import { deDict, jaDict, nlDict } from '../dictionaries';

const bundle = (contents: string): string => {
  const result = buildSync({
    stdin: {
      contents,
      loader: 'ts',
      resolveDir: path.resolve(__dirname, '..'),
    },
    bundle: true,
    write: false,
    minify: true,
    format: 'esm',
    charset: 'utf8',
    external: [
      'aws-amplify',
      'aws-amplify/*',
      '@aws-amplify/core',
      '@aws-amplify/core/*',
    ],
    logLevel: 'silent',
  });
  return result.outputFiles[0].text;
};

const dictionaryPhrases = [
  deDict['Back to Sign In'],
  jaDict['Back to Sign In'],
  nlDict['Back to Sign In'],
];

const findPhrases = (output: string) =>
  dictionaryPhrases.filter((phrase) => output.includes(phrase));

describe('dictionaries tree shaking', () => {
  it('does not bundle language dictionaries when only `translate` is used', () => {
    const output = bundle(
      "import { translate } from './translations'; console.log(translate('Sign In'));"
    );

    expect(findPhrases(output)).toEqual([]);
  });

  it('does not bundle language dictionaries when only `DefaultTexts` is used', () => {
    const output = bundle(
      "import { DefaultTexts } from './translations'; console.log(DefaultTexts.SIGN_IN);"
    );

    expect(output.includes('Sign in to your account')).toBe(true);
    expect(findPhrases(output)).toEqual([]);
  });

  it('bundles the language dictionaries when `translations` is used', () => {
    const output = bundle(
      "import { translations } from './translations'; console.log(translations);"
    );

    expect(findPhrases(output)).toEqual(dictionaryPhrases);
  });
});
