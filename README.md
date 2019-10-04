# RichText
WYSIWYG editor developed as jQuery plugin.

## Requirements

- [jQuery](https://jquery.com/) (v.3+, v.3.2+ recommended)
- FontAwesome ([v.4.7.0](https://fontawesome.com/v4.7.0/) / [v.5+](https://fontawesome.com/))
- `src/jquery.richtext.min.js`
- `src/richtext.min.css`

## Demo

To see the latest demo version, you might want to use the following URL:
[Demo from htmlpreview.github.io](https://htmlpreview.github.io/?https://github.com/webfashionist/RichText/blob/master/examples/index.html)


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
  justify: true,

  // lists
  ol: true,
  ul: true,

  // title
  heading: true,

  // fonts
  fonts: true,
  fontList: [
      "Arial", 
      "Arial Black", 
      "Comic Sans MS", 
      "Courier New", 
      "Geneva", 
      "Georgia", 
      "Helvetica", 
      "Impact", 
      "Lucida Console", 
      "Tahoma", 
      "Times New Roman",
      "Verdana"
  ],
  fontColor: true,
  fontSize: true,

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

  // translations
  translations: {
      'title': 'Title',
      'white': 'White',
      'black': 'Black',
      'brown': 'Brown',
      'beige': 'Beige',
      'darkBlue': 'Dark Blue',
      'blue': 'Blue',
      'lightBlue': 'Light Blue',
      'darkRed': 'Dark Red',
      'red': 'Red',
      'darkGreen': 'Dark Green',
      'green': 'Green',
      'purple': 'Purple',
      'darkTurquois': 'Dark Turquois',
      'turquois': 'Turquois',
      'darkOrange': 'Dark Orange',
      'orange': 'Orange',
      'yellow': 'Yellow',
      'imageURL': 'Image URL',
      'fileURL': 'File URL',
      'linkText': 'Link text',
      'url': 'URL',
      'size': 'Size',
      'responsive': 'Responsive',
      'text': 'Text',
      'openIn': 'Open in',
      'sameTab': 'Same tab',
      'newTab': 'New tab',
      'align': 'Align',
      'left': 'Left',
      'center': 'Center',
      'right': 'Right',
      'rows': 'Rows',
      'columns': 'Columns',
      'add': 'Add',
      'pleaseEnterURL': 'Please enter an URL',
      'videoURLnotSupported': 'Video URL not supported',
      'pleaseSelectImage': 'Please select an image',
      'pleaseSelectFile': 'Please select a file',
      'bold': 'Bold',
      'italic': 'Italic',
      'underline': 'Underline',
      'alignLeft': 'Align left',
      'alignCenter': 'Align centered',
      'alignRight': 'Align right',
      'addOrderedList': 'Add ordered list',
      'addUnorderedList': 'Add unordered list',
      'addHeading': 'Add Heading/title',
      'addFont': 'Add font',
      'addFontColor': 'Add font color',
      'addFontSize' : 'Add font size',
      'addImage': 'Add image',
      'addVideo': 'Add video',
      'addFile': 'Add file',
      'addURL': 'Add URL',
      'addTable': 'Add table',
      'removeStyles': 'Remove styles',
      'code': 'Show HTML code',
      'undo': 'Undo',
      'redo': 'Redo',
      'close': 'Close'
  },
            
  // privacy
  youtubeCookies: false,
  
  // developer settings
  useSingleQuotes: false,
  height: 0,
  heightPercentage: 0,
  id: "",
  class: "",
  useParagraph: false,
  maxlength: 0
});
```

**Text formatting**
- `bold` (default: `(boolean) true`) :: Defines if the bold button should be displayed in the editor toolbar
- `italic` (default: `(boolean) true`) :: Defines if the italic button should be displayed
- `underline` (default: `(boolean) true`) :: Displays the underline button

**Fonts**
- `fonts` (default: `(boolean) true`) :: Enables font formatting
- `fontList` :: Array of allowed fonts. The fonts set by default are fonts which should work on Windows, Mac and Linux by default. Setting fonts manually will overwrite the array.
- `fontSize` (default: `(boolean) true`) :: Allows to use different font sizes

**Text alignment**
- `leftAlign` (default: `(boolean) true`)
- `centerAlign` (default: `(boolean) true`)
- `rightAlign` (default: `(boolean) true`)
- `justify` (default: `(boolean) true`)

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

**Translations**

- `translations` :: An object of key-value entries allowing to set other texts/translations for the editor. The keys must stay the same as in the default translation object.

**Privacy settings**

- `youtubeCookies` (default: `(boolean) false`) :: If set to true, YouTube might set tracking cookies. By default (if the value is set to `false`), `youtube-nocookie.com` will be used to display YouTube videos.

**Developer settings**

- `useSingleQuotes` (default: `(boolean) false`) :: Replaces all double quotes from HTML attributes to single quotes, if set to `(boolean) true`.
- `height` (default: `(int) 0`) :: Sets a custom height for the editor frame and code view. The default value `0` uses the initial height set with CSS. To overwrite the height without using this setting (and without using inline CSS), use the CSS selectors `.richText .richText-editor` and `.richText .richText-initial` to change the height.
- `heightPercentage` (default: `(int) 0`) :: Sets a custom percentage height based on the editor's parent element. This won't work if the `height` option is used as well.
- `id` (default: `(string) ""`) :: Sets a custom ID for the editor
- `class` (default: `(string) ""`) :: Sets additional custom classes for the editor
- `useParagraph` (default: `(boolean) false`) :: Uses paragraph tags instead of div containers (browser default) when pressing ENTER, if set to `true`.
- `maxlength` (default: `(int) 0`) :: Defines a max length for the text (HTML length not considered!). The default value `0` doesn't define any limit

## Undo RichText

There's now the possibility to undo the RichText editor to the state before `.richText()` has been called.

For this to work, simply call `.unRichText()` on the initial textarea, on which `.richText()` has previously been called.

It is possible to delay `unRichText()` by a given amount of milliseconds with the parameter: `{delay: 2000}`. 

## FAQ

**How do I set the RichText value through jQuery? Using `.val()` doesn't work?**

The `change` event needs to be triggered, in order to update the value within RichText. 
Using `.val('Some text').trigger('change')` on your jQuery node will solve your issue.
    


## Contributing

If you have any ideas, suggestions, issues or bugfixes, feel free to contribute.

Check out the [contributing guidelines](CONTRIBUTING.md) for ways to offer feedback and contribute.

## Planned changes

- Add/remove columns/cells in table after it was created
