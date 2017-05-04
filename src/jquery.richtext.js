(function ( $ ) {
 
    $.fn.richText = function( options ) {

        var $inputElement = $(this);
        var $editor,
            $toolbarList = $('<ul />'),
            $toolbarElement = $('<li />'),
            $btnBold = $('<a />', {class: "richText-btn fa fa-bold", text: "Bold"}),
            $btnItalic = $('<a />', {class: "richText-btn fa fa-italic", text: "Italic"}),
            $btnUnderline;
 
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

            if(settings.bold === true) {
                $toolbarList.append($toolbarElement.clone().append($btnBold));
            }

            if(settings.italic === true) {
                $toolbarList.append($toolbarElement.clone().append($btnItalic));
            }



            $editor.append($toolbar);
            $editor.append($editorView);
            $editor.append($inputElement.clone().hide());
            $inputElement.replaceWith($editor);
        }

        init();

 
        // Greenify the collection based on the settings variable.
        return this.css({
            color: settings.color,
            backgroundColor: settings.backgroundColor
        });
 
    };
 
}( jQuery ));