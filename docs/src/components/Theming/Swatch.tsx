import { Text, Flex, View, useTheme } from '@aws-amplify/ui-react';
import { tokens } from '@aws-amplify/ui/dist/types/theme/tokens';

export function SwatchToken({ path }) {
  return (
    <div className="docs-swatch-token">
      {path.map((pathFragment, index) => {
        return (
          <>
            {index !== 0 && isNaN(pathFragment) && '.'}
            {!isNaN(pathFragment) ? `[${pathFragment}]` : pathFragment}
          </>
        );
      })}
    </div>
  );
}

export function SwatchMeta({ children }) {
  return <div className="docs-swatch-meta">{children}</div>;
}

export function Swatch({ value, name, path, namespace }) {
  path.shift();
  console.log(path);
  return (
    <div className={`docs-swatch docs-swatch--${namespace}`}>
      {namespace === 'colors' && (
        <>
          <View className="docs-swatch-color" backgroundColor={value}></View>
          <SwatchToken path={path} />
          <SwatchMeta>{name}</SwatchMeta>
          <SwatchMeta>{value}</SwatchMeta>
        </>
      )}
      {namespace === 'space' && (
        <>
          <SwatchToken path={path} />
          <div className="docs-swatch-space">
            <View className="docs-swatch-spaceblock" width={value}></View>
          </div>

          <SwatchMeta>{value}</SwatchMeta>

          <SwatchMeta>{name}</SwatchMeta>
        </>
      )}
    </div>
  );
}

export function SwatchGroup({ namespace, childKey }) {
  const { tokens } = useTheme();
  console.log('tokens', tokens);
  const tokenGroup = childKey ? tokens[namespace][childKey] : tokens[namespace];

  let swatches = [];

  function iterateGroup(group) {
    for (const [key, value] of Object.entries(group)) {
      console.log(value);
      if (typeof value === 'object' && value.hasOwnProperty('name')) {
        swatches.push({
          color: key,
          ...value,
        });
      } else {
        iterateGroup(value);
      }
    }
  }

  if (tokenGroup.hasOwnProperty('name')) {
    swatches.push(tokenGroup);
  } else {
    iterateGroup(tokenGroup);
  }

  return (
    <ul className="docs-swatch-group">
      {swatches.map((swatch) => {
        return (
          <li key={swatch.name}>
            <Swatch
              path={swatch.path}
              value={swatch.value}
              name={swatch.name}
              namespace={namespace}
            />
          </li>
        );
      })}
    </ul>
  );
}
