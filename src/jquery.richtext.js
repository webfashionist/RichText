(function ( $ ) {
 
    $.fn.richText = function( options ) {

        // set default options
        // and merge them with the parameter options
        var settings = $.extend({
            
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
            imageHTML: ''

        }, options );


        /* prepare toolbar */
        var $inputElement = $(this);
        $inputElement.addClass("richText-initial");
        var $editor,
            $toolbarList = $('<ul />'),
            $toolbarElement = $('<li />'),
            $btnBold = $('<a />', {class: "richText-btn fa fa-bold", "data-command": "bold"}), // bold
            $btnItalic = $('<a />', {class: "richText-btn fa fa-italic", "data-command": "italic"}), // italic
            $btnUnderline = $('<a />', {class: "richText-btn fa fa-underline", "data-command": "underline"}), // underline
            $btnLeftAlign = $('<a />', {class: "richText-btn fa fa-align-left", "data-command": "justifyLeft"}), // left align
            $btnCenterAlign = $('<a />', {class: "richText-btn fa fa-align-center", "data-command": "justifyCenter"}), // centered
            $btnRightAlign = $('<a />', {class: "richText-btn fa fa-align-right", "data-command": "justifyRight"}), // right align
            $btnOL = $('<a />', {class: "richText-btn fa fa-list-ol", "data-command": "insertOrderedList"}), // ordered list
            $btnUL = $('<a />', {class: "richText-btn fa fa-list", "data-command": "insertUnorderedList"}), // unordered list
            $btnHeading = $('<a />', {class: "richText-btn fa fa-header"}), // title/header
            $btnFontColor = $('<a />', {class: "richText-btn fa fa-paint-brush"}), // font color
            $btnImageUpload = $('<a />', {class: "richText-btn fa fa-image"}), // image
            $btnFileUpload = $('<a />', {class: "richText-btn fa fa-file-text-o"}), // file
            $btnURLs = $('<a />', {class: "richText-btn fa fa-link"}), // urls/links
            $btnTable = $('<a />', {class: "richText-btn fa fa-table"}), // table
            $btnRemoveStyles = $('<a />', {class: "richText-btn fa fa-recycle", "data-command": "removeFormat"}), // clean up styles
            $btnCode = $('<a />', {class: "richText-btn fa fa-code", "data-command": "toggleCode"}); // code

        
        /* prepare toolbar dropdowns */
        var $dropdownOuter = $('<div />', {class: "richText-dropdown-outer"});
        var $dropdownList = $('<ul />', {class: "richText-dropdown"}), // dropdown lists
            $dropdownBox = $('<div />', {class: "richText-dropdown"}), // dropdown boxes / custom dropdowns
            $form = $('<div />', {class: "richText-form"}), // symbolic form
            $formItem = $('<div />', {class: 'richText-form-item'}), // form item
            $formLabel = $('<label />'), // form label
            $formInput = $('<input />', {type: "text"}), //form input field
            $formInputFile = $('<input />', {type: "file"}), // form file input field
            $formInputSelect = $('<select />'),
            $formButton = $('<button />', {text: "Einfügen", class: "btn"}); // button

        /* internal settings */
        var saveSelection, restoreSelection, savedSelection; // caret position/selection
        var editorID = "richText-" + Math.random().toString(36).substring(7);

        /* list dropdown for titles */
        var $titles = $dropdownList.clone();
        $titles.append($('<li />', {html: '<a data-command="formatBlock" data-option="h1">Title #1</a>'}));
        $titles.append($('<li />', {html: '<a data-command="formatBlock" data-option="h2">Title #2</a>'}));
        $titles.append($('<li />', {html: '<a data-command="formatBlock" data-option="h3">Title #3</a>'}));
        $titles.append($('<li />', {html: '<a data-command="formatBlock" data-option="h4">Title #4</a>'}));
        $btnHeading.append($dropdownOuter.clone().append($titles));

        /* font colors */
        var $fontColors = $dropdownList.clone();
        $fontColors.html(__loadColors("forecolor"));
        $btnFontColor.append($dropdownOuter.clone().append($fontColors));


        /* background colors */
        //var $bgColors = $dropdownList.clone();
        //$bgColors.html(__loadColors("hiliteColor"));
        //$btnBGColor.append($dropdownOuter.clone().append($bgColors));

        /* box dropdown for links */
        var $linksDropdown = $dropdownBox.clone();
        var $linksForm = $form.clone().attr("id", "richText-URL").attr("data-editor", editorID);
        $linksForm.append(
            $formItem.clone()
                .append($formLabel.clone().text("URL").attr("for", "url"))
                .append($formInput.clone().attr("id", "url"))
               );
        $linksForm.append(
            $formItem.clone()
                .append($formLabel.clone().text("Text").attr("for", "urlText"))
                .append($formInput.clone().attr("id", "urlText"))
               );
        $linksForm.append(
            $formItem.clone()
                .append($formLabel.clone().text("Open in").attr("for", "openIn"))
                .append(
                    $formInputSelect
                        .clone().attr("id", "openIn")
                        .append($("<option />", {value: '_self', text: 'Same tab'}))
                        .append($("<option />", {value: '_blank', text: 'New tab'}))
                    )
               );
        $linksForm.append( $formItem.clone().append($formButton.clone()) );
        $linksDropdown.append($linksForm);
        $btnURLs.append($dropdownOuter.clone().append($linksDropdown));

        /* box dropdown for image upload/image selection */
        var $imageDropdown = $dropdownBox.clone();
        var $imageForm = $form.clone().attr("id", "richText-Image").attr("data-editor", editorID);

        if(settings.imageHTML 
            && ($(settings.imageHTML).find('#imageURL').length > 0 || $(settings.imageHTML).attr("id") === "imageURL")) {
            // custom image form
            $imageForm.html(settings.imageHTML);
        } else {
            // default image form
            $imageForm.append(
                $formItem.clone()
                    .append($formLabel.clone().text("Image URL").attr("for", "imageURL"))
                    .append($formInput.clone().attr("id", "imageURL"))
                   );
            $imageForm.append(
                $formItem.clone()
                    .append($formLabel.clone().text("Align").attr("for", "align"))
                    .append(
                        $formInputSelect
                            .clone().attr("id", "align")
                            .append($("<option />", {value: 'left', text: 'Left'}))
                            .append($("<option />", {value: 'center', text: 'Center'}))
                            .append($("<option />", {value: 'right', text: 'Right'}))
                        )
                   );
        }
        $imageForm.append( $formItem.clone().append($formButton.clone()) );
        $imageDropdown.append($imageForm);
        $btnImageUpload.append($dropdownOuter.clone().append($imageDropdown));

        /* box dropdown for file upload/file selection */
        var $fileDropdown = $dropdownBox.clone();
        var $fileForm = $form.clone().attr("id", "richText-File").attr("data-editor", editorID);

        if(settings.fileHTML 
            && ($(settings.fileHTML).find('#fileURL').length > 0 || $(settings.fileHTML).attr("id") === "fileURL")) {
            // custom file form
            $fileForm.html(settings.fileHTML);
        } else {
            // default file form
            $fileForm.append(
                $formItem.clone()
                    .append($formLabel.clone().text("File URL").attr("for", "fileURL"))
                    .append($formInput.clone().attr("id", "fileURL"))
                );
            $fileForm.append(
                $formItem.clone()
                    .append($formLabel.clone().text("Link text").attr("for", "fileText"))
                    .append($formInput.clone().attr("id", "fileText"))
                );
        }
        $fileForm.append( $formItem.clone().append($formButton.clone()) );
        $fileDropdown.append($fileForm);
        $btnFileUpload.append($dropdownOuter.clone().append($fileDropdown));

        /* box dropdown for tables */
        var $tableDropdown = $dropdownBox.clone();
        var $tableForm = $form.clone().attr("id", "richText-Table").attr("data-editor", editorID);
        $tableForm.append(
            $formItem.clone()
                .append($formLabel.clone().text("Rows").attr("for", "tableRows"))
                .append($formInput.clone().attr("id", "tableRows").attr("type", "number"))
            );
        $tableForm.append(
            $formItem.clone()
                .append($formLabel.clone().text("Columns").attr("for", "tableColumns"))
                .append($formInput.clone().attr("id", "tableColumns").attr("type", "number"))
            );
        $tableForm.append( $formItem.clone().append($formButton.clone()) );
        $tableDropdown.append($tableForm);
        $btnTable.append($dropdownOuter.clone().append($tableDropdown));


        /* initizalize editor */
        var init = function() {
            var value, attributes, attributes_html = '';
            // reformat $inputElement to textarea
            if($inputElement.prop("tagName") === "TEXTAREA") {
                // everything perfect
            } else if($inputElement.val()) {
                value = $inputElement.val();
                attributes = $inputElement.prop("attributes");
                // loop through <select> attributes and apply them on <div>
                $.each(attributes, function() {
                    if(this.name) {
                        attributes_html += ' ' + this.name + '="' + this.value + '"';
                    }
                });
                $inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init">' + value + '</textarea>'));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext");
            } else if($inputElement.html()) {
                value = $inputElement.html();
                attributes = $inputElement.prop("attributes");
                // loop through <select> attributes and apply them on <div>
                $.each(attributes, function() {
                    if(this.name) {
                        attributes_html += ' ' + this.name + '="' + this.value + '"';
                    }
                });
                $inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init">' + value + '</textarea>'));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext");
            } else {
                attributes = $inputElement.prop("attributes");
                // loop through <select> attributes and apply them on <div>
                $.each(attributes, function() {
                    if(this.name) {
                        attributes_html += ' ' + this.name + '="' + this.value + '"';
                    }
                });
                $inputElement.replaceWith($('<textarea' + attributes_html + ' data-richtext="init"></textarea>'));
                $inputElement = $('[data-richtext="init"]');
                $inputElement.removeAttr("data-richtext");
            }

            $editor = $('<div />', {class: "richText"});
            var $toolbar = $('<div />', {class: "richText-toolbar"});
            var $editorView = $('<div />', {class: "richText-editor", id: editorID, contenteditable: true});
            $toolbar.append($toolbarList);

            /* text formatting */
            if(settings.bold === true) {
                $toolbarList.append($toolbarElement.clone().append($btnBold));
            }
            if(settings.italic === true) {
                $toolbarList.append($toolbarElement.clone().append($btnItalic));
            }
            if(settings.underline === true) {
                $toolbarList.append($toolbarElement.clone().append($btnUnderline));
            }

            /* align */
            if(settings.leftAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnLeftAlign));
            }
            if(settings.centerAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnCenterAlign));
            }
            if(settings.rightAlign === true) {
                $toolbarList.append($toolbarElement.clone().append($btnRightAlign));
            }

            /* lists */
            if(settings.ol === true) {
                $toolbarList.append($toolbarElement.clone().append($btnOL));
            }
            if(settings.ul === true) {
                $toolbarList.append($toolbarElement.clone().append($btnUL));
            }

            /* heading */
            if(settings.heading === true) {
                $toolbarList.append($toolbarElement.clone().append($btnHeading));
            }

            /* colors */
            if(settings.fontColor === true) {
                $toolbarList.append($toolbarElement.clone().append($btnFontColor));
            }

            /* uploads */
            if(settings.imageUpload === true) {
                $toolbarList.append($toolbarElement.clone().append($btnImageUpload));
            }
            if(settings.fileUpload === true) {
                $toolbarList.append($toolbarElement.clone().append($btnFileUpload));
            }

            /* urls */
            if(settings.urls === true) {
                $toolbarList.append($toolbarElement.clone().append($btnURLs));
            }

            if(settings.table === true) {
                $toolbarList.append($toolbarElement.clone().append($btnTable));
            }

            /* code */
            if(settings.removeStyles === true) {
                $toolbarList.append($toolbarElement.clone().append($btnRemoveStyles));
            }
            if(settings.code === true) {
                $toolbarList.append($toolbarElement.clone().append($btnCode));
            }

            // set current textarea value to editor
            $editorView.html($inputElement.val());

            $editor.append($toolbar);
            $editor.append($editorView);
            $editor.append($inputElement.clone().hide());
            $inputElement.replaceWith($editor);
        };

        init();


        /** EVENT HANDLERS */
        // Saving changes from editor to textarea
        $(document).on("keyup keydown change blur paste copy cut", ".richText-editor", function() {
            __updateTextarea();
            doSave();
        });

        // Saving changes from textarea to editor
        $(document).on("keyup keydown blur paste copy cut", ".richText-initial", function() {
            __updateEditor();
            doSave();
        });

        // adding URL
        $(document).on("click", "#richText-URL button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for currently selected editor
                var url = $form.find('input#url').val();
                var text = $form.find('input#urlText').val();
                var target = $form.find('#openIn').val();

                // set default values
                if(!target) {
                    target = '_self';
                }
                if(!text) {
                    text = url;
                }
                if(!url) {
                    // no url set
                    $form.prepend($('<div />', {style: 'color:red;display:none;', class: 'form-item is-error', text: 'Please enter an URL'}));
                    $form.children('.form-item.is-error').slideDown();
                    setTimeout(function() {
                        $form.children('.form-item.is-error').slideUp(function () {
                            $(this).remove();
                        });
                    }, 5000);
                } else {
                    // write html in editor
                    var html = '<a href="' + url + '" target="' + target + '">' + text + '</a>';
                    restoreSelection();
                    __pasteHtmlAtCaret(html);
                    // reset input values
                    $form.find('input#url').val('');
                    $form.find('input#urlText').val('');
                    $('.richText-toolbar li.is-selected').removeClass("is-selected");
                }
            }
        });

        // adding image
        $(document).on("click", "#richText-Image button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for currently selected editor
                var url = $form.find('#imageURL').val();
                var align = $form.find('select#align').val();

                // set default values
                if(!align) {
                    align = 'center';
                }
                if(!url) {
                    // no url set
                    $form.prepend($('<div />', {style: 'color:red;display:none;', class: 'form-item is-error', text: 'Please select an image.'}));
                    $form.children('.form-item.is-error').slideDown();
                    setTimeout(function() {
                        $form.children('.form-item.is-error').slideUp(function () {
                            $(this).remove();
                        });
                    }, 5000);
                } else {
                    // write html in editor
                    var html = '';
                    if(align === "center") {
                        html = '<div style="text-align:center;"><img src="' + url + '"></div>';
                    } else {
                        html = '<img src="' + url + '" align="' + align + '">';
                    }
                    restoreSelection();
                    __pasteHtmlAtCaret(html);
                    // reset input values
                    $form.find('input#imageURL').val('');
                    $('.richText-toolbar li.is-selected').removeClass("is-selected");
                }
            }
        });

        // adding file
        $(document).on("click", "#richText-File button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for currently selected editor
                var url = $form.find('#fileURL').val();
                var text = $form.find('#fileText').val();

                // set default values
                if(!text) {
                    text = url;
                }
                if(!url) {
                    // no url set
                    $form.prepend($('<div />', {style: 'color:red;display:none;', class: 'form-item is-error', text: 'Please select a file.'}));
                    $form.children('.form-item.is-error').slideDown();
                    setTimeout(function() {
                        $form.children('.form-item.is-error').slideUp(function () {
                            $(this).remove();
                        });
                    }, 5000);
                } else {
                    // write html in editor
                    var html = '<a href="' + url + '" target="_blank">' + text + '</a>';
                    restoreSelection();
                    __pasteHtmlAtCaret(html);
                    // reset input values
                    $form.find('input#fileURL').val('');
                    $form.find('input#fileText').val('');
                    $('.richText-toolbar li.is-selected').removeClass("is-selected");
                }
            }
        });


        // adding table
        $(document).on("click", "#richText-Table button.btn", function(event) {
            event.preventDefault();
            var $button = $(this);
            var $form = $button.parent('.richText-form-item').parent('.richText-form');
            if($form.attr("data-editor") === editorID) {
                // only for currently selected editor
                var rows = $form.find('input#tableRows').val();
                var columns = $form.find('input#tableColumns').val();

                // set default values
                if(!rows || rows <= 0) {
                    rows = 2;
                }
                if(!columns || columns <= 0) {
                    columns = 2;
                }
                
                // generate table
                var html = '<table class="table-1"><tbody>';
                for(var i = 1; i <= rows; i++) {
                    // start new row
                    html += '<tr>';
                    for(var n = 1; n <= columns; n++) {
                        // start new column in row
                        html += '<td> </td>';
                    }
                    html += '</tr>';
                }
                html += '</tbod></table>';

                // write html in editor
                restoreSelection();
                __pasteHtmlAtCaret(html);
                // reset input values
                $form.find('input#tableColumns').val('');
                $form.find('input#tableRows').val('');
                $('.richText-toolbar li.is-selected').removeClass("is-selected");
            }
        });

        // opening / closing toolbar dropdown
        $(document).on("click", function(event) {
            var $clickedElement = $(event.target);

            if($clickedElement.parents('.richText-toolbar').length === 0) {
                // element not in toolbar
                // ignore
            } else if($clickedElement.hasClass("richText-dropdown-outer")) {
                // closing dropdown by clicking inside the editor
                $clickedElement.parent('a').parent('li').removeClass("is-selected");
            } else if($clickedElement.find(".richText").length > 0) {
                // closing dropdown by clicking outside of the editor
                $('.richText-toolbar li').removeClass("is-selected");
            } else if($clickedElement.hasClass("richText-btn") && $(event.target).children('.richText-dropdown-outer').length > 0) {
                // opening dropdown by clicking on toolbar button
                $clickedElement.parent('li').addClass("is-selected");

                if($clickedElement.hasClass("fa-link")) {
                    // put currently selected text in URL form to replace it
                    restoreSelection();
                    var selectedText = __getSelectedText();
                    $clickedElement.find("input#urlText").val('');
                    $clickedElement.find("input#url").val('');
                    if(selectedText) {
                        $clickedElement.find("input#urlText").val(selectedText);
                    }
                } else if($clickedElement.hasClass("fa-image")) {
                    // image
                }
            }
        });

        // Executing editor commands
        $(document).on("click", ".richText-toolbar a[data-command]", function(event) {
            var $button = $(this);
            var $toolbar = $button.closest('.richText-toolbar');
            if($toolbar.siblings("#" + editorID).length > 0 && (!$button.parent("li").attr('data-disable') || $button.parent("li").attr('data-disable') === "false")) {
                event.preventDefault();
                var command = $(this).data("command");

                if(command === "toggleCode") {
                    __toggleCode();
                } else {
                    var option = null;
                    if ($(this).data('option')) {
                        option = $(this).data('option');
                        if (option.match(/^h[1-6]$/)) {
                            command = "heading";
                        }
                    }
                    __formatText(command, option);
                    if (command === "removeFormat") {
                        __formatText('formatBlock', 'div');
                    }
                }
            }
        });



        /** INTERNAL METHODS **/

        /**
         * Format text in editor
         * @param {string} command
         * @param {string|null} option
         * @private
         */
        function __formatText(command, option) {
            if (typeof option === "undefined") {
                option = null;
            }
            // restore selection from before clicking on any button
            doRestore();
            // Temporarily enable designMode so that
            // document.execCommand() will work
            // document.designMode = "ON";
            // Execute the command
            if(command === "heading" && __getSelectedText()) {
                // IE workaround
                __pasteHtmlAtCaret('<' + option + '>' + __getSelectedText() + '</' + option + '>');
            } else {
                document.execCommand(command, false, option);
            }
            // Disable designMode
            // document.designMode = "OFF";
        }


        /**
         * Update textarea when updating editor
         * @private
         */
        function __updateTextarea() {
            var $editor = $('#' + editorID);
            var content = $editor.html();
            $editor.siblings('.richText-initial').val(content);
        }


        /**
         * Update editor when updating textarea
         * @private
         */
        function __updateEditor() {
            var $editor = $('#' + editorID);
            var content = $editor.siblings('.richText-initial').val();
            $editor.html(content);
        }

        /** save caret position **/
        if (window.getSelection && document.createRange) {
            saveSelection = function() {
                var containerEl = document.getElementById(editorID);
                var sel = window.getSelection && window.getSelection();
                if (sel && sel.rangeCount > 0) {
                    var range = window.getSelection().getRangeAt(0);
                    var preSelectionRange = range.cloneRange();
                    preSelectionRange.selectNodeContents(containerEl);
                    preSelectionRange.setEnd(range.startContainer, range.startOffset);
                    var start = preSelectionRange.toString().length;

                    return {
                        start: start,
                        end: start + range.toString().length
                    }
                } else {
                    return {
                        start: 0,
                        end: 0
                    }
                }
            };
            restoreSelection = function() {
                var containerEl = document.getElementById(editorID);
                var savedSel = savedSelection;
                var charIndex = 0, range = document.createRange();
                range.setStart(containerEl, 0);
                range.collapse(true);
                var nodeStack = [containerEl], node, foundStart = false, stop = false;

                while (!stop && (node = nodeStack.pop())) {
                    if (node.nodeType === 3) {
                        var nextCharIndex = charIndex + node.length;
                        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
                            range.setStart(node, savedSel.start - charIndex);
                            foundStart = true;
                        }
                        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
                            range.setEnd(node, savedSel.end - charIndex);
                            stop = true;
                        }
                        charIndex = nextCharIndex;
                    } else {
                        var i = node.childNodes.length;
                        while (i--) {
                            nodeStack.push(node.childNodes[i]);
                        }
                    }
                }

                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
            };
        } else if (document.selection && document.body.createTextRange) {
            saveSelection = function() {
                var containerEl = document.getElementById(editorID);
                var selectedTextRange = document.selection.createRange();
                var preSelectionTextRange = document.body.createTextRange();
                preSelectionTextRange.moveToElementText(containerEl);
                preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
                var start = preSelectionTextRange.text.length;

                return {
                    start: start,
                    end: start + selectedTextRange.text.length
                };
            };
            restoreSelection = function() {
                var containerEl = document.getElementById(editorID);
                var savedSel = savedSelection;
                var textRange = document.body.createTextRange();
                textRange.moveToElementText(containerEl);
                textRange.collapse(true);
                textRange.moveEnd("character", savedSel.end);
                textRange.moveStart("character", savedSel.start);
                textRange.select();
            };
        }

        /**
         * Returns the text from the current selection
         * @private
         * @return {string|boolean}
         */
        function __getSelectedText() {
            var range;
            if (window.getSelection) {  // all browsers, except IE before version 9
                range = window.getSelection ();
                return range.toString();
            } else  if (document.selection.createRange) { // Internet Explorer
                range = document.selection.createRange ();
                return range.text;
            }
            return false;
        }

        /**
         * Save selection
         */
        function doSave() {
            savedSelection = saveSelection();
        }

        /**
         * Restore selection
         */
        function doRestore() {
            if(savedSelection) {
                restoreSelection();
            }
        }

        /**
         * Paste HTML at caret position
         * @param {string} html HTML code
         * @private
         */
        function __pasteHtmlAtCaret(html) {
            // add HTML code for Internet Explorer
            var sel, range;
            if (window.getSelection) {
                // IE9 and non-IE
                sel = window.getSelection();
                if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    range.deleteContents();

                    // Range.createContextualFragment() would be useful here but is
                    // only relatively recently standardized and is not supported in
                    // some browsers (IE9, for one)
                    var el = document.createElement("div");
                    el.innerHTML = html;
                    var frag = document.createDocumentFragment(), node, lastNode;
                    while ( (node = el.firstChild) ) {
                        lastNode = frag.appendChild(node);
                    }
                    range.insertNode(frag);

                    // Preserve the selection
                    if (lastNode) {
                        range = range.cloneRange();
                        range.setStartAfter(lastNode);
                        range.collapse(true);
                        sel.removeAllRanges();
                        sel.addRange(range);
                    }
                }
            } else if (document.selection && document.selection.type !== "Control") {
                // IE < 9
                document.selection.createRange().pasteHTML(html);
            }
        }


        /**
         * Load colors for font or background
         * @param {string} command Command
         * @returns {string}
         * @private
         */
        function __loadColors(command) {
            var colors = [];
            var result = '';

            colors["#FFFFFF"] = 'White';
            colors["#000000"] = 'Black';
            colors["#7F6000"] = 'Brown';
            colors["#938953"] = 'Beige';
            colors["#1F497D"] = 'Dark Blue';
            colors["blue"] = 'Blue';
            colors["#4F81BD"] = 'Light blue';
            colors["#953734"] = 'Dark red';
            colors["red"] = 'Red';
            colors["#4F6128"] = 'Dark green';
            colors["green"] = 'Green';
            colors["#3F3151"] = 'Purple';
            colors["#31859B"] = 'Dark Turquois';
            colors["#4BACC6"] = 'Turquois';
            colors["#E36C09"] = 'Dark orange';
            colors["#F79646"] = 'Orange';
            colors["#FFFF00"] = 'Yellow';

            if(settings.colors && settings.colors.length > 0) {
                colors = settings.colors;
            }

            for (var i in colors) {
                result += '<li class="inline"><a data-command="' + command + '" data-option="' + i + '" style="text-align:left;" title="' + colors[i] + '"><span class="box-color" style="background-color:' + i + '"></span></a></li>';
            }
            return result;
        }


        /**
         * Toggle (show/hide) code or editor
         * @private
         */
        function __toggleCode() {

            if($editor.find('.richText-editor').is(":visible")) {
                // show code
                $editor.find('.richText-initial').show();
                $editor.find('.richText-editor').hide(); 
                // disable non working buttons
                $('.richText-toolbar').find('.richText-btn').each(function() {
                    if(!$(this).hasClass("fa-code")) {
                        $(this).parent('li').attr("data-disable", "true");
                    }
                });
            } else {
                // show editor
                $editor.find('.richText-initial').hide();
                $editor.find('.richText-editor').show();
                // enable all buttons again
                $('.richText-toolbar').find('li').removeAttr("data-disable");
            }

        }

        return $(this);
    };
 
}( jQuery ));