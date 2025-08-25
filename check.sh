#!/usr/bin/env bash
set -euo pipefail

check() {
  url="$1"
  echo "$url"
  response="$(curl -sS -w '\n%{http_code}' "$url")"
  body="$(printf '%s' "$response" | sed '$d')"
  code="$(printf '%s' "$response" | tail -n1)"
  echo "$body" | jq . 2>/dev/null || echo "$body"
  echo "HTTP $code"
  echo
}

check "https://dotface-print-on-demand.web.app/api/healthz"
check "https://dotface-print-on-demand.web.app/api/leaderboard"
check "https://dotface-print-on-demand.web.app/api/get-user-balance?user_id=demo"
