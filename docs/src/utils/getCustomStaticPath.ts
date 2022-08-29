import { FRAMEWORKS } from '@/data/frameworks';

export const getCustomStaticPath = (platforms: string[] | string) => {
  const platformsArr = Array.isArray(platforms)
    ? platforms
    : platforms.includes('all')
    ? FRAMEWORKS
    : platforms.split('|');

  return {
    paths: platformsArr.map((platform) => ({ params: { platform } })),
    fallback: false,
  };
};
