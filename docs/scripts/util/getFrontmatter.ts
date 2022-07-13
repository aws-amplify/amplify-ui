export function getFrontmatter(fileData: string) {
  // get MDN URL
  const mdn = fileData.indexOf('mdnUrl');
  const endOfLine1 = fileData.indexOf('\n', mdn);
  const mdnUrl = fileData.slice(mdn, endOfLine1).split(' ')[1];

  // get htmlElement
  const el = fileData.indexOf('htmlElement');
  const endOfLine2 = fileData.indexOf('\n', el);
  const htmlElement = fileData.slice(el, endOfLine2).split(' ')[1];

  return { mdnUrl, htmlElement };
}
