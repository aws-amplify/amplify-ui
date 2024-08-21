import React from 'react';
import { Avatars } from '../types';
type AvatarContextProps = Avatars | undefined;
export declare const AvatarsContext: React.Context<AvatarContextProps>;
export declare const AvatarsProvider: ({ children, avatars, }: {
    children?: React.ReactNode;
    avatars: Avatars;
}) => JSX.Element;
export {};
