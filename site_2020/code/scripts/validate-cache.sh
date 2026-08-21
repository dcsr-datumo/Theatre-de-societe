#!/usr/bin/env bash

set -euo pipefail

file="${1:?cache file is required}"
cache_name="${2:-$(basename "$file")}"

case "$cache_name" in
  authors_cache.json)
    expression='type == "array" and length > 0 and all(.[];
      (.id | type == "string" and length > 0) and
      (.familyName | . == null or type == "string") and
      (.givenName | . == null or type == "string") and
      (.pseudonym | . == null or type == "string"))'
    ;;
  calendar_cache.json)
    expression='type == "array" and length > 0 and all(.[];
      (.year | type == "string" and length > 0) and
      (.representations | type == "string")) and
      ((map(.year) | length) == (map(.year) | unique | length))'
    ;;
  places_cache.json)
    expression='type == "array" and length > 0 and all(.[];
      (.id | type == "string" and length > 0) and
      (.name | type == "string") and
      (.coord | . == null or type == "string") and
      (.notices | . == null or type == "string") and
      (.minDate | . == null or type == "string") and
      (.maxDate | . == null or type == "string")) and
      ((map(.id) | length) == (map(.id) | unique | length))'
    ;;
  works_cache.json)
    expression='type == "array" and length > 0 and all(.[];
      (.id | type == "string" and length > 0) and
      (.title | type == "string") and
      (.name | . == null or type == "string") and
      (.authorIds | . == null or type == "string")) and
      ((map(.id) | length) == (map(.id) | unique | length))'
    ;;
  *)
    echo "Unknown cache name: $cache_name" >&2
    exit 2
    ;;
esac

jq -e "$expression" "$file" >/dev/null
