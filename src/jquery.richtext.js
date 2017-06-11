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
            code: true

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
        $linksForm.append( $formItem.clone().append($formButton) );
        $linksDropdown.append($linksForm);
        $btnURLs.append($dropdownOuter.clone().append($linksDropdown));

        /* initizalize editor */
        var init = function() {
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
                    var html = '<a href="' + url + '" target="' + target + '">' + text + '</a>';
                    restoreSelection();
                    __pasteHtmlAtCaret(html);
                    $form.find('input#url').val('');
                    $form.find('input#urlText').val('');
                    $form.find('#openIn').val('');
                    $('.richText-toolbar li.is-selected').removeClass("is-selected");
                }
            }
        });

        // opening / closing toolbar dropdown
        $(document).on("click", function(event) {
            if($(event.target).hasClass("richText-dropdown-outer")) {
                // closing dropdown by clicking inside the editor
                $(event.target).parent('a').parent('li').removeClass("is-selected");
            } else if($(event.target).find(".richText").length > 0) {
                // closing dropdown by clicking outside of the editor
                $('.richText-toolbar li').removeClass("is-selected");
            } else if($(event.target).hasClass("richText-btn") && $(event.target).children('.richText-dropdown-outer').length > 0) {
                // opening dropdown by clicking on toolbar button
                $(event.target).parent('li').addClass("is-selected");

                if($(event.target).hasClass("fa-link")) {
                    restoreSelection();
                    var selectedText = __getSelectedText();
                    $(event.target).find("input#urlText").val('');
                    $(event.target).find("input#url").val('');
                    $(event.target).find("input#openIn").val('');
                    if(selectedText) {
                        $(event.target).find("input#urlText").val(selectedText);
                    }
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
            document.designMode = "ON";
            // Execute the command
            if(command === "heading" && __getSelectedText()) {
                // IE workaround
                __pasteHtmlAtCaret('<' + option + '>' + __getSelectedText() + '</' + option + '>');
            } else {
                document.execCommand(command, false, option);
            }
            // Disable designMode
            document.designMode = "OFF";
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
        function __getSelectedText () {
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