export const errorMessageWrapper = (fn: () => void, message: string) => {
  try {
    fn();
  } catch (error) {
    // Formatting below is intentional
    // and displays below Jest error message
    error.message += `

-- Custom Error Message --
${message}

`;
    console.error(error);
    throw new Error(error);
  }
};
