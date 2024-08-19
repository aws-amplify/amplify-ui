'use client';
// https://github.com/vercel/next.js/discussions/53063
import { Button, ColorMode } from '@aws-amplify/ui-react';
import { useEffect, useState } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

function ThemeToggle({ initialValue }: { initialValue: ColorMode }) {
  const [colorMode, setColorMode] = useState(initialValue);

  useEffect(() => {
    if (colorMode) {
      document.cookie = `colorMode=${colorMode};path=/;`;
      document
        ?.querySelector('[data-amplify-theme]')
        ?.setAttribute('data-amplify-color-mode', colorMode);
    } else {
      setColorMode(
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
      );
    }
  }, [colorMode]);

  return (
    <Button
      onClick={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')}
    >
      {colorMode === 'dark' ? <FiSun /> : <FiMoon />}
    </Button>
  );
}

export default ThemeToggle;
