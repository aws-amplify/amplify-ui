import { WebTheme } from '@aws-amplify/ui';

export type Breakpoints = WebTheme['breakpoints']['values'];
export type Breakpoint = keyof WebTheme['breakpoints']['values'];
export type ValueBreakpoints<Value = unknown> = Partial<
  Record<Breakpoint, Value>
>;
export interface MediaQueryBreakpoint {
  breakpoint: Breakpoint;
  query: string;
  maxWidth: number | null;
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
