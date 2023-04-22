import * as React from 'react';
import debounce from 'lodash/debounce';
import { Text, ScrollView } from '@aws-amplify/ui-react';

export const TableOfContents = ({ title, headings }) => {
  const [activeHeading, setActiveHeading] = React.useState(-1);

  const offsets = [...headings].map((heading) => {
    return heading.top;
  });

  const scrollHandler = debounce((e) => {
    const bodyScroll = e.target.documentElement.scrollTop;
    let index = -1;

    while (index <= offsets.length - 2) {
      if (bodyScroll < offsets[index + 1] - 200) {
        break;
      }
      index++;
    }

    setActiveHeading(index);
  });

  React.useEffect(() => {
    // if the URL has a hash, set the active heading
    // so the right ToC link is active on page load
    if (document.location.hash) {
      const index = [...headings].findIndex(({ id }) => {
        return id === document.location.hash.replace('#', '');
      });
      setActiveHeading(index);
    }
    document.addEventListener('scroll', scrollHandler);
    return function cleanup() {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [headings, scrollHandler]);

  return (
    <aside className="docs-toc" id="toc">
      <ScrollView className="docs-toc-inner">
        <Text className="docs-toc-heading">{title}</Text>
        {headings.map(({ id, label, level }, i) => (
          <a
            key={id}
            className={`docs-toc-link level-${level} ${
              i === activeHeading ? 'active' : ''
            }`}
            href={`#${id}`}
          >
            {label}
          </a>
        ))}
      </ScrollView>
    </aside>
  );
};
