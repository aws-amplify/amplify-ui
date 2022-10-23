import { useEffect, useRef } from 'react';

export default function usePreviousValue<Value>(
  value: Value
): Value | undefined {
  const previous = useRef<Value>();

  // update Previous value post render
  useEffect(() => {
    previous.current = value;
  }, [value]);

  // return Previous value
  return previous.current;
}
