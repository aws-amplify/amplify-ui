// how can we make this type more strict than `any`?
export const getComponentSlots = (subcomponent: any) => {
  return {
    Footer: subcomponent.Footer,
    FormFields: subcomponent.FormFields,
    Header: subcomponent.Header,
  };
};

const componentFields = {
  code: {
    name: 'code',
    label: 'Code',
    placeholder: 'Code',
    type: 'default' as const,
  },
  confirmPassword: {
    name: 'confirmPassword',
    label: 'Confirm Password',
    placeholder: 'Confirm Password',
    type: 'password' as const,
  },
  newPassword: {
    name: 'newPassword',
    label: 'New Password',
    placeholder: 'New Password',
    type: 'password' as const,
  },
  password: {
    name: 'password',
    label: 'Password',
    placeholder: 'Password',
    type: 'password' as const,
  },
  phone: {
    name: 'phone',
    label: 'Phone',
    placeholder: 'Phone',
    type: 'phone' as const,
  },
  username: {
    name: 'username',
    label: 'Username',
    placeholder: 'Username',
    type: 'default' as const,
  },
};

type Fields = keyof typeof componentFields;

export const getComponentFields = (fields: Fields[]) => {
  return {
    fields: fields.map((field) => componentFields[field]),
  };
};
