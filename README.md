# Format JavaScript comment for Atom

> Reformats your multiline comments into beautiful, maximum 80 character long lines, with no gaps or irregularities. ✨

## What?
Turns this:
```js
// Lorem ipsum dolor sit amet, consectetur
// adipisicing elit, sed do eiusmod tempor incididunt ut labore
// et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in.
```

Into this:
```js
// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
// tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
// quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
// consequat. Duis aute irure dolor in.
```

## Why?
It's easy to format your comments correctly while writing them. But if you edit them later, it's annoying to reformat them.

## How?
1. Install format-javascript-comment (either through the package manager or through `apm install format-javascript-comment`).
2. (Partially) select the lines the comment encompasses.
3. Open command pallette (Cmd+shift+p) and (partially) type "format comment".
4. Press enter.

## TODO
 - Asterisk notation (multiline comments)
 - Distribute words consistently across lines
 - Configurable line length
 - Better way to find the selection automatically if no selection is provided
