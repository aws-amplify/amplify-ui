#!/bin/sh

# Env Variale Inputs
# - SKIP_CYPRESS_BINARY (boolean): Skips cypress binary installation if true.
# - NO_LOCKFILE (boolean): Ignores yarn.lock file if true

if [ "$a" = "true" ]; then
  # Skip cypress binary installation if specified
  # https://docs.cypress.io/guides/references/advanced-installation#Environment-variables
  echo "[LOG]: Setting flag to skip cypress binary installation"
  export CYPRESS_INSTALL_BINARY=0;
fi

for i in {1..3}; do
  echo "===================="
  echo "Attempt $i out of 3:"
  echo "===================="

  if [ "$NO_LOCKFILE" = "true" ]; then
    echo "[LOG]: Ignoring yarn.lock file"
    yarn install --no-lockfile
  else
    yarn install
  fi

  # Check return value and exit early if successful
  return_value=$?
  [ $return_value -eq 0 ] && break
  echo "[ERROR]: yarn install failed with exit code $return_value, waiting to retry..."

  # Sleep 5 seconds before retrying
  sleep 5
done
