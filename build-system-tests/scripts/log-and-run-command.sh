#!/bin/bash
# Adapted from https://stackoverflow.com/a/71118445
# -T flag allows shell functions to inherit the DEBUG trap
set -T

# `trap DEBUG` is invoked before each command is executed. 
# This evaluates whether log_and_run was invoked
trap 'test "$FUNCNAME" = log_and_run' DEBUG
# Prints and then executes a command
# "$@" will double quote each argument individually
log_and_run(){
    echo "$@"
    eval "$@"
}