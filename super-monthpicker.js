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

    var year = new Date().getFullYear(),
        month = new Date().getMonth(),
        maxYear,
        maxMonth,
        minYear,
        minMonth;

    $(document).on('click', function () {
        $('.SMPContent').hide();
    });

    var SuperMonthPicker = function(element, options) {
        this.options = options;
        this.$elementSuperMonthPicker = [];
        this.$element = $(element);
    };

    SuperMonthPicker.prototype = {
        constructor : function() {
            var _self = this,
                clone = _self.$element.clone();

            if (_self.options.startDate != '') {
                month = Number(_self.options.startDate.split('-')[0]);
                year = Number(_self.options.startDate.split('-')[1]);
            }

            _self.$elementSuperMonthPicker = $('<div class="SuperMonthPicker">'+
                '  <div class="SMPField">'+(month < 10 ? '0':'')+month+'/'+year+'</div>'+
                '  <div class="SMPContent">'+
                '    <div class="SMPChangeYear">'+
                '      <div class="SMPYear">'+year+'</div>'+
                '      <div class="SMPLeft"><i class="arrow left"></i></div>'+
                '      <div class="SMPRight"><i class="arrow right"></i></div>'+
                '    </div>'+
                '    <div class="SMPChangeMonth">'+
                '      <div data-val="1">'+_self.options.monthsName[0]+'</div>'+
                '      <div data-val="2">'+_self.options.monthsName[1]+'</div>'+
                '      <div data-val="3">'+_self.options.monthsName[2]+'</div>'+
                '      <div data-val="4">'+_self.options.monthsName[3]+'</div>'+
                '      <div data-val="5">'+_self.options.monthsName[4]+'</div>'+
                '      <div data-val="6">'+_self.options.monthsName[5]+'</div>'+
                '      <div data-val="7">'+_self.options.monthsName[6]+'</div>'+
                '      <div data-val="8">'+_self.options.monthsName[7]+'</div>'+
                '      <div data-val="9">'+_self.options.monthsName[8]+'</div>'+
                '      <div data-val="10">'+_self.options.monthsName[9]+'</div>'+
                '      <div data-val="11">'+_self.options.monthsName[10]+'</div>'+
                '      <div data-val="12">'+_self.options.monthsName[11]+'</div>'+
                '    </div>'+
                '    <div class="SMPButtons">'+
                '      <button type="button" class="btnCancel">Cancel</button>'+
                '      <button type="button" class="btnOk">Ok</button>'+
                '    </div>'+
                '  </div>'+
                '</div>').prepend(clone);

            _self.$element.before(_self.$elementSuperMonthPicker);
            _self.$element.remove();

            _self.$elementSuperMonthPicker.find('.SMPChangeMonth div[data-val="'+month+'"]').addClass('active');

            if (_self.options.max != '') {
                maxMonth = Number(_self.options.max.split('-')[0]);
                maxYear = Number(_self.options.max.split('-')[1]);

                if (year == maxYear && maxMonth != 12) {
                    for (var i = maxMonth; i <= 12; i++) {
                        _self.$elementSuperMonthPicker.find('.SMPChangeMonth div[data-val="'+month+'"]').addClass('disabled');
                    }
                }
            }

            _self.$elementSuperMonthPicker.on('click', function (e) {
                e.stopPropagation();
            });

            _self.$elementSuperMonthPicker.find('.SMPField').on('click', function (e) {
                $('.SMPContent').hide();
                _self.$elementSuperMonthPicker.find('.SMPContent').show();
            });

            _self.$elementSuperMonthPicker.find('.SMPLeft').on('click', function (e) {
                year--;
                if (Number(_self.options.min.split('-')[1]) <= year || _self.options.min == '') {
                    _self.$elementSuperMonthPicker.find('.SMPYear').html(year);
                } else {
                    year++;
                }
            });

            _self.$elementSuperMonthPicker.find('.SMPRight').on('click', function (e) {
                year++;
                if (Number(_self.options.max.split('-')[1]) >= year || _self.options.max == '') {
                    _self.$elementSuperMonthPicker.find('.SMPYear').html(year);
                } else {
                    year--;
                }
            });

            _self.$elementSuperMonthPicker.find('.SMPChangeMonth div').on('click', function (e) {
                if ($(this).hasClass('disabled')) {
                    return false;
                }
                _self.$elementSuperMonthPicker.find('.SMPChangeMonth div').removeClass('active');
                $(this).addClass('active');
                month = $(this).attr('data-val');
            });

            _self.$elementSuperMonthPicker.find('.btnOk').on('click', function (e) {
                _self.$elementSuperMonthPicker.find('.SMPField').html((month < 10 ? '0':'')+month+'/'+year);
                _self.$elementSuperMonthPicker.find('.SMPContent').hide();
            });

            _self.$elementSuperMonthPicker.find('.btnCancel').on('click', function (e) {
                _self.$elementSuperMonthPicker.find('.SMPContent').hide();
            });
        }
    };

    var old = $.fn.SuperMonthPicker;

    $.fn.sMonthPicker = function(option, value) {
        var get = '', element = this.each(function() {
            if ($(this).attr('type') === 'text') {
                var $this = $(this), data = $this.data('sMonthPicker'), options = $.extend({}, $.fn.sMonthPicker.defaults, option, typeof option === 'object' && option);

                if (!data) {
                    $this.data('sMonthPicker', ( data = new SuperMonthPicker(this, options)));
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

    $.fn.sMonthPicker.defaults = {
        'monthsName' : ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        'max' : '',
        'min' : '',
        'startDate' : ''
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