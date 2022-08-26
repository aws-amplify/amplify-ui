import { FRAMEWORKS } from '@/data/frameworks';

export const getCustomStaticPath = (platforms: string) => {
  const platformsArr = platforms.includes('all')
    ? FRAMEWORKS
    : platforms.split('|');
  return {
    paths: platformsArr.map((platform) => ({ params: { platform } })),
    fallback: false,
  };
};
