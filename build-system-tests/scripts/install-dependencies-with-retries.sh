#!/bin/bash

# Runs `<package manager> install <dependencies>` with retries on transient registry failures
# Takes 2 parameters: the package manager and the dependencies to be installed
# Intended for npm-style `install <pkg ...>`; yarn 1 rejects `yarn install <pkg>` (use `yarn add`).
# Usage:  install_dependencies_with_retries npm "$DEPENDENCIES"

# Failures expected to clear up on retry: versions not yet visible on the registry (CDN-cached
# packuments right after publishing), network errors, and registry 5xx responses. Any other
# failure (e.g. ERESOLVE peer conflicts) is deterministic and fails fast.
TRANSIENT_INSTALL_ERROR_PATTERN='ETARGET|E404|ETIMEDOUT|ECONNRESET|EAI_AGAIN|ENOTFOUND|ECONNREFUSED|socket hang up|No matching version found|Couldn'"'"'t find any versions|E50[0234]'

install_dependencies_with_retries() {
    local retries=5
    local attempt=1
    local extra_args=""
    local output status
    if [ "$1" == "npm" ]; then
        # Revalidate cached packuments on every attempt so freshly published versions resolve.
        extra_args="--prefer-online"
    fi
    echo "Disable exit-on-error temporarily"
    echo "set +e"
    set +e
    while [ $attempt -le $retries ]; do
        echo "Attempt $attempt/$retries"
        echo "$1 install $2 $extra_args"
        # Capture the attempt's output to classify the failure while still streaming it to the log.
        output="$(mktemp "${RUNNER_TEMP:-${TMPDIR:-/tmp}}/install-attempt.XXXXXX")"
        "$1" install $2 $extra_args 2>&1 | tee "$output"
        status=${PIPESTATUS[0]}
        if [ "$status" -eq 0 ]; then
            rm -f "$output"
            echo "$1 install successful."
            echo "Re-enable exit-on-error"
            echo "set -e"
            set -e
            break
        fi
        if ! grep -qE "$TRANSIENT_INSTALL_ERROR_PATTERN" "$output"; then
            rm -f "$output"
            echo "$1 install failed (exit $status) with a non-transient error; not retrying."
            echo "Re-enable exit-on-error"
            echo "set -e"
            set -e
            exit 1
        fi
        rm -f "$output"
        # Add exponential backoff delay between failed attempts
        # [60/120/240/480]s ~= 15min total, long enough to outlast npm registry
        # propagation of freshly published versions (CDN-cached packuments).
        local wait=$((60 * 2 ** (attempt - 1)))
        attempt=$((attempt + 1))
        if [ $attempt -le $retries ]; then
            echo "$1 install failed with a transient error. Retrying in $wait seconds..."
            sleep $wait
        else
            echo "$1 install failed after $retries attempts."
            echo "Re-enable exit-on-error"
            echo "set -e"
            set -e
            exit 1
        fi
    done
}
