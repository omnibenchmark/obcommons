#!/usr/bin/env bash
# Every registry entry must point at a repo + commit that actually exists.
# Usage: scripts/check-repos.sh modules/*.yaml
set -uo pipefail

fail=0
for f in "$@"; do
  [ -f "$f" ] || continue
  url=$(sed -n 's/^[[:space:]]*url:[[:space:]]*//p' "$f" | head -1 | tr -d "\"'" | tr -d '\r')
  commit=$(sed -n 's/^[[:space:]]*commit:[[:space:]]*//p' "$f" | head -1 | tr -d "\"'" | tr -d '\r')
  if [ -z "$url" ] || [ -z "$commit" ]; then
    echo "FAIL $f: no repository url/commit"
    fail=1
    continue
  fi

  tmp=$(mktemp -d)
  # Blobless bare clone — cheap for module repos, and unlike fetch-by-sha
  # it works with short commits. Swap to a forge API if some repo's history gets huge.
  if git clone --quiet --bare --filter=blob:none "$url" "$tmp/repo" 2>/dev/null &&
    git -C "$tmp/repo" cat-file -e "${commit}^{commit}" 2>/dev/null; then
    echo "ok   $f  $commit"
  else
    echo "FAIL $f  $url @ $commit does not resolve"
    fail=1
  fi
  rm -rf "$tmp"
done
exit $fail
