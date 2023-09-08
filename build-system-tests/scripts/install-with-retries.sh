#!/bin/bash

# Runs `npm` or `yarn` install with retries
# Takes 2 parameters: the package manager and the dependencies to be installed
# Usage:  install_with_retries npm "$DEPENDENCIES" or  install_with_retries yarn "$DEPENDENCIES"
install_with_retries() {
    local retries=3
    local attempt=1
    while [ $attempt -le $retries ]; do
        echo "Attempt $attempt/$retries"
        echo "$1 install $2"
        "$1" install $2
        if [ $? -eq 0 ]; then
            echo "$1 install successful."
            break
        fi
        attempt=$((attempt + 1))
        if [ $attempt -le $retries ]; then
            echo "$1 install failed. Retrying in 5 seconds..."
            sleep 5
        else
            echo "$1 install failed after $retries attempts."
            exit 1
        fi
    done
}
