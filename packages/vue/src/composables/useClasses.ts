import { inject } from "vue";

import { classNames } from "../defaults/DefaultClasses";

export function useClasses(val: string, category?, defaultClasses?): any {
  let classes: any;
  if (!category) {
    category = inject("category");
    defaultClasses = inject("defaultClasses");
  }
  classes = {};
  if (defaultClasses?.value) {
    // grab default classes
    classes = {
      ...classNames,
    };
  }
  return classes[`${category?.value}.${val}`];
}
