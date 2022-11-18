import { SearchField, useTheme } from '@aws-amplify/ui-react';

export const SearchFieldStyledPropsExample = () => {
  const { tokens } = useTheme();

  return (
    <>
      <SearchField
        label="search"
        padding="xl"
        border={`1px solid ${tokens.colors.brand.primary[60]}`}
      />
      <SearchField
        label="search"
        inputStyles={{
          border: `1px solid ${tokens.colors.brand.primary[60]}`,
          backgroundColor: tokens.colors.brand.primary[10],
        }}
      />
    </>
  );
};
