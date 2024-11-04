export function assertListCallerAccessGrantInput(
  value: string | undefined
): asserts value is string {
  if (!value) {
    throw new Error(
      'Storage Browser: Must provide accountId to `listCallerAccessGrants`.'
    );
  }
}
