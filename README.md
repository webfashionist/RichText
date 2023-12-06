# RichText

[![Cypress Tests](https://github.com/webfashionist/RichText/actions/workflows/test.yml/badge.svg)](https://github.com/webfashionist/RichText/actions/workflows/test.yml) 

WYSIWYG editor developed as jQuery plugin.

## Requirements

- [jQuery](https://jquery.com/) (v.3+, v.3.2+ recommended)
- FontAwesome ([v.4.7.0](https://fontawesome.com/v4.7.0/) / [v.5+](https://fontawesome.com/))
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
  backgroundColor: true,
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
      'justify': 'Justify',
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
      'addOrderedList': 'Ordered list',
      'addUnorderedList': 'Unordered list',
      'addHeading': 'Heading/title',
      'addFont': 'Font',
      'addFontColor': 'Font color',
      'addBackgroundColor': 'Background color',
      'addFontSize': 'Font size',
      'addImage': 'Add image',
      'addVideo': 'Add video',
      'addFile': 'Add file',
      'addURL': 'Add URL',
      'addTable': 'Add table',
      'removeStyles': 'Remove styles',
      'code': 'Show HTML code',
      'undo': 'Undo',
      'redo': 'Redo',
      'close': 'Close',
      'save': 'Save'
  },
            
  // privacy
  youtubeCookies: false,
    
  // preview
  preview: false,

  // placeholder
  placeholder: '',
  
  // developer settings
  useSingleQuotes: false,
  height: 0,
  heightPercentage: 0,
  adaptiveHeight: false,
  id: "",
  class: "",
  useParagraph: false,
  maxlength: 0,
  maxlengthIncludeHTML: false,
  callback: undefined,
  useTabForNext: false,
  save: false,
  saveCallback: undefined,
  saveOnBlur: 0, 
  undoRedo: true
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
- `backgroundColor` (default: `(boolean) true`)
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

**Preview**

- `preview` (default: `(boolean) false`) :: If set to true, the `contenteditable` property is set to `false` and the toolbar buttons are not loaded.

**Placeholder**

- `placeholder` (default: `(string) ''`) :: If a non-empty string is set, a placeholder will be shown if no text has been written in the `contenteditable` part of the editor. HTML code without text is considered empty and displays the placeholder.

**Tabbing**

- `useTabForNext` (default: `(boolean) false`) :: If set to true, you can tab to the next input element or RichText editor within the `contenteditable` part of the editor.

**Developer settings**

- `useSingleQuotes` (default: `(boolean) false`) :: Replaces all double quotes from HTML attributes to single quotes, if set to `(boolean) true`.
- `height` (default: `(int) 0`) :: Sets a custom height for the editor frame and code view. The default value `0` uses the initial height set with CSS. To overwrite the height without using this setting (and without using inline CSS), use the CSS selectors `.richText .richText-editor` and `.richText .richText-initial` to change the height.
- `heightPercentage` (default: `(int) 0`) :: Sets a custom percentage height based on the editor's parent element. This won't work if the `height` option is used as well.
- `adaptiveHeight` (default: `(boolean) false`) :: If `true`, the height of the editor will be adapted based on the height of the content.
- `id` (default: `(string) ""`) :: Sets a custom ID for the editor
- `class` (default: `(string) ""`) :: Sets additional custom classes for the editor
- `useParagraph` (default: `(boolean) false`) :: Uses paragraph tags instead of div containers (browser default) when pressing ENTER, if set to `true`.
- `maxlength` (default: `(int) 0`) :: Defines a max length for the text (HTML length not considered!). The default value `0` doesn't define any limit
- `maxlengthIncludeHTML` (default: `(boolean) false`) :: If `true`, the length of the HTML code will be used instead of only the written text
- `callback` (default: `undefined`) :: Sets a callback if the editor has been loaded. The first and only parameter of the callback contains the jQuery element of the editor
- `save`: (default: `(boolean) false`) :: If set to `true`, an additional icon to save the content manually will be added
- `saveOnBlur`: (default: `(int) 0`) :: If set to a value greater than 0, the editor will be saved after the given amount of milliseconds after the last change. The default value `0` disables this feature.
- `saveCallback`: (default: `undefined`) :: If a function is set, it will be called after blur (see `saveOnBlur`) or when the save action is being triggered (see `save`). See [Saving the content](#saving-the-content) for more information.
- `undoRedo`: (default `(boolean) true`) :: If set to `false`, the undo/redo buttons will be hidden

## Saving the content

### Save on blur

If the `saveOnBlur` setting is set to a value greater than 0, the editor will be saved after the given amount of milliseconds after the last change. The default value `0` disables this feature.
Additionally, the editor element with the class `.richText-editor` will get the `change` event triggered, if the content has been changed.

By implementing the following code you are able to check for any changes within the editor:

```javascript
$('.richText-editor').on('change', function() { 
    // your code here 
});
```

On top of that, the `saveCallback` function will be called, if set. See [Save callback](#save-callback) for more information.

### Save manually

If the `save` setting is set to `true`, an additional icon to save the content manually will be added. By clicking on the icon, the `saveCallback` function (see [Save callback](#save-callback)) will be called and the `change` event will be triggered on the editor element with the class `.richText-editor`.

### Save callback

If the `saveCallback` setting is set to a function, it will be called after blur (see [Save on blur](#save-on-blur)) or when the save action is being triggered (see [Save manually](#save-manually)).
If none of the mentioned settings are set, the `saveCallback` function will not be called.

The function will be called with the following parameters:

- `editor` :: The jQuery element of the editor (`.richText-editor`)
- `source` :: A string indicating the source of the save action. Possible values are `blur` and `save`
- `content` :: The HTML content of the editor

Example implementation:

```javascript
$('textarea.content').richText({
    saveOnBlur: 1000,
    save: true,
    saveCallback: function (editor, source, content) {
        console.log('editor: ', editor);
        console.log('source: ', source);
        console.log('content: ', content);
    }
});
```

### Save via `<form>` submission

If the editor is placed within a `<form>` element, the content will be saved automatically when the form is being submitted.

The content of the editor will be saved to the textarea element, which has been used to initialize the editor.

Keep in mind, that a `name` attribute is required for the textarea element, otherwise the content won't be saved.

Example: 

```html 
<form method="post">
    <textarea class="content" name="example"></textarea>
    <button type="submit">Submit</button>
</form>
<script>
    $('.content').richText();
</script>
```

With this basic example code, the content of the editor will be set to the POST parameter `example`.

PHP:
you can access the content with `$_POST['example']` (careful to properly sanitize any content!).

Node.js:
you can access the content with `req.body.example` (careful to properly sanitize any content!).


## Events

The `.richText-editor` element listens to specific events in order to handle or modify the content of the editor.

### Clear content

If you want to clear the content of the editor, you can trigger the `clear` event on the `.richText-editor` element.

*As noted in [#12](https://github.com/webfashionist/RichText/issues/12) the editor is considered empty if it contains `<div><br></div>` as content. 
If you need to check if the editor is empty in the backend or frontend, you should strip `<div>`, `<p>` and `<br>` tags and check for the length of the content.*

**Example:**

```javascript
$('.richText-editor').trigger('clear');
```

### Set content

If you want to set the content of the editor, you can trigger the `setContent` event on the `.richText-editor` element.

**Example:**

```javascript
$('.richText-editor').trigger('setContent', '<div>Some content</div>');
```

### Get content

If you want to get the content of the editor, you can trigger the `getContent` event on the `.richText-editor` element.
This event requires a callback function as second parameter, which will be called with the content as second parameter.

This event is similar to the `save` event, but it doesn't trigger the `saveCallback` function (see [Save callback](#save-callback)) and is therefore more variable to use for each event trigger.

**Example:**

```javascript
$('.richText-editor').trigger('getContent', function (event, content) {
    console.log(content);
});
```


### Save

If you want to save the content of the editor, you can trigger the `save` event on the `.richText-editor` element.
The `saveCallback` function (see [Save callback](#save-callback)) will be called and the `change` event will be triggered on the editor element with the class `.richText-editor`.

**Example:**

```javascript
$('.richText-editor').trigger('save');
```

### Destroy / Undo RichText

If you want to destroy the editor, you can trigger the `destroy` event on the `.richText-editor` element.
The editor will be removed and the textarea element will be restored to its initial state keeping the current value set.

**Example:**

```javascript
$('.richText-editor').trigger('destroy');
```

You can also set a delay value in milliseconds to delay the destruction of the editor.

**Example:**

```javascript
$('.richText-editor').trigger('destroy', {delay: 2000});
```

Additionally the `callback` option is available as well and will provide the jQuery element of the remaining `<textarea>` node.

**Example:**

```javascript
$('.richText-editor').trigger('destroy', {delay: 2000, callback: function (textarea) {
    console.log(textarea);
}});
```

## FAQ

**How do I set the RichText value through jQuery? Using `.val()` doesn't work?**

Use the `setContent` event on the `.richText-editor` node as explained in [Set content](#set-content).  
    
**My editor does not save the content, what can I do?**

Make sure that the textarea element has a `name` attribute. Otherwise the content won't be saved if you are trying to save the editor's content via form submission.

Please read the section [Saving the content](#saving-the-content) for more information about all the possibilities to save the content.


## Contributing

If you have any ideas, suggestions, issues or bugfixes, feel free to contribute.

Check out the [contributing guidelines](CONTRIBUTING.md) for ways to offer feedback and contribute.

## Planned changes

- Add/remove columns/cells in table after it was created
