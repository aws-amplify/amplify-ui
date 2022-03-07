import * as React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { SiGithub } from 'react-icons/si';
import {
  MdFormatAlignCenter,
  MdExpandMore,
  MdExpandLess,
} from 'react-icons/md';
import {
  defaultTheme,
  Tabs,
  TabItem,
  Link,
  Icon,
  Expander,
  ExpanderItem,
  Text,
  View,
  useTheme,
} from '@aws-amplify/ui-react';

import { RepoWithPath } from '@/data/urls';
import { Token } from './Theme/Token';

const TokenPreview = ({
  name,
  path,
  value,
  original,
}: {
  name: string;
  path: string[];
  value: string;
  original: string;
}) => {
  const { tokens } = useTheme();
  if (name.endsWith('color')) {
    return (
      <View
        className="docs-theme-token-preview--color"
        backgroundColor={value}
        width={tokens.space.xl}
        height={tokens.space.xl}
      ></View>
    );
  }
  if (name.endsWith('font-size')) {
    return <Text fontSize={value}>Aa</Text>;
  }
  if (name.endsWith('font-weight')) {
    return <Text fontWeight={value}>Aa</Text>;
  }
  if (name.endsWith('border-radius')) {
    return (
      <View
        width={tokens.space.xl}
        height={tokens.space.xl}
        borderWidth={tokens.borderWidths.medium}
        borderColor={tokens.colors.border.primary}
        borderStyle="solid"
        borderRadius={value}
      />
    );
  }
  if (name.endsWith('text-align')) {
    return <Icon ariaLabel="center" as={MdFormatAlignCenter} />;
  }
  if (name.endsWith('padding-horizontal')) {
    return (
      <View
        width={value}
        height={tokens.borderWidths.medium}
        backgroundColor={tokens.colors.border.primary}
      />
    );
  }
  if (name.endsWith('padding-vertical')) {
    return (
      <View
        height={value}
        width={tokens.borderWidths.medium}
        backgroundColor={tokens.colors.border.primary}
      />
    );
  }
  return null;
};

const tokensToCode = (tokenObject, lines = []) => {
  Object.keys(tokenObject).forEach((key) => {
    const token = tokenObject[key];
    if (typeof token.value === 'undefined') {
      return tokensToCode(token, lines);
    }
    lines.push(`${token.name}: ${token.value};`);
  });

  return lines.join(`\n`);
};

export const ComponentThemeTokens = ({ name, children, path }) => {
  const { tokens } = useTheme();
  const componentTokens = defaultTheme.tokens.components[name];

  return (
    <>
      <Link href={`${RepoWithPath}${path}`} isExternal>
        <Icon
          ariaLabel="Github"
          as={SiGithub}
          fontSize={tokens.fontSizes.large}
          marginInlineEnd={tokens.space.small}
        />
        View default theme source
      </Link>
      <Tabs>
        <TabItem title="Token explorer">
          <View className="docs-theme-table">
            <RecursiveTable themeObject={componentTokens} />
          </View>
        </TabItem>
        <TabItem title="Theme object">{children}</TabItem>
        <TabItem title="CSS variables">
          <Highlight
            Prism={defaultProps.Prism}
            code={tokensToCode(componentTokens)}
            language="css"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                <code className={className}>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line, key: i })}>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  ))}
                </code>
              </pre>
            )}
          </Highlight>
        </TabItem>
      </Tabs>
    </>
  );
};

/**
 * What we need to be able to do is show nested theme objects for variations,
 * sizes, and states.
 * It would also be helpful to group theme tokens like border (width, style, radius, color) and padding to make the table easier to parse
 * Recursive function that if it sees an object without a '.value' it recurses
 * First: filter only the tokens
 * Second: group tokens by type: border, typography, padding, transition
 * Then:
 */
const RecursiveTable = ({ themeObject, indent = 1 }) => {
  // Split the items in an object into tokens and nested objects
  // so we can group nested tokens together
  const [tokenKeys, nestedObjectKeys] = partition(
    Object.keys(themeObject),
    (key) => themeObject[key].hasOwnProperty('value')
  );
  return (
    <>
      {tokenKeys.sort().map((key) => {
        const token = themeObject[key];
        return <Token key={key} title={key} {...token} />;
      })}
      {nestedObjectKeys.map((key) => {
        const entries = Object.keys(themeObject[key]).length;
        return (
          <TokenSectionExpander key={key} title={`${key} (${entries})`}>
            <RecursiveTable
              themeObject={themeObject[key]}
              indent={indent + 1}
            />
          </TokenSectionExpander>
        );
      })}
    </>
  );
};

const TokenSectionExpander = ({ children, title }) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  return (
    <View className="docs-theme-token-section">
      <View
        className="docs-theme-token-section__header"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {title}
        <Icon ariaLabel="" as={isExpanded ? MdExpandLess : MdExpandMore} />
      </View>
      {isExpanded ? (
        <View className="docs-theme-token-section__body">{children}</View>
      ) : null}
    </View>
  );
};

// ----- partition function declaration -----
/** Returns an array with two arrays at index
 * 0 and 1. The array at index 0 is all the items
 * in `arr` that passed the `predicate` truth test by
 * returning a truthy value. The array at index 1 is all the items
 * in `arr` that failed the `predicate` truth test by returning
 * a falsy value.
 * @template {any} T
 * @param {Array<T>} arr
 * @param {(el:T, index:number, arr:Array<T>) => any} predicate
 * @returns {[Array<T>, Array<T>]}
 */
function partition(arr, predicate) {
  return arr.reduce(
    // this callback will be called for each element of arr
    function (partitionsAccumulator, arrElement, i, arr) {
      if (predicate(arrElement, i, arr)) {
        // predicate passed push to left array
        partitionsAccumulator[0].push(arrElement);
      } else {
        // predicate failed push to right array
        partitionsAccumulator[1].push(arrElement);
      }
      // whatever is returned from reduce will become the new value of the
      // first parameter of the reduce callback in this case
      // partitionsAccumulator variable if there are no more elements
      // this return value will be the return value of the full reduce
      // function.
      return partitionsAccumulator;
    },
    // the initial value of partitionsAccumulator in the callback function above
    // if the arr is empty this will be the return value of the reduce
    [[], []]
  );
}
