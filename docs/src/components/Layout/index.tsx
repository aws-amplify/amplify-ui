// This is large copy-pasta from `amplify-docs/src/components/Page/index.tsx` & modified to work outside of that repo.
// You can identify the changes needed by copy/pasting a newer version, then resolving diffs
import pages from '@/data/pages.preval';
import capitalize from 'lodash/capitalize';
import groupBy from 'lodash/groupBy';
import words from 'lodash/words';
import debounce from 'lodash/debounce';
import * as React from 'react';
import { Banner } from '../Banner';

import { useRouter } from 'next/router';
import { traverseHeadings } from 'amplify-docs/src/utils/traverseHeadings';
import { gatherAllFilters } from 'amplify-docs/src/utils/gatherFilters';
import CodeBlockProvider from 'amplify-docs/src/components/CodeBlockProvider/index';
import Layout from 'amplify-docs/src/components/Layout/index';
import Menu from 'amplify-docs/src/components/Menu/index';
import TableOfContents from 'amplify-docs/src/components/TableOfContents/index';
import NextPrevious from 'amplify-docs/src/components/NextPrevious/index';
import {
  ContentStyle,
  ChapterTitleStyle,
} from 'amplify-docs/src/components/Page/styles';
import {
  getChapterDirectory,
  isProductRoot,
} from 'amplify-docs/src/utils/getLocalDirectory';
import SidebarLayoutToggle from 'amplify-docs/src/components/SidebarLayoutToggle';
import { useRef, useState } from 'react';
import { MQTablet } from 'amplify-docs/src/components/media';
import {
  filterMetadataByOption,
  SelectedFilters,
} from 'amplify-docs/src/utils/filter-data';
import ChooseFilterPage from 'amplify-docs/src/pages/ChooseFilterPage';
import { parseLocalStorage } from 'amplify-docs/src/utils/parseLocalStorage';
import { withFilterOverrides } from 'amplify-docs/src/utils/withFilterOverrides';

const folderToTitle = (folder: string) =>
  words(folder).map(capitalize).join(' ');

// Mutate directory object to use new UI docs instead of amplify-docs
const directory = require('amplify-docs/src/directory/directory');
const sortedFolders = ['', 'getting-started'];
const groupedPages = Object.entries(
  groupBy(pages, (page) => {
    const [, folder = ''] = page.slug.split('/');
    return folder;
  })
).sort((a, b) => {
  if (sortedFolders.includes(a[0])) {
    if (sortedFolders.includes(b[0])) {
      return sortedFolders.indexOf(a[0]) - sortedFolders.indexOf(b[0]);
    } else {
      return -1;
    }
  }

  return a[0].localeCompare(b[0]);
});

