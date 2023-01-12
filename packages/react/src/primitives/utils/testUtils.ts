// To be used in unit tests to make it easier to display
// specific error messages in the console when running
// expect assertions in a loop
export const errorMessageWrapper = (
  fn: () => void,
  message: string
): void | Error => {
  try {
    fn();
  } catch (error) {
    // Formatting below is intentional
    // and displays below Jest error message
    (error as Error).message += `

-- Custom Error Message --
${message}

`;
    // eslint-disable-next-line no-console
    console.error(error);
    throw new Error((error as Error).message);
  }
};
