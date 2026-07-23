import { getSentenceSpacer, terminateSentence } from '../sentencePunctuation';

describe('sentencePunctuation (#6966)', () => {
  describe('terminateSentence', () => {
    it('appends an ASCII period to Latin copy', () => {
      expect(terminateSentence('It may take a minute to arrive')).toBe(
        'It may take a minute to arrive.'
      );
    });

    it('appends the ideographic full stop to majority-CJK copy (ja/zh)', () => {
      // Japanese
      expect(terminateSentence('コードを入力してください')).toBe(
        'コードを入力してください。'
      );
      // Chinese
      expect(terminateSentence('请输入验证码')).toBe('请输入验证码。');
    });

    it('leaves Thai copy without a terminator', () => {
      const thai = 'อาจใช้เวลาสักครู่';
      const result = terminateSentence(thai);

      expect(result).toBe(thai);
      expect(result.endsWith('.')).toBe(false);
      expect(result.endsWith('。')).toBe(false);
    });

    it('keeps an ASCII period on a Latin sentence that contains a CJK proper noun (no.1 majority)', () => {
      // "東京" is a lone CJK proper noun inside otherwise-Latin copy: the old
      // "contains any CJK" test wrongly appended "。" here.
      const result = terminateSentence('Enter the code for 東京');

      expect(result).toBe('Enter the code for 東京.');
      expect(result.endsWith('。')).toBe(false);
    });

    it('keeps an ASCII period on a majority-Hangul Korean phrase containing a CJK codepoint (no.1 majority)', () => {
      // Korean copy can embed a stray CJK (Hanja) codepoint while remaining
      // predominantly Hangul — it must still terminate with an ASCII period.
      const result = terminateSentence('코드를 입력하세요 (中)');

      expect(result).toBe('코드를 입력하세요 (中).');
      expect(result.endsWith('。')).toBe(false);
    });

    it.each(['.', '!', '?', '。', '！', '？'])(
      'does not append after existing terminal punctuation %s',
      (punctuation) => {
        const sentence = `Done${punctuation}`;
        expect(terminateSentence(sentence)).toBe(sentence);
      }
    );

    it.each(['…', '．', '｡', ':', '：'])(
      'recognizes %s as terminal punctuation and appends nothing (no.2)',
      (punctuation) => {
        const sentence = `Might take a minute or two${punctuation}`;
        const result = terminateSentence(sentence);

        expect(result).toBe(sentence);
        expect(result.endsWith('.')).toBe(false);
      }
    );

    it('treats empty / whitespace-only input as Latin', () => {
      expect(terminateSentence('')).toBe('.');
      expect(terminateSentence('   ')).toBe('   .');
    });
  });

  describe('getSentenceSpacer', () => {
    it('returns no space for majority-CJK copy', () => {
      expect(getSentenceSpacer('コードを入力してください')).toBe('');
      expect(getSentenceSpacer('请输入验证码')).toBe('');
    });

    it('returns a single space for Latin, Thai and Hangul copy', () => {
      expect(getSentenceSpacer('It may take a minute to arrive')).toBe(' ');
      expect(getSentenceSpacer('อาจใช้เวลาสักครู่')).toBe(' ');
      expect(getSentenceSpacer('코드를 입력하세요')).toBe(' ');
    });

    it('returns a single space for Latin copy containing a CJK proper noun', () => {
      expect(getSentenceSpacer('Enter the code for 東京')).toBe(' ');
    });
  });
});
