/**
 * #6966 — script-aware punctuation for the Authenticator delivery message.
 *
 * The delivery message is assembled from translated fragments joined by
 * punctuation. Hardcoding an ASCII period is wrong for locales whose sentence
 * terminator differs: Japanese/Chinese use the ideographic full stop `。` and
 * Thai writes no sentence terminator at all. The terminator and the
 * inter-sentence spacer are therefore derived from the script of the
 * surrounding translated copy, keeping punctuation locale-correct without
 * adding a translation key, interpolation, or any public API.
 *
 * Script detection is MAJORITY-based rather than "contains any": a sentence is
 * treated as CJK or Thai only when most of its non-whitespace characters belong
 * to that script. "Contains any" mis-classifies copy such as a Latin sentence
 * that includes a single CJK proper noun, or a Korean (Hangul) phrase that
 * happens to contain a stray CJK codepoint.
 */

// Han / Kana ranges whose sentences terminate with the ideographic full stop.
const CJK_CHARACTERS =
  /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/g;

// Thai script range. Thai does not use a written sentence terminator.
const THAI_CHARACTERS = /[\u0e00-\u0e7f]/g;

// Copy that is already sentence-terminated must not receive a second terminator
// (e.g. a customer vocabulary override). Beyond ASCII `.!?` and their
// full-width twins `。！？`, this also covers the colon `:` / `：`, the ellipsis
// `…`, and the full-width `．` and half-width `｡` full stops.
const TERMINAL_PUNCTUATION = /[.!?:…。！？：．｡]$/;

type SentenceScript = 'cjk' | 'thai' | 'latin';

const countMatches = (sentence: string, pattern: RegExp): number =>
  sentence.match(pattern)?.length ?? 0;

// Classifies `sentence` by the script forming the majority (more than half) of
// its non-whitespace characters. Anything not predominantly CJK or Thai —
// Latin, Cyrillic, Hangul, etc. — is treated as `latin`.
const getSentenceScript = (sentence: string): SentenceScript => {
  const significantLength = sentence.replace(/\s/g, '').length;
  if (significantLength === 0) {
    return 'latin';
  }
  if (countMatches(sentence, CJK_CHARACTERS) * 2 > significantLength) {
    return 'cjk';
  }
  if (countMatches(sentence, THAI_CHARACTERS) * 2 > significantLength) {
    return 'thai';
  }
  return 'latin';
};

/**
 * Appends the script-appropriate sentence terminator to `sentence` unless it is
 * already terminated. CJK copy receives the ideographic full stop `。`, Thai
 * copy is left untouched, and every other script receives an ASCII period.
 *
 * @internal Not exported from the `@aws-amplify/ui` public entry point.
 */
export const terminateSentence = (sentence: string): string => {
  if (TERMINAL_PUNCTUATION.test(sentence)) {
    return sentence;
  }
  switch (getSentenceScript(sentence)) {
    case 'cjk':
      return `${sentence}。`;
    case 'thai':
      return sentence;
    default:
      return `${sentence}.`;
  }
};

/**
 * Returns the separator to place between two joined sentences. CJK scripts do
 * not separate sentences with a space; every other script does.
 *
 * @internal Not exported from the `@aws-amplify/ui` public entry point.
 */
export const getSentenceSpacer = (sentence: string): string =>
  getSentenceScript(sentence) === 'cjk' ? '' : ' ';
