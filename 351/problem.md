
Write a "word wrapping" function that takes in a string and the maximum width of a line of text, and return the text "wrapped" to that line length. Include dashes for broken words (which is included in the length of that line), and don't let a line start with a non-alphanumeric character.

Example:

```
let string = "Hello, world! I am hungry."
let length = 10

> wrap(string, length)
`Hello, wo-
 rld! I am
 hungry.`
```