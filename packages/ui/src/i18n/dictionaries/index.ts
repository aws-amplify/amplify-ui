// Re-export the per-language dictionaries instead of copying them with object
// spreads. A top-level `{ ...dict }` is kept by some bundlers (e.g. Rolldown and
// esbuild) as a possible side effect, which pulls every language dictionary into
// the bundle even when only `defaultTexts` is used.
//
// If dictionaries from other modules need to be merged into a locale in the
// future, keep the merge tree-shakeable, e.g.
// `export const deDict = /* @__PURE__ */ Object.assign({}, authenticatorDeDict, otherDeDict);`
export {
  deDict,
  enDict,
  esDict,
  frDict,
  huDict,
  itDict,
  jaDict,
  krDict,
  nbDict,
  nlDict,
  plDict,
  ptDict,
  zhDict,
  svDict,
  idDict,
  trDict,
  ruDict,
  heDict,
  uaDict,
  thDict,
  defaultTexts,
} from './authenticator';
