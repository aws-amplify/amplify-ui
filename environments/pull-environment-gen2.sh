#!/bin/bash
set -e
IFS='|'

# Get args
dir=$1

cd $dir

yarn generate
