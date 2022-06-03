export function createTokenList(tokens) {
  let tokenList = [];
  function iterateGroup(group) {
    for (const [key, value] of Object.entries(group)) {
      // console.log(value);
      if (typeof value === 'object' && value.hasOwnProperty('name')) {
        tokenList.push({
          ...value,
        });
      } else {
        iterateGroup(value);
      }
    }
  }
  if (tokens.hasOwnProperty('name')) {
    tokenList.push(tokens);
  } else {
    iterateGroup(tokens);
  }
  return tokenList;
}

export function TokenGroup({ variation, children }) {
  return (
    <ul className={`docs-tokenGroup docs-tokenGroup--${variation}`}>
      {children}
    </ul>
  );
}

export function TokenItem({ variation, children }) {
  return (
    <li>
      <div className={`docs-tokenItem docs-tokenItem--${variation}`}>
        {children}
      </div>
    </li>
  );
}

export function TokenPath({ path }) {
  return (
    <div className="docs-tokenItem-path">
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

export function TokenMeta({ children }) {
  return <div className="docs-tokenItem-meta">{children}</div>;
}
