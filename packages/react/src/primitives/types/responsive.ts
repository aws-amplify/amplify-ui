import { Theme } from '@aws-amplify/ui';

export type Breakpoints = Theme['breakpoints']['values'];
export type Breakpoint = keyof Theme['breakpoints']['values'];
export interface MediaQueryBreakpoint {
  breakpoint: Breakpoint;
  query: string;
  maxWidth: number;
  minWidth: number;
}

export interface GetMediaQueriesParams {
  breakpoints: Breakpoints;
}

export interface GetMediaQueries {
  (params: GetMediaQueriesParams): MediaQueryBreakpoint[];
}

export interface UseBreakpointParams {
  breakpoints: Breakpoints;
  defaultBreakpoint: Breakpoint;
}

export interface UseBreakpoint {
  (params: UseBreakpointParams): Breakpoint;
}
