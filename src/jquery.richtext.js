(function ( $ ) {
 
    $.fn.richText = function( options ) {

        var $inputElement = $(this);
        var $editor,
            $toolbarList = $('<ul />'),
            $toolbarElement = $('<li />'),
            $btnBold = $('<a />', {class: "richText-btn fa fa-bold"}), // bold
            $btnItalic = $('<a />', {class: "richText-btn fa fa-italic"}), // italic
            $btnUnderline = $('<a />', {class: "richText-btn fa fa-underline"}), // underline
            $btnLeftAlign = $('<a />', {class: "richText-btn fa fa-align-left"}), // left align
            $btnCenterAlign = $('<a />', {class: "richText-btn fa fa-align-center"}), // centered
            $btnRightAlign = $('<a />', {class: "richText-btn fa fa-align-right"}), // right align
            $btnOL = $('<a />', {class: "richText-btn fa fa-list-ol"}), // ordered list
            $btnUL = $('<a />', {class: "richText-btn fa fa-list"}), // unordered list
            $btnHeading = $('<a />', {class: "richText-btn fa fa-header"}), // title/header
            $btnFontColor = $('<a />', {class: "richText-btn fa fa-paint-brush"}), // font color
            $btnImageUpload = $('<a />', {class: "richText-btn fa fa-image"}), // image
            $btnFileUpload = $('<a />', {class: "richText-btn fa fa-file-text-o"}), // file
            $btnURLs = $('<a />', {class: "richText-btn fa fa-link"}), // urls/links
            $btnTable = $('<a />', {class: "richText-btn fa fa-table"}), // table
            $btnRemoveStyles = $('<a />', {class: "richText-btn fa fa-recycle"}), // clean up styles
            $btnCode = $('<a />', {class: "richText-btn fa fa-code"}); // code

 
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


        // initizalize editor
        var init = function() {
            $editor = $('<div />', {class: "richText"});
            var $toolbar = $('<div />', {class: "richText-toolbar"});
            var $editorView = $('<div />', {class: "richText-editor", contenteditable: true});
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

        return $(this);
    };
 
}( jQuery ));