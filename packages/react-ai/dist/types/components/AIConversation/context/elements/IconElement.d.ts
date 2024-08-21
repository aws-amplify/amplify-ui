import React from 'react';
export type IconElementProps = React.ComponentProps<typeof BaseIconElement>;
export type IconVariant = 'attach' | 'close' | 'image' | 'send-message' | 'user-avatar';
export declare const DEFAULT_ICON_PATHS: Record<IconVariant, string>;
export declare const BaseIconElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<never, IconVariant, React.SVGProps<SVGSVGElement>>, SVGSVGElement>;
export declare const IconElement: import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElement<Omit<import("@aws-amplify/ui-react-core/dist/types/elements/types").BaseElementProps<never, IconVariant, React.SVGProps<SVGSVGElement>>, "ref"> & React.RefAttributes<SVGSVGElement>, SVGSVGElement>;
