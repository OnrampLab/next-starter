#!/bin/bash
set -e

git fetch origin master:refs/remotes/origin/master
git diff origin/master HEAD --name-only --diff-filter ACMR | egrep '\.(js|jsx|ts|tsx)$' | xargs $(npm bin)/eslint --format junit -o reports/eslint/js-lint-results.xml
RESULT=$?

[ $RESULT -ne 0 ] && exit 1
exit 0
