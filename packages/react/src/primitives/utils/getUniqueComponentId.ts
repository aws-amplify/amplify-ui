export const getUniqueComponentId = (
  id?: string,
  suffix?: string
): string | undefined => (id && suffix ? `${id}-${suffix}` : undefined);
