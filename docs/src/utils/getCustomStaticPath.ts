export const getCustomStaticPath = (platforms) => {
  return {
    paths: platforms.map((platform) => ({ params: { platform } })),
    fallback: false,
  };
};
