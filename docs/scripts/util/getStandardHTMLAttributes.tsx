// include type/interface
// standard url prefix
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/

const standardHTMLAttributes = {
  Alert: {
    element: 'div',
  },
};

// if this still works, can we change it to a .ts file?
// const codeSnippet = <code></code>;

export const getStandardHTMLAttributes = (displayName: string) => {
  const { element, link } = standardHTMLAttributes[displayName];

  const MDNlink = `<Link href="${
    link ||
    `https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${element}`
  }" isExternal>MDN Documentation</Link>`;

  return `${displayName} will also accept any of the standard HTML attributes that a <code>${element}</code> accepts, which can be found in the ${MDNlink}.`;
};
