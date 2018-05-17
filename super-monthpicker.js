/*
 * Super Month Picker
 * doc: http://markusslima.github.io/bootstrap-number-style/
 * github: https://github.com/markusslima/bootstrap-number-style
 *
 * Copyright (c) 2018 Markus Vinicius da Silva Lima
 * Version 1.0.0
 * Licensed under the MIT license.
 */
(function($) {
    "use strict";

    var SuperMonthPicker = function(element, options) {
        this.options = options;
        this.$elementSuperMonthPicker = [];
        this.$element = $(element);
    };

    SuperMonthPicker.prototype = {




        // destroy : function() {
        //     this.$element.removeAttr('style').removeData('bNumberStyle');
        //     this.$elementBNumberStyle.remove();
        // },

        // goMin : function(value) {
        //     if (value === true || value === false) {
        //         this.options.disabled = value;
        //         this.$element.prop('disabled', this.options.disabled);
        //         this.$elementBNumberStyle.find('label').prop('disabled', this.options.disabled);

        //         if (this.options.disabled)
        //             this.$elementBNumberStyle.find('label').css('opacity', '0.65');
        //         else
        //             this.$elementBNumberStyle.find('label').css('opacity', '1');
        //     } else {
        //         return this.options.disabled;
        //     }
        // },

        // goMax : function(value) {
        //     if (value === true || value === false) {
        //         this.options.dragdrop = value;
        //     } else {
        //         return this.options.dragdrop;
        //     }
        // },

        // onPlusBefore : function(value) {},

        // onPlusAfter : function() {},
        
        // onMinusBefore : function(value) {},

        // onMinusAfter : function(value) {},

        // placeholder : function(value) {
        //     if (value !== undefined) {
        //         this.options.placeholder = value;
        //         this.$elementBNumberStyle.find('input').attr('placeholder', value);
        //     } else {
        //         return this.options.placeholder;
        //     }
        // },





        constructor : function() {
            var _self = this,
                clone = _self.$element.clone(),
                spinner = $('<div class="SuperMonthPicker"></div>')
                            .append(clone)
                            .append('<div class="bNumberStyle-nav"><div class="bNumberStyle-button bNumberStyle-up">+</div><div class="bNumberStyle-button bNumberStyle-down">-</div></div>');

            // _self.$element.before(spinner);
            // _self.$element.remove();

            // var input = spinner.find('input[type="number"]'),
            //     btnUp = spinner.find(".bNumberStyle-up"),
            //     btnDown = spinner.find(".bNumberStyle-down"),
            //     step = Number(input.attr("step")) || 1,
            //     min = Number(input.attr("min")),
            //     max = Number(input.attr("max"));

            // input.keydown(function (e) {
            //     var k = e.keyCode;
            //     if ((k < 48 || k > 57) && (k < 96 || k > 105) && !String(k).match(/^(8|9|38|40|46)/)) {
            //         return false;
            //     } else if (!String(k).match(/^(8|9|38|40|46)/)) {
            //         if (Number($(this).val()) + Number(String.fromCharCode(57)) > max) {
            //             return false;
            //         }
            //     }
            // }).focus(function () {
            //     $(this)[0].selectionStart = this.selectionEnd;
            // });

            // btnUp.click(function() {
            //     var oldValue = parseFloat(input.val());
            //     if (oldValue >= max) {
            //         var newVal = oldValue;
            //     } else {
            //         var newVal = oldValue + parseFloat(step);
            //     }
            //     spinner.find("input").val(newVal);
            //     spinner.find("input").trigger("change");
            // });

            // btnDown.click(function() {
            //     var oldValue = parseFloat(input.val());
            //     if (oldValue <= min) {
            //         var newVal = oldValue;
            //     } else {
            //         var newVal = oldValue - parseFloat(step);
            //     }
            //     spinner.find("input").val(newVal);
            //     spinner.find("input").trigger("change");
            // });
        }
    };

    var old = $.fn.SuperMonthPicker;

    $.fn.sMonthPicker = function(option, value) {
        var get = '', element = this.each(function() {
            if ($(this).attr('type') === 'text') {
                var $this = $(this), data = $this.data('SuperMonthPicker'), options = $.extend({}, $.fn.SuperMonthPicker.defaults, option, typeof option === 'object' && option);

                if (!data) {
                    $this.data('SuperMonthPicker', ( data = new SuperMonthPicker(this, options)));
                    data.constructor();
                }

                if ( typeof option === 'string') {
                    get = data[option](value);
                }
            } else {
                console.error("It's element not a text field");
            }
        });

        if ( typeof get !== undefined) {
            return get;
        } else {
            return element;
        }
    };

    $.fn.SuperMonthPicker.defaults = {
        'ttt' : ''
    };

    $.fn.sMonthPicker.noConflict = function() {
        $.fn.SuperMonthPicker = old;
        return this;
    };

    $(function() {
        $('.sMonthPicker').each(function() {
            var $this = $(this), options = {
                'ttt' : $this.attr('ttt')
            };

            $this.sMonthPicker(options);
        });
    });
})(window.jQuery);