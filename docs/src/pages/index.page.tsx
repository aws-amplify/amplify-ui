import PlatformHomepage from './[platform]/index.page';

const HomePage = ({ colorMode, setThemeOverride, themeOverride }) => {
  return (
    <PlatformHomepage
      colorMode={colorMode}
      setThemeOverride={setThemeOverride}
      themeOverride={themeOverride}
    />
  );
};

export default HomePage;
