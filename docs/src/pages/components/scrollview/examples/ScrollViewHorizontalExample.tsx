import { ScrollView } from '@aws-amplify/ui-react';

export const ScrollViewHorizontalExample = () => {
  return (
    <ScrollView
      width="200px"
      className="horizontal-example"
      orientation="horizontal"
    >
      The value of Pi is 3.1415926535897932384626433832795029. The value of e is
      2.7182818284590452353602874713526625.
    </ScrollView>
  );
};
