// how can we make this type more strict than `any`?
export const getComponentSlots = (subcomponent: any) => {
  return {
    Footer: subcomponent.Footer,
    FormFields: subcomponent.FormFields,
    Header: subcomponent.Header,
  };
};
