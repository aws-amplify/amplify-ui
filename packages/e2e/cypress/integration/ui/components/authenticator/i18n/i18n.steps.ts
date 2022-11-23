// import { translations } from '@aws-amplify/ui';
import { And, Then, When } from '@badeball/cypress-cucumber-preprocessor';
import { escapeRegExp } from 'lodash';

// temporary workaround due to https://github.com/aws/aws-sdk-js-v3/issues/3828
const jaDict = {
  'Account recovery requires verified contact information':
    'アカウントの復旧には確認済みの連絡先が必要です',
  'An account with the given email already exists.':
    '入力されたメールアドレスのアカウントが既に存在します',
  'Back to Sign In': 'サインインに戻る',
  'Change Password': 'パスワードを変える ',
  Code: 'コード',
  Confirm: '確定',
  'Confirm a Code': 'コードを確認',
  'Confirm Password': 'パスワードの確認',
  'Confirm Sign In': 'サインインする',
  'Confirm Sign Up': '登録する',
  'Confirmation Code': '確認コード',
  'Create a new account': '新しいアカウントを作る',
  'Create account': 'アカウントを作る ',
  'Create Account': 'アカウントを作る',
  Email: 'メールアドレス',
  'Enter your password': 'パスワードを入力 ',
  'Enter your username': 'ユーザー名を入力 ',
  'Forgot Password': 'パスワードを忘れた ',
  'Forgot your password?': 'パスワードを忘れましたか？ ',
  'Have an account? ': 'アカウントを持っていますか？',
  'Incorrect username or password': 'ユーザー名かパスワードが異なります ',
  'Invalid password format': 'パスワードの形式が無効です ',
  'Invalid phone number format':
    '不正な電話番号の形式です。\n+12345678900 の形式で入力してください',
  'Lost your code? ': 'コードを失くしましたか？',
  'New Password': '新しいパスワード',
  'No account? ': 'アカウントが無いとき ',
  or: '又は',
  Password: 'パスワード ',
  'Password attempts exceeded': 'サインインの試行回数が上限に達しました',
  'Phone Number': '電話番号',
  'Resend Code': 'コードを再送信',
  'Reset password': 'パスワードをリセット ',
  'Reset your password': 'パスワードをリセットする',
  'Send Code': 'コードを送信',
  'Sign in': 'サインイン',
  'Sign In': 'サインイン ',
  'Sign in to your account': 'アカウントにサインイン ',
  'Sign In with Amazon': 'Amazonでサインイン',
  'Sign In with Facebook': 'Facebookでサインイン',
  'Sign In with Google': 'Googleでサインイン',
  'Sign Out': 'サインアウト ',
  'Sign Up': '登録 ',
  Skip: 'スキップ',
  Submit: '送信',
  'User already exists': '既にユーザーが存在しています ',
  'User does not exist': 'ユーザーが存在しません ',
  Username: 'ユーザー名 ',
  'Username cannot be empty': 'ユーザー名は入力必須です',
  Verify: '確認',
  'Verify Contact': '連絡先を確認',
  'We Emailed You': 'コードを送信しました',
  'Your code is on the way. To log in, enter the code we emailed to':
    'ログインするには、メールに記載されたコードを入力してください。送信先:',
  'Your code is on the way. To log in, enter the code we texted to':
    'ログインするには、テキストメッセージに記載されたコードを入力してください。送信先:',
  'It may take a minute to arrive.':
    'コードを受信するまで数分かかる場合があります。',
};

const translations = { ja: jaDict };

When(
  'I click the {string} tab in {string}',
  (label: string, language: string) => {
    cy.findByRole('tab', {
      name: new RegExp(
        `^${escapeRegExp(translations[language][label]).trim()}$`,
        'i'
      ),
    }).click();
  }
);

Then(
  'the {string} header is in {string}',
  (label: string, language: string) => {
    cy.findByRole('heading', {
      name: translations[language][label].trim(),
    });
  }
);

And('the {string} input is in {string}', (label: string, language: string) => {
  cy.findByLabelText(translations[language][label].trim());
});

And(
  'the {string} input is in {string} and I type the wrong username or password',
  (label: string, language: string) => {
    cy.findByLabelText(translations[language][label].trim()).type(
      'UNKNOWN@UNKNOWN.com'
    );
  }
);

And(
  'the {string} button is in {string} and I click it',
  (label: string, language: string) => {
    cy.findByRole('button', {
      name: translations[language][label].trim(),
    }).click();
  }
);

And('the {string} button is in {string}', (label: string, language: string) => {
  cy.findByRole('button', {
    name: translations[language][label].trim(),
  });
});
