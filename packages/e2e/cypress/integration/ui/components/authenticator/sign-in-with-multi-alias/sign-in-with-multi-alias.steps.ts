import { When } from 'cypress-cucumber-preprocessor/steps';

When(
  'I type my {string} with status {string}',
  (loginMechanism: string, status: string) => {
    const $input = cy.findByRole(
      'textbox',
      /username or email or phone number/i
    );

    if (loginMechanism === 'phone number') {
      $input.type('+1');
    }

    $input.typeAliasWithStatus(loginMechanism, status);
  }
);
