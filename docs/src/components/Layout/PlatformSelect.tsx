// Copied from ./node_modules/amplify-docs/src/components/Menu/index.tsx
import {
  CurrentlySelectedStyle,
  DropdownStyle,
  PlatformSelectStyle,
} from 'amplify-docs/src/components/Menu/styles';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

type PlatformSelectProps = {
  filters: string[];
  platform: string;
  pathname: string;
};

type PlatformSelectState = {
  isOpen: boolean;
};

type FilterMetadataByOption<T extends readonly string[]> = Record<
  T[number],
  FilterOptionMetadata
>;

interface FilterOptionMetadata {
  label: string;
  graphicURI: string;
}

// https://github.com/aws-amplify/docs/blob/c5a98ecd72bb7c3ccfab669f2ddb195096d25053/src/utils/filter-data.ts
export const filterMetadataByOption: FilterMetadataByOption<typeof FILTER_OPTIONS> = {
  js: {
    label: 'JavaScript',
    graphicURI: '/assets/integrations/js.svg',
  },
  android: {
    label: 'Android',
    graphicURI: '/assets/integrations/android.svg',
  },
  ios: {
    label: 'iOS',
    graphicURI: '/assets/integrations/ios.svg',
  },
  flutter: {
    label: 'Flutter',
    graphicURI: '/assets/integrations/flutter.svg',
  },

  react: {
    label: 'React',
    graphicURI: '/assets/integrations/react.svg',
  },
  'react-native': {
    label: 'React Native',
    graphicURI: '/assets/integrations/react-native.svg',
  },
  angular: {
    label: 'Angular',
    graphicURI: '/assets/integrations/angular.svg',
  },
  vue: {
    label: 'Vue',
    graphicURI: '/assets/integrations/vue.svg',
  },
  ionic: {
    label: 'Ionic',
    graphicURI: '/assets/integrations/ionic.svg',
  },
  next: {
    label: 'Next.js',
    graphicURI: '/assets/integrations/next.svg',
  },
} as const;

/**
 * filter constants
 */
export const FILTER_OPTIONS = [
  'js',
  'android',
  'ios',
  'flutter',
  'react',
  'react-native',
  'angular',
  'vue',
  'ionic',
  'next',
];

export class PlatformSelect extends React.Component<
  PlatformSelectProps,
  PlatformSelectState
> {
  wrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.closeMenu = this.closeMenu.bind(this);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.closeMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.closeMenu);
  }

  closeMenu = (event: MouseEvent) => {
    if (
      this.wrapperRef &&
      !this.wrapperRef.current.contains(event.target as Node) &&
      this.state.isOpen
    ) {
      this.setState({
        isOpen: false,
      });
    }
  };

  toggleVis = () => {
    this.setState(oldState => {
      return { isOpen: !oldState.isOpen };
    });
  };

  render() {
    return (
      <PlatformSelectStyle ref={this.wrapperRef}>
        <CurrentlySelectedStyle>
          <a onClick={this.toggleVis}>
            <Image
              src={filterMetadataByOption[this.props.platform].graphicURI}
              height="28px"
              width="28px"
            />
            <span>{filterMetadataByOption[this.props.platform].label}</span>
          </a>
        </CurrentlySelectedStyle>
        <DropdownStyle shouldDisplay={this.state.isOpen}>
          {this.props.filters.map(name => {
            if (name === this.props.platform) return;
            return (
              <Link
                href={{
                  pathname: this.props.pathname,
                  query: { platform: name },
                }}
                key={name}
              >
                <a onClick={this.toggleVis}>
                  <Image
                    src={filterMetadataByOption[name].graphicURI}
                    height="28px"
                    width="28px"
                  />
                  <span>{filterMetadataByOption[name].label}</span>
                </a>
              </Link>
            );
          })}
        </DropdownStyle>
      </PlatformSelectStyle>
    );
  }
}
