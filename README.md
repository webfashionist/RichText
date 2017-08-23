# RichText
WYSIWYG editor developed as jQuery plugin.

## Requirements

- jQuery
- FontAwesome
- `src/jquery.richtext.min.js`
- `src/richtext.min.css`


## Initialize editor

Simply call `.richText()` on your `jQuery('textarea')` or `jQuery('input')` field (other HTML tags are allowed as well, but not recommended).


## Options

`.richText()` allows several options to be set, the default option object is:

```javascript
$(element).richText({

  // text formatting
  bold: true,
  italic: true,
  underline: true,

  // text alignment
  leftAlign: true,
  centerAlign: true,
  rightAlign: true,

  // lists
  ol: true,
  ul: true,

  // title
  heading: true,

  // colors
  fontColor: true,

  // uploads
  imageUpload: true,
  fileUpload: true,

  // media
  videoEmbed: true,

  // link
  urls: true,

  // tables
  table: true,

  // code
  removeStyles: true,
  code: true,

  // colors
  colors: [],

  // dropdowns
  fileHTML: '',
  imageHTML: '',
  
  // developer settings
  useSingleQuotes: false,
  height: 0,
  heightPercentage: 0
});
```

**Text formatting**
- `bold` (default: `(boolean) true`) :: Defines if the bold button should be displayed in the editor toolbar
- `italic` (default: `(boolean) true`) :: Defines if the italic button should be displayed
- `underline` (default: `(boolean) true`) :: Displays the underline button

**Text alignment**
- `leftAlign` (default: `(boolean) true`)
- `centerAlign` (default: `(boolean) true`)
- `rightAlign` (default: `(boolean) true`)

**Lists**
- `ol` (default: `(boolean) true`) :: Ordered list
- `ul` (default: `(boolean) true`) :: Unordered list

**Titles**
- `heading` (default: `(boolean) true`)

**Colors**
- `fontColor` (default: `(boolean) true`)
- `colors` :: Set own colors for the editor. They will replace the default colors. Example:

```javascript
var colors;
colors["#FFFFFF"] = 'White';
colors["#000000"] = 'Black';
```

**Uploads/Files**
- `imageUpload` (default: `(boolean) true`)
- `fileUpload` (default: `(boolean) true`)

**Media/Videos**
- `videoEmbed` (default: `(boolean) true`) :: Simplify embedding videos from YouTube, Facebook, Vimeo and Dailymotion

**Links**
- `urls` (default: `(boolean) true`)

**Tables**
- `table` (default: `(boolean) true`)

**Code**
- `removeStyles` (default: `(boolean) true`) :: Allows to remove the CSS styles from the selection
- `code` (default: `(boolean) true`) :: Allows to display the raw HTML code

**Custom dropdowns**

Custom dropdowns allow to customize in a restricted way the dropdowns in the editor.

- `fileHTML` :: HTML string of the file dropdown. MUST include an input field (`select`, `input` or `textarea`) with the `id` equal to `fileURL`.
- `imageHTML` :: HTML string of the image dropdown. MUST include an input field (`select`, `input` or `textarea`) with the `id` equal to `imageURL`.

**Developer settings**

- `useSingleQuotes` (default: `(boolean) false`) :: Replaces all double quotes from HTML attributes to single quotes, if set to `(boolean) true`.
- `height` (default: `(int) 0`) :: Sets a custom height for the editor frame and code view. The default value `0` uses the initial height set with CSS. To overwrite the height without using this setting (and without using inline CSS), use the CSS selectors `.richText .richText-editor` and `.richText .richText-initial` to change the height.
- `heightPercentage` (default: `(int) 0`) :: Sets a custom percentage height based on the editor's parent element. This won't work if the `height` option is used as well.

## Contributing

If you have any ideas, suggestions, issues or bugfixes, feel free to contribute.

Check out the [contributing guidelines](CONTRIBUTING.md) for ways to offer feedback and contribute.

## Planned changes

- Add/remove columns/cells in table after it was created
