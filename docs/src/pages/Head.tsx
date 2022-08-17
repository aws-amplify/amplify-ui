import NextHead from 'next/head';
import { useRouter } from 'next/router';
import { capitalizeString } from '@/utils/capitalizeString';
import metaData from '@/data/pages.preval';
import { PREVIEW_HEIGHT, PREVIEW_WIDTH } from '@/data/preview';
import { SITE_NAME, TWITTER_HANDLE } from '@/data/general';

import { getImagePath } from '@/utils/previews';

export const Head = () => {
  const {
    asPath,
    pathname,
    query: { platform = 'react' },
  } = useRouter();

  const asPathname = pathname.replace('[platform]', String(platform));
  const filepath = `/${pathname
    .split('/')
    .filter((n) => n && n !== '[platform]')
    .join('/')}`;
  const { title, metaTitle, description, metaDescription } =
    metaData[pathname]?.frontmatter ?? {};

  if ((!description && !metaDescription) || (!title && !metaTitle)) {
    throw new Error(`Meta Info missing on ${filepath}`);
  }

  const homepagePaths = ['/', '/[platform]'];

  const pageTitle = homepagePaths.includes(pathname)
    ? `${metaTitle} on ${capitalizeString(platform)}`
    : `${metaTitle ?? title} | Amplify UI for ${capitalizeString(platform)}`;

  const _description = metaDescription || description;

  return (
    <NextHead>
      {homepagePaths.includes(pathname) ? (
        <link rel="canonical" href={process.env.SITE_URL} />
      ) : null}
      <title>{pageTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={_description} />

      {/* Open Graph */}
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={_description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:url" content={`${process.env.SITE_URL}${asPath}`} />
      <meta
        property="og:image"
        content={process.env.SITE_URL + getImagePath(asPathname)}
      />
      <meta property="og:image:width" content={String(PREVIEW_WIDTH)} />
      <meta property="og:image:height" content={String(PREVIEW_HEIGHT)} />
      <meta
        property="og:image:secure_url"
        content={process.env.SITE_URL + getImagePath(asPathname)}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content={_description} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:url" content={`${process.env.SITE_URL}${asPath}`} />
      <meta name="twitter:description" content={_description} />
      <meta
        name="twitter:image"
        content={process.env.SITE_URL + getImagePath(asPathname)}
      />
    </NextHead>
  );
};
