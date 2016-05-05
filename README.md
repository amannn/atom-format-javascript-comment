# Format JavaScript comment for Atom

> Reformats your multiline comments into beautiful, maximum 80 character long lines with [minimum raggedness](https://en.wikipedia.org/wiki/Line_wrap_and_word_wrap#Minimum_raggedness). ✨

## What?
Turns this:
```js
// Lorem ipsum dolor sit amet, consectetur
// adipisicing elit, sed do eiusmod tempor incididunt ut labore
// et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
```

Into this:
```js
// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
// tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
// veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
```

## Why?
It's easy to format your comments correctly while writing them. But if you edit them later, it's annoying to reformat them.

## Features
 - Single line comments (`// Whatever`)
 - Multiline comments (`* Whatever`)
 - JSDoc tags always start on a new line (` * @param {string} name Some description.`)

## How?
1. Install format-javascript-comment (either through the package manager or through `apm install format-javascript-comment`).
2. (Partially) select the lines the comment encompasses.
3. Open command pallette (Cmd+Shift+P) and (partially) type "format comment".
4. Press enter.

## TODO
 - Better way to find the selection automatically if no selection is provided
 - Configurable line length
 - Retain blank spaces
