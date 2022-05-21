export interface MetaInfo {
  [pathname: string]: {
    frontmatter: {
      metaTitle: string;
      metaDescription: string;
      supportedFrameworks: string;
    };
  };
}

export const META_INFO: MetaInfo = {
  '/': {
    frontmatter: {
      metaTitle: 'Home',
      metaDescription:
        'Amplify UI is an open-source design system with cloud-connected components and primitives that simplify building accessible, performant, and beautiful applications in React, Angular, Vue, and Flutter (more coming soon).',
      supportedFrameworks: 'all',
    },
  },
  '/[platform]': {
    frontmatter: {
      metaTitle: 'Home',
      metaDescription:
        'Amplify UI is an open-source design system with cloud-connected components and primitives that simplify building accessible, performant, and beautiful applications in React, Angular, Vue, and Flutter (more coming soon).',
      supportedFrameworks: 'all',
    },
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
