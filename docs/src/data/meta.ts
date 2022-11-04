export interface PathMeta {
  frontmatter: {
    title?: string;
    description?: string;
    metaTitle?: string;
    metaDescription?: string;
    mdnUrl?: string;
    htmlElement?: string;
    supportedFrameworks?: string;
    slug?: string;
  };
  slug?: string;
  href?: string;
}

export interface MetaInfo {
  [pathname: string]: PathMeta;
}

export const META_INFO: MetaInfo = {
  '/': {
    frontmatter: {
      metaTitle: 'Amplify UI - Build UI fast with Amplify',
      metaDescription:
        'Amplify UI simplifies building accessible, performant, and beautiful applications with cloud-connected capabilities, building blocks, theming, and utilities.',
      supportedFrameworks: 'all',
      slug: '',
    },
    slug: '',
  },
  '/[platform]': {
    frontmatter: {
      metaTitle: 'Amplify UI - Build UI fast with Amplify',
      metaDescription:
        'Amplify UI simplifies building accessible, performant, and beautiful applications with cloud-connected capabilities, building blocks, theming, and utilities.',
      supportedFrameworks: 'all',
      slug: '[platform]',
    },
    slug: '[platform]',
  },
  '/[platform]/studio/create-form': {
    frontmatter: {
      metaTitle: 'Amplify UI - Build UI fast with Amplify',
      metaDescription:
        'Amplify UI simplifies building accessible, performant, and beautiful applications with cloud-connected capabilities, building blocks, theming, and utilities.',
      supportedFrameworks: 'all',
      slug: '[platform]',
    },
    slug: '[platform]',
  },
  '/[platform]/studio/figma': {
    frontmatter: {
      metaTitle: 'Amplify UI - Build UI fast with Amplify',
      metaDescription:
        'Amplify UI simplifies building accessible, performant, and beautiful applications with cloud-connected capabilities, building blocks, theming, and utilities.',
      supportedFrameworks: 'all',
      slug: '[platform]',
    },
    slug: '[platform]',
  },
  '/404': {
    frontmatter: {
      metaTitle: '404',
      metaDescription: 'Page Not Found',
      supportedFrameworks: 'all',
    },
  },
  '/_error': {
    frontmatter: {
      metaTitle: 'Error',
      metaDescription: 'Error',
      supportedFrameworks: 'all',
    },
  },
  '/500': {
    frontmatter: {
      metaTitle: 'Error',
      metaDescription: 'Error',
      supportedFrameworks: 'all',
    },
  },
};
