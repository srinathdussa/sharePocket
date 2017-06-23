
ko.bindingHandlers.getElement = {
    init: function (element, valueAccessor, allBindings, bindingContext) {
        var value = valueAccessor();
        if (ko.isObservable(value)) {
            value(element);
        }
    },
    update: function (element, valueAccessor, allBindings, bindingContext) {
    }
};

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
}

ko.bindingHandlers.option = {
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        ko.selectExtensions.writeValue(element, value);
    }
};

ko.bindingHandlers.dateField = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        var options = allBindingsAccessor().datepickerOptions || {};
        $(element).datepicker(options).on("changeDate", function (ev) {
            var observable = valueAccessor();
            observable(ev.date);
        });
    },
    update: function (element, valueAccessor) {
        var value = ko.utils.unwrapObservable(valueAccessor());
        $(element).datepicker("setValue", value);
    }
};


//moment.tz.add('America/Los_Angeles|PST PDT|80 70|0101|1Lzm0 1zb0 Op0');
ko.bindingHandlers.datetimepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {
        //initialize datepicker with some optional options
        var options = allBindingsAccessor().datepickerOptions || {
            showTodayButton: true, sideBySide: true, useCurrent: false, toolbarPlacement: 'bottom',
            //timeZone: 'America/Los_Angeles',
            useCurrent: false
        };

        if (options.hasOwnProperty("format") && !options.format) {
            delete options.format;
        }

        if (allBindingsAccessor().OtherOptions) {
            $.extend(true, options, allBindingsAccessor().OtherOptions);
        }
        $(element).datetimepicker(options);

        $(element).parent().append('<span class="input-group-addon calendarIcon" title="Calendar"><span class="glyphicon glyphicon-calendar"></span></span>');

        $(element).next(".calendarIcon").click(function () {
            $(element).datetimepicker('show').data("DateTimePicker").show();
        });


        //when a user changes the date, update the view model
        ko.utils.registerEventHandler(element, "dp.change", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                value(new Date(event.date));
                //value(event.date);
            }
            //$(element).datetimepicker('show').data("DateTimePicker").hide();
        });
    },
    update: function (element, valueAccessor) {
        var datePicker = $(element).datetimepicker();
        var widget = datePicker.data("DateTimePicker");
        //when the view model is updated, update the widget
        if (widget) {
            //widget.date = ko.utils.unwrapObservable(valueAccessor());
            var date = ko.utils.unwrapObservable(valueAccessor());
            if (date) {
                // $(element).datetimepicker("setValue", widget.date); //(widget.date);
                //valueAccessor()(moment(date));
                widget.date(date);
            }
            else {
                datePicker.val("");
                widget.clear();
            }
        }
    }
};

ko.bindingHandlers.timepicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {

        var options = allBindingsAccessor().timepickerOptions || {
            showSeconds: false,
            showMeridian: false,
            template: 'dropdown',
            minuteStep: 5,
            showInputs: false,
            disableFocus: false
        };
        var valueUnwrapped = ko.unwrap(valueAccessor());
        if (valueUnwrapped)
            options.defaultTime = valueUnwrapped;
        $(element).timepicker(options);

        $(element).parent().append('<span class="input-group-addon calendarIcon" title="Calendar"><span class="glyphicon glyphicon-time"></span></span>');

        $(element).next(".calendarIcon").click(function () {
            //$(element).timepicker('show').data("DateTimePicker").show();            
            $(element).timepicker('showWidget');
        });


        //when a user changes the date, update the view model
        ko.utils.registerEventHandler(element, "changeTime.timepicker", function (event) {
            var value = valueAccessor();
            if (ko.isObservable(value)) {
                value(event.time.value);
            };
        });
        ko.utils.registerEventHandler(element, "hide.timepicker", function (event) {
            if (allBindingsAccessor() && allBindingsAccessor().onHide) {
                allBindingsAccessor().onHide(false);
            }
        });

    },
    update: function (element, valueAccessor) {
        var datePicker = $(element).timepicker();

        //when the view model is updated, update the widget
        if (datePicker) {
            //widget.date = ko.utils.unwrapObservable(valueAccessor());
            var updatedValue = ko.utils.unwrapObservable(valueAccessor());
            if (updatedValue) {
                $(element).timepicker('setTime', updatedValue);
            }
            else {

            }
        }
    }
};


