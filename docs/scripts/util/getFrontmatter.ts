import { MetaInfo } from '@/data/meta';

/*

Returns the frontmatter as an object of key/value pairs. For example:

Input (string):

---
title: Flex
mdnUrl: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div
htmlElement: div
---

Output (object):

{
  title: 'Flex',
  mdnUrl: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div',
  htmlElement: 'div',
}

*/

export function getFrontmatter(fileData: string) {
  const frontmatter = fileData.split('---')[1].trim().split('\n');

  return frontmatter.reduce((acc, line) => {
    const [key, value] = line.split(' ');
    return { ...acc, [key]: value };
  }, {}) as MetaInfo;
}
