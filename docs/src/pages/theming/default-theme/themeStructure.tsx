import * as React from 'react';
import { useTheme, Heading, View } from '@aws-amplify/ui-react';

function flattenTheme(obj, arr = []) {
  if (obj.hasOwnProperty('value')) {
    arr.push(obj);
  } else {
    for (const name in obj) {
      if (obj.hasOwnProperty(name)) {
        flattenTheme(obj[name], arr);
      }
    }
  }

  return arr;
}

const Token = ({ name, value }) => {
  return (
    <div>
      {name} | {value}
    </div>
  );
};

const Section = ({ heading, tokens }) => {
  return (
    <View as="section">
      <Heading level={3}>{heading}</Heading>
      {tokens.map(({ name, value }) => (
        <Token key={name} name={name} value={value} />
      ))}
    </View>
  );
};

export const ThemeStructure = () => {
  // const allTokens = flattenTheme(useTheme().tokens);
  const { tokens } = useTheme();
  const componentSections = Object.keys(tokens.components).map((key) => {
    return {
      heading: key,
      tokens: flattenTheme(tokens.components[key]),
    };
  });

  return (
    <>
      <Heading level={2}>Components</Heading>
      <table>
        <tbody>
          {componentSections.map(({ heading, tokens }) => (
            <>
              <tr>
                <td colSpan={2}>{heading}</td>
              </tr>
              {tokens.map(({ name, value }) => (
                <tr>
                  <td>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
      {/* {componentSections.map(({heading,tokens}) => <Section heading={heading} tokens={tokens} />)} */}
    </>
  );

  // return (
  //   <table>
  //     <thead>
  //       <tr>
  //         <td>Name</td>
  //         <td>Value</td>
  //       </tr>
  //     </thead>
  //     {allTokens.map(({ name, value }) => (
  //       <tr key={name}>
  //         <td>
  //           <code>{name}</code>
  //         </td>
  //         <td>
  //           <code>{value}</code>
  //         </td>
  //       </tr>
  //     ))}
  //   </table>
  // );
};
