import { Framework, MAJOR_VERSIONS } from '../data/frameworks';
import { useRouter } from 'next/router';

export const useVersion = (framework: Framework) => {
  const {
    query: { platform = 'react' },
  } = useRouter();

  if (!framework) {
    framework = platform as Framework;
  }
  return MAJOR_VERSIONS[framework][1];
};
