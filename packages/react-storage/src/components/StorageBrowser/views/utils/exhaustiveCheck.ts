/**
 * Exhaustive type checking helper function.
 * Used in switch statements to ensure all cases are handled.
 * TypeScript will error if any cases are missing.
 *
 * @param value - Should be of type `never` when all cases are handled
 * @throws Error when called (indicates unhandled case)
 */
export function exhaustiveCheck(value: never): never {
  throw new Error(`Unhandled case: ${value}`);
}
