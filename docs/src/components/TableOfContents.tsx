import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';
import { Heading } from '@aws-amplify/ui-react';

export const TableOfContents = ({ title, headings }) => {
  const [activeHeading, setActiveHeading] = useState(-1);

  let offsets = [...headings].map((heading) => {
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

  useEffect(() => {
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
  }, [headings]);

  return (
    <aside className="docs-toc" id="toc">
      <div className="docs-toc-inner">
        <Heading className="docs-toc-heading" level={6}>
          {title}
        </Heading>
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
      </div>
    </aside>
  );
};