export default function Page({
  children,
  frontmatter,
}: {
  children: any;
  frontmatter?: any;
}) {
  const meta = {
    ...frontmatter,
  };

  const [headers, setHeaders] = React.useState([]);
  React.useLayoutEffect(() => {
    const updateHeaders = debounce(
      () => {
        const htmlHeaders = [
          ...document.querySelectorAll(
            [
              '#__next > section:first-of-type a > h2[id]',
              '#__next > section:first-of-type a > h3[id]',
            ].join(',')
          ),
        ].map((node: HTMLHeadingElement) => [
          node.innerText,
          node.id,
          node.tagName.toLowerCase(),
        ]);

        setHeaders(htmlHeaders);
      },
      0,
      {
        leading: false,
        trailing: true,
      }
    );

    const observer = new MutationObserver(updateHeaders);

    observer.observe(document.querySelector('#__next'), {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [children]);

  const router = useRouter();
  if (!router.isReady) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    useRef(null);
    return <></>;
  }
  let url = router.pathname;
  // remove trailing slash.  this is important on pages like /cli/index.mdx
  // or /console/index.mdx where router.asPath has a trailing slash and
  // router.pathname doesn't.
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  const directoryPath = router.pathname;
  let filterKey = 'react',
    filterKind = '';
  const filterKeysLoaded = parseLocalStorage(
    'filterKeys',
    {} as SelectedFilters
  );
  const filterKeyUpdates = {} as SelectedFilters;
  if ('platform' in router.query) {
    filterKey = router.query.platform as string;
    filterKeyUpdates.platform = filterKey;
    filterKind = 'platform';
  } else if ('integration' in router.query) {
    filterKey = router.query.integration as string;
    filterKeyUpdates.integration = filterKey;
    filterKind = 'integration';
  } else if ('framework' in router.query) {
    filterKey = router.query.framework as string;
    filterKeyUpdates.framework = filterKey;
    filterKind = 'framework';
  }
  let filters = ['angular', 'react', 'vue']; // gatherAllFilters(children, filterKind);
  // special cases
  if (url.startsWith('/guides')) {
    filters = filters.filter((filter) => filter !== 'flutter');
  }
  if (url.startsWith('/sdk')) {
    filters = filters.filter(
      (filter) => filter !== 'flutter' && filter !== 'js'
    );
  }

  const overrides = withFilterOverrides(filterKeyUpdates, filterKeysLoaded);
  const filterKeys = {
    ...filterKeysLoaded,
    ...overrides,
  };

  localStorage.setItem('filterKeys', JSON.stringify(filterKeys));
  if (filters.length !== 0 && !filters.includes(filterKey) && meta) {
    return (
      <ChooseFilterPage
        directoryPath="/ChooseFilterPage"
        address={router.pathname}
        filterKind={filterKind}
        filters={filters}
        currentFilter={filterKey}
        message={`${filterMetadataByOption[filterKey].label} is not supported on this page.  Please select one of the following:`}
      />
    );
  }
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const currentPage = pages.find(({ href }) => href === router.pathname);
  meta.chapterTitle = folderToTitle(currentPage?.slug.split('/')[1] ?? '');

  const basePath = 'docs.amplify.aws';
  meta.url = basePath + router.pathname;
  if (filterKey !== '') {
    meta.description += ` - ${filterMetadataByOption[filterKey].label}`;
  }

  // Dynamically set the Menu URLs to include ?platform=${filterKey}
  directory.ui = directory.ui || {};
  directory.ui.items = {};

  groupedPages.forEach(([folder, pages]) => {
    if (!folder) {
      return;
    }

    directory.ui.items[folder] = {
      title: folderToTitle(folder),
      items: pages.map((page) => ({
        title: page.frontmatter.title,
        route: `${page.href}?platform=${filterKey}`,
        filters: ['angular', 'react', 'vue'],
      })),
    };
  });

  return (
    <Layout meta={meta}>
      {meta
        ? metaContent({
            title: meta.title,
            chapterTitle: meta.chapterTitle,
            headers,
            children,
            filters,
            filterKey,
            filterKind,
            url,
            directoryPath,
            menuIsOpen,
            setMenuIsOpen,
          })
        : children}
    </Layout>
  );
}

export function metaContent({
  title,
  chapterTitle,
  headers,
  children,
  filters,
  filterKey,
  filterKind,
  url,
  directoryPath,
  menuIsOpen,
  setMenuIsOpen,
}) {
  const menuRef = useRef(null);
  // Slice off the "@media " string at the start for use in JS instead of CSS
  const MQTabletJS = MQTablet.substring(6);
  // If the media query matches, then the user is on desktop and should not see the mobile toggle
  const onDesktop =
    typeof window === 'undefined'
      ? false
      : window.matchMedia(MQTabletJS).matches;
  return (
    <>
      <Menu
        filters={filters}
        filterKey={filterKey}
        filterKind={filterKind}
        url={url}
        directoryPath={directoryPath}
        ref={menuRef}
        setMenuIsOpen={setMenuIsOpen}
      ></Menu>
      <ContentStyle menuIsOpen={menuIsOpen}>
        <Banner />

        <div>
          <ChapterTitleStyle>{chapterTitle}</ChapterTitleStyle>
          <h1>{title}</h1>
          <CodeBlockProvider>
            {children}
            <NextPrevious url={url} filterKey={filterKey} />
          </CodeBlockProvider>
        </div>
      </ContentStyle>
      <TableOfContents title={title}>{headers}</TableOfContents>
      {!onDesktop && (
        <SidebarLayoutToggle menuRef={menuRef}>
          <img
            alt="Open menu"
            className="burger-graphic"
            src="/assets/burger.svg"
          />
          <img
            alt="Close menu"
            className="ex-graphic"
            src="/assets/close.svg"
          />
        </SidebarLayoutToggle>
      )}
    </>
  );
}
