// coverts validation errors to a readable error messages
export const getErrorMessage = (errorName: string, errorInfo: any): string => {
  switch (errorName) {
    case 'required':
      return 'This field is required';
    case 'minlength':
      return `This field must have length of ${errorInfo.requiredLength} or greater.`;
    case 'maxlength':
      return `This field must have length of ${errorInfo.requiredLength} or less.`;
    case 'whitespace':
      return `This field must not contain whitespace.`;
    default:
      return errorInfo;
  }
};
