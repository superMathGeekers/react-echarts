#!/bin/sh

for file in $(git diff --cached --name-only | grep -E '\.(js|jsx)$')
do
  # we only want to lint the staged changes, not any un-staged changes
  git show ":$file" | node_modules/.bin/eslint --color --stdin --stdin-filename "$file"
  if [ $? -ne 0 ]; then
    echo "ESLint failed on staged file '$file'. Please check your code and try again. You can run ESLint manually via npm run eslint."
    # exit with failure status
    exit 1
  fi
done