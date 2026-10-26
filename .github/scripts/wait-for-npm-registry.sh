#!/bin/bash
# Waits until freshly published package versions are resolvable from the npm registry.
#
# The npm registry is eventually consistent: package documents (packuments) are CDN-cached, so a
# version can be published successfully yet still be missing for clients for several minutes.
# Installing during that window fails with ETARGET, typically on an exact-pinned sibling dependency
# (e.g. `@aws-amplify/ui-react@<snapshot>` depending on `@aws-amplify/ui@<snapshot>`).
#
# Observed propagation: the packument's `last-modified` trails the end of the publish job by about
# 5 minutes, and CDN edges then serve it with `cache-control: max-age=300`, so clients can see stale
# data for roughly 10 minutes after publishing. The default timeout of 15 minutes covers that window
# with margin.
#
# yarn resolves from https://registry.yarnpkg.com, which is fronted by a separate CDN cache from
# registry.npmjs.org, so the abbreviated packument is checked on both hosts.
#
# Usage:
#   wait-for-npm-registry.sh <version> [package ...]
#
# When no packages are given, every non-private yarn workspace whose local version equals <version>
# is checked, i.e. exactly the packages `changeset publish` released at that version.
#
# Environment:
#   WAIT_TIMEOUT_SECONDS   overall timeout (default: 900)
#   WAIT_INTERVAL_SECONDS  delay between polling rounds (default: 15)
set -euo pipefail

VERSION="${1:-}"
if [[ -z "$VERSION" ]]; then
  echo "Usage: $0 <version> [package ...]" >&2
  exit 2
fi
shift

TIMEOUT_SECONDS="${WAIT_TIMEOUT_SECONDS:-900}"
INTERVAL_SECONDS="${WAIT_INTERVAL_SECONDS:-15}"
REGISTRY="$(npm config get registry)"
REGISTRY="${REGISTRY%/}"
YARN_REGISTRY="https://registry.yarnpkg.com"
# Hosts whose abbreviated packument must list the version (deduplicated if npm already uses yarn's).
CORGI_REGISTRIES=("$REGISTRY")
if [[ "$REGISTRY" != "$YARN_REGISTRY" ]]; then
  CORGI_REGISTRIES+=("$YARN_REGISTRY")
fi

if [[ $# -gt 0 ]]; then
  PACKAGES=("$@")
else
  # `yarn workspaces info` prints a JSON map of workspace name -> { location, ... }.
  mapfile -t PACKAGES < <(
    yarn --silent workspaces info | node -e '
      const version = process.argv[1];
      const workspaces = JSON.parse(require("fs").readFileSync(0, "utf8"));
      for (const { location } of Object.values(workspaces)) {
        const pkg = require(require("path").resolve(location, "package.json"));
        if (!pkg.private && pkg.version === version) console.log(pkg.name);
      }
    ' "$VERSION"
  )
fi

if [[ ${#PACKAGES[@]} -eq 0 ]]; then
  echo "::error::No packages found at version $VERSION to wait for."
  exit 1
fi

echo "Waiting up to ${TIMEOUT_SECONDS}s for ${#PACKAGES[@]} package(s) at $VERSION on ${CORGI_REGISTRIES[*]}:"
printf '  %s\n' "${PACKAGES[@]}"

# A version counts as available only when both views of the registry include it:
# - `npm view --prefer-online` revalidates npm's local cache against the full packument.
# - The abbreviated ("corgi") packument is what `npm install` resolves against, and the CDN
#   caches it separately from the full packument, so it can lag behind. It is checked on every
#   host in CORGI_REGISTRIES (npm's configured registry and yarn's).
# This only proves visibility from this runner's CDN edge; other runners may hit a different edge
# that still serves a stale packument, so install retries remain as a fallback downstream.
# Succeeds when the abbreviated packument of <pkg> on <registry> lists $VERSION.
has_version_in_corgi() {
  local registry="$1" pkg="$2"
  curl -fsSL --max-time 30 -H 'Accept: application/vnd.npm.install-v1+json' \
    "$registry/${pkg/\//%2f}" 2>/dev/null |
    node -e '
      const doc = JSON.parse(require("fs").readFileSync(0, "utf8"));
      process.exit(doc.versions && doc.versions[process.argv[1]] ? 0 : 1);
    ' "$VERSION"
}

is_available() {
  local pkg="$1" registry
  # Compare directly instead of piping into `grep -q`: under pipefail, grep exiting early can
  # SIGPIPE `npm view` and turn a match into a false negative.
  [[ "$(npm view "$pkg@$VERSION" version --prefer-online --fetch-timeout=30000 2>/dev/null)" == "$VERSION" ]] || return 1
  for registry in "${CORGI_REGISTRIES[@]}"; do
    has_version_in_corgi "$registry" "$pkg" || return 1
  done
}

pending=("${PACKAGES[@]}")
start=$SECONDS
while true; do
  still_pending=()
  for pkg in "${pending[@]}"; do
    if ! is_available "$pkg"; then
      still_pending+=("$pkg")
    fi
  done

  elapsed=$((SECONDS - start))
  if [[ ${#still_pending[@]} -eq 0 ]]; then
    echo "All ${#PACKAGES[@]} packages available at $VERSION after ${elapsed}s."
    exit 0
  fi

  if [[ $elapsed -ge $TIMEOUT_SECONDS ]]; then
    echo "::error::Timed out after ${elapsed}s waiting for npm registry to serve $VERSION of: ${still_pending[*]}"
    exit 1
  fi

  echo "[${elapsed}s] Not yet resolvable: ${still_pending[*]}. Retrying in ${INTERVAL_SECONDS}s..."
  pending=("${still_pending[@]}")
  sleep "$INTERVAL_SECONDS"
done
