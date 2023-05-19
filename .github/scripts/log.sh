#!/bin/bash

log() {
  blueBold="\x1b[1;36m"
  greenBold="\x1b[1;32m"
  redBold="\x1b[1;31m"
  yellowBold="\x1b[1;33m"
  colorEnd="\x1b[0m"

  case $1 in
  "warning")
    echo -e "${yellowBold}[WARNING...] $2${colorEnd}" >&2
    ;;
  "error")
    echo -e "${redBold}[ERROR...] $2${colorEnd}" >&2
    ;;
  "success")
    echo -e "${greenBold}[SUCCESS...] $2${colorEnd}"
    ;;
  "command")
    echo -e "${blueBold}[RUNNING...] $2${colorEnd}"
    ;;
  "info")
    echo -e "${blueBold}[INFO...] $2${colorEnd}"
    ;;
  *)
    echo "$2"
    ;;
  esac
}