ko.bindingHandlers.colorpicker = {
    init: function (element, valueAccessor, allBindingsAccessor) {


        var valueUnwrapped = ko.unwrap(valueAccessor());


        var defaultColor = "#f00";
        if (valueUnwrapped)
            defaultColor = valueUnwrapped;
        else {
            var observable = valueAccessor();
            observable(defaultColor);
        }
        $(element).spectrum({
            color: defaultColor,
            showInput: true,
            className: "full-spectrum",
            showInitial: true,
            showPalette: true,
            showSelectionPalette: true,
            hideAfterPaletteSelect: true,
            maxSelectionSize: 10,
            preferredFormat: "hex",
            localStorageKey: "spectrum.demo",
            move: function (color) {

            },
            show: function () {

            },
            beforeShow: function () {

            },
            hide: function () {

            },
            change: function () {

            },
            palette: [
                ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                "rgb(204, 204, 204)", "rgb(217, 217, 217)", "rgb(255, 255, 255)"],
                ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"],
                ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)",
                "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)",
                "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)",
                "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)",
                "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)",
                "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)",
                "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
            ],
            change: function (color) {
            }
        });

        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            observable($(element).val());
        });

    },

    update: function (element, valueAccessor) {


        //when the view model is updated, update the widget

        var updatedValue = ko.utils.unwrapObservable(valueAccessor());
        if (updatedValue) {
            $(element).spectrum("set", updatedValue);
        }


    }
};

ko.bindingHandlers.autoComplete = {
    // Only using init event because the Jquery.UI.AutoComplete widget will take care of the update callbacks
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        // { selected: mySelectedOptionObservable, options: myArrayOfLabelValuePairs }
        var settings = valueAccessor();

        var selectedOption = settings.selected;
        var options = settings.options;

        var appendtoElement = settings.appendTo;

        var clearOnSelection = false;
        if (settings.clearTextBoxOnSelect)
            clearOnSelection = true;

        var updateElementValueWithLabel = function (event, ui) {
            // Stop the default behavior
            event.preventDefault();

            // Update the value of the html element with the label 
            // of the activated option in the list (ui.item)
            if (clearOnSelection)
                $(element).val('');
            else
                $(element).val(ui.item.label);

            // Update our SelectedOption observable
            if (typeof ui.item !== "undefined") {
                // ui.item - label|value|...
                selectedOption(ui.item);
            }
        };

        $(element).autocomplete({
            source: options,
            select: function (event, ui) {
                updateElementValueWithLabel(event, ui);
            },
            focus: function (event, ui) {
                // Stop the default behavior
                event.preventDefault();
                //updateElementValueWithLabel(event, ui);
            },
            change: function (event, ui) {
                // Stop the default behavior
                event.preventDefault();
                //updateElementValueWithLabel(event, ui);
            },
            appendTo:$(appendtoElement)
        });
    }
};


ko.bindingHandlers.ckeditor = {
    init: function (element, valueAccessor, allBindingsAccessor) {

        var value = ko.utils.unwrapObservable(valueAccessor());
        var element$ = $(element);

        var dropEventHandler = allBindingsAccessor().onDrop;

        // Set initial value and create the CKEditor
        element$.html(value);


        var editorId = element.id;
        if (!editorId) {
            editorId = "ckEditor_" + (new Date()).getTime();
            element.id = editorId;
        }

        if (CKEDITOR.instances[editorId])
            delete CKEDITOR.instances[editorId];

        CKEDITOR.replace(document.getElementById(editorId));

        CKEDITOR.instances[editorId].on('contentDom', function (evt) {
            element$.val(evt.editor.getData()).trigger("change");;
            CKEDITOR.instances[editorId].document.on('keyup', function (event) {
                element$.val(evt.editor.getData()).trigger("change");;
            });
        });

        CKEDITOR.instances[editorId].on('change', function (evt) {
            element$.val(evt.editor.getData()).trigger("change");
        });

        if (dropEventHandler)//if drop event handler is defined
        {
            CKEDITOR.instances[editorId].on('drop', function (event, ui) {
                dropEventHandler(event,this);
            });
        }

        ko.utils.registerEventHandler(element, "change", function () {
            var observable = valueAccessor();
            observable(element$.val());
        });

        var editor = CKEDITOR.instances[editorId];
        /* Handle disposal if KO removes an editor 
        * through template binding */
        ko.utils.domNodeDisposal.addDisposeCallback(element,
            function () {
                editor.updateElement();
                editor.destroy();
            });

    },

    update: function (element, valueAccessor) {
        var newValue = ko.utils.unwrapObservable(valueAccessor());
        var editorId = element.id;
        //need a work around to update the ck editor value when the observable value is modified
        //below code to update is killing the app
        //if (CKEDITOR.instances[editorId]) {
        //    CKEDITOR.instances[editorId].setData(newValue);
        //}
    }
};

//Polyfill for Number.isNaN 
Number.isNaN = Number.isNaN || function (value) {
    return value !== value;
}


ko.bindingHandlers['keyvalue'] = {
    makeTemplateValueAccessor: function (valueAccessor) {
        return function () {
            var values = valueAccessor();
            var array = [];
            for (var key in values)
                array.push({ key: key, value: values[key] });
            return array;
        };
    },
    'init': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        return ko.bindingHandlers['foreach']['init'](element, ko.bindingHandlers['keyvalue'].makeTemplateValueAccessor(valueAccessor));
    },
    'update': function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        return ko.bindingHandlers['foreach']['update'](element, ko.bindingHandlers['keyvalue'].makeTemplateValueAccessor(valueAccessor), allBindings, viewModel, bindingContext);
    }
};
