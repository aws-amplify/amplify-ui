export declare function useAuth(): [
  import('xstate').State<
    import('@aws-amplify/ui-core').AuthContext,
    import('@aws-amplify/ui-core').AuthEvent,
    any,
    {
      value: any;
      context: import('@aws-amplify/ui-core').AuthContext;
    }
  >,
  (
    event:
      | import('xstate').SingleOrArray<
          import('xstate').Event<import('@aws-amplify/ui-core').AuthEvent>
        >
      | import('xstate').SCXML.Event<import('@aws-amplify/ui-core').AuthEvent>,
    payload?: import('xstate').EventData
  ) => import('xstate').State<
    import('@aws-amplify/ui-core').AuthContext,
    import('@aws-amplify/ui-core').AuthEvent,
    any,
    {
      value: any;
      context: import('@aws-amplify/ui-core').AuthContext;
    }
  >
];
