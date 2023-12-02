export const formatPhoneNumber = (
  dialCode: string,
  phoneNumberString: string
): string => {
  const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
  let formatted: string;
  switch (dialCode) {
    case '+1':
      formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      break;
    case '+7':
      formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      break;
    case '+33':
      formatted = cleaned.replace(
        /(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/,
        '$1 $2 $3 $4 $5'
      );
      break;
    case '+39':
      formatted = cleaned.replace(/(\d{4})(\d{4})(\d{3})/, '$1 $2 $3');
      break;
    case '+44':
      formatted = cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2-$3');
      break;
    case '+49':
      formatted = cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
      break;
    case '+52':
      formatted = cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
      break;
    case '+81':
      formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
      break;
    case '+91':
      formatted = cleaned.replace(/(\d{5})(\d{5})/, '$1 $2');
      break;
    case '+234':
      formatted = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3');
      break;
    // Add more cases for other country codes as needed
    default:
      formatted = cleaned;
  }
  return formatted;
};
