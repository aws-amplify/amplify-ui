export const deprecationWarning = (iconName) => {
  if (process && process.env.NODE_ENV !== 'production') {
    console.warn(`Built-in icons are being deprecated in the next major release. You can use the react-icons (https://react-icons.github.io/react-icons) package with the Material Icon set in place of these icons or any other React Icon library.
import { Icon${iconName} } from '@aws-amplify/ui-react'; → import { Md${iconName.replace(
      'Icon',
      ''
    )} } from 'react-icons/md';
`);
  }
};
