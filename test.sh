#!/bin/bash
set -e

metric_name=" _h_i-hi "
value="1.1 "

metric_name_trimmed="$(echo -e "${metric_name}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr -d '\n')"
value_trimmed="$(echo -e "${value}" | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//' | tr -d '\n')"

echo $metric_name_trimmed

if ! [[ "$metric_name_trimmed" =~ ^[a-zA-Z0-9\ \_\-]+$ ]]; then
  echo "Metric name can only contain alphanumeric characters, space character, -, and _."
  exit 1
fi

if ! [[ "$value_trimmed" =~ ^[-+]?[0-9]+\.?[0-9]*$ ]]; then
  echo "Issue number must be a valid number"
  exit 1
fi
