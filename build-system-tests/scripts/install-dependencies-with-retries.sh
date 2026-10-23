#!/bin/bash

# Runs `npm` or `yarn` install with retries
# Takes 2 parameters: the package manager and the dependencies to be installed
# Usage:  install_with_retries npm "$DEPENDENCIES" or  install_with_retries yarn "$DEPENDENCIES"
install_dependencies_with_retries() {
    local retries=5
    local attempt=1
    local extra_args=""
    if [ "$1" == "npm" ]; then
        # Revalidate cached packuments from the start so freshly published versions resolve.
        extra_args="--prefer-online"
    fi
    echo "Disable exit-on-error temporarily"
    echo "set +e"
    set +e
    while [ $attempt -le $retries ]; do
        echo "Attempt $attempt/$retries"
        echo "$1 install $2 $extra_args"
        "$1" install $2 $extra_args
        if [ $? -eq 0 ]; then
            echo "$1 install successful."
            echo "Re-enable exit-on-error"
            echo "set -e"
            set -e
            break
        fi
        # Add exponential backoff delay between failed attempts
        # [60/120/240/480]s ~= 15min total, long enough to outlast npm registry
        # propagation of freshly published versions (CDN-cached packuments).
        local wait=$((60 * 2 ** (attempt - 1)))
        attempt=$((attempt + 1))
        if [ $attempt -le $retries ]; then
            echo "$1 install failed. Retrying in $wait seconds..."
            sleep $wait
            if [ "$1" == "npm" ]; then
                # A failed resolution (e.g. ETARGET) leaves a stale packument in npm's
                # local cache; drop it and force revalidation against the registry so the
                # retry can see newly published versions.
                echo "npm cache clean --force"
                npm cache clean --force
            fi
        else
            echo "$1 install failed after $retries attempts."
            echo "Re-enable exit-on-error"
            echo "set -e"
            set -e
            exit 1
        fi
    done
}
