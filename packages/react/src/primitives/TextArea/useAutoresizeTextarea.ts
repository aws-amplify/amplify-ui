import { useEffect } from 'react';

// Updates the height of a <textarea> when the value changes.
export const useAutoresizeTextArea = (
  textAreaRef: HTMLTextAreaElement | null,
  value?: unknown
): void => {
  useEffect(() => {
    const resizeTextArea = () => {
      if (textAreaRef) {
        // We need to reset the height momentarily to get the correct scrollHeight for the textarea
        textAreaRef.style.height = 'auto';
        const { scrollHeight } = textAreaRef;

        // We then set the height directly, outside of the render loop
        // Trying to set this with state or a ref will product an incorrect value.
        textAreaRef.style.height = `${scrollHeight}px`;
      }
    };
    resizeTextArea();
    window.addEventListener('resize', resizeTextArea);

    return () => {
      window.removeEventListener('resize', resizeTextArea);
    };
  }, [
    textAreaRef,
    // Trigger the effect if the value changes
    value,
  ]);
};
