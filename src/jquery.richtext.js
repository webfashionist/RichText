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

        
        /* prepare toolbar dropdowns */
        var $dropdownOuter = $('<div />', {class: "richText-dropdown-outer"});
        var $dropdownList = $('<ul />', {class: "richText-dropdown"}), // dropdown lists
            $dropdownBox = $('<div />', {class: "richText-dropdown"}), // dropdown boxes / custom dropdowns
            $form = $('<div />', {class: "richText-form"}), // symbolic form
            $formItem = $('<div />', {class: 'richText-form-item'}), // form item
            $formLabel = $('<label />'), // form label
            $formInput = $('<input />', {type: "text"}), //form input field
            $formInputFile = $('<input />', {type: "file"}), // form file input field
            $formInputSelect = $('<select />');
            $formButton = $('<button />', {text: "Einfügen", class: "btn"}); // button


        /* list dropdown for titles */
        $titles = $dropdownList.clone();
        $titles.append($('<li />', {html: '<a data-title="1">Title #1</a>'}));
        $titles.append($('<li />', {html: '<a data-title="2">Title #2</a>'}));
        $titles.append($('<li />', {html: '<a data-title="3">Title #3</a>'}));
        $titles.append($('<li />', {html: '<a data-title="4">Title #4</a>'}));
        $btnHeading.append($dropdownOuter.clone().append($titles));

        /* box dropdown for links */
        $linksDropdown = $dropdownBox.clone();
        $linksForm = $form.clone();
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


        /** EVENT HANDLERS */

        // Toolbar button actions
        $(document).on("click", ".richText-btn", function(event) {
            event.preventDefault();

            if($(this).hasClass("fa-code")) {
                // toggle displaying code
                __toggleCode();
            }
        });

        // Saving changes from editor to textarea
        $(document).on("keyup keydown change focus blur", ".richText-editor", function() {
            var $editor = $(this);
            var content = $editor.html();
            $editor.siblings('.richText-initial').val(content);
        });

        // Saving changes from textarea to editor
        $(document).on("keyup keydown focus blur", ".richText-initial", function() {
            var $textarea = $(this);
            var content = $textarea.val();
            $textarea.siblings('.richText-editor').html(content);
        });


        /**
         * Toggle (show/hide) code or editor
         * @return {void}
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