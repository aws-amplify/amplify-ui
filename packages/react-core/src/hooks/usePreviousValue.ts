import { useEffect, useRef } from 'react';

export default function usePreviousValue<Value>(
  value: Value
): Value | undefined {
  const previous = useRef<Value>();

  // update ref post render
  useEffect(() => {
    previous.current = value;
  }, [value]);

  // return previous ref
  return previous.current;
}
