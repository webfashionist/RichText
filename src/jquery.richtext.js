(function ( $ ) {
 
    $.fn.richText = function( options ) {

        var $inputElement = $(this);
        var $editor,
            $toolbarList = $('<ul />'),
            $toolbarElement = $('<li />'),
            $btnBold = $('<a />', {class: "richText-btn fa fa-bold", text: "Bold"}),
            $btnItalic = $('<a />', {class: "richText-btn fa fa-italic", text: "Italic"}),
            $btnUnderline = $('<a />', {class: "richText-btn fa fa-underline", text: "Underline"}),
            $btnLeftAlign = $('<a />', {class: "richText-btn fa fa-align-left", text: "Align left"}),
            $btnCenterAlign = $('<a />', {class: "richText-btn fa fa-align-left", text: "Align center"}),
            $btnRightAlign = $('<a />', {class: "richText-btn fa fa-align-left", text: "Align right"}),
            $btnOL = $('<a />', {class: "richText-btn fa fa-list-ol", text: "OL"}),
            $btnUL = $('<a />', {class: "richText-btn fa fa-list", text: "UL"});
 
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
            backgroundColor: true,

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



            $editor.append($toolbar);
            $editor.append($editorView);
            $editor.append($inputElement.clone().hide());
            $inputElement.replaceWith($editor);
        };

        init();

        return $(this);
    };
 
}( jQuery ));