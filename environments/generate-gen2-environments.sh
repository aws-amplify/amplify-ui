#!/bin/bash

# naive script iterating over the "gen2" subdirs of the dir the script is executed from
# executing the generate command for each
for dir in gen2/*/; do yarn --cwd "$dir" generate; done
