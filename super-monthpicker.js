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

    var startYear,
        startMonth,
        endYear,
        endMonth,
        maxYear,
        maxMonth,
        minYear,
        minMonth,
        startSelectYear,
        startSelectMonth,
        endSelectYear,
        endSelectMonth;

    $(document).on('click', function () {
        $('.SMPContainer').hide();
    });

    var SuperMonthPicker = function(element, options) {
        this.options = options;
        this.$elementSuperMonthPicker = [];
        this.$element = $(element);
    };

    SuperMonthPicker.prototype = {
        check : function () {
            var el = this.$elementSuperMonthPicker;

            el.find('.SMPChangeMonth div').removeClass('disabled');
            el.find('.SMPChangeMonth div').removeClass('active');

            if (el.find('.SMPContent .SMPYear').html() == startSelectYear) {
                el.find('.SMPContent .SMPChangeMonth div[data-val="'+startSelectMonth+'"]').addClass('active');
            }
            if (el.find('.SMPContentEnd .SMPYear').html() == endSelectYear) {
                el.find('.SMPContentEnd .SMPChangeMonth div[data-val="'+endSelectMonth+'"]').addClass('active');
            }

            maxMonth = Number(this.options.max.split('-')[0]);
            maxYear = Number(this.options.max.split('-')[1]);
            minMonth = Number(this.options.min.split('-')[0]);
            minYear = Number(this.options.min.split('-')[1]);

            if (endYear >= maxYear) {
                if (endMonth > maxMonth) {
                    endYear = maxYear;
                    endMonth = maxMonth;
                }
            }

            if (startYear <= minYear) {
                if (startMonth < minMonth) {
                    startYear = minYear;
                    startMonth = minMonth;
                }
            }

            if (this.options.max != '') {
                if (startYear == maxYear && maxMonth != 12) {
                    for (var i = maxMonth+1; i <= 12; i++) {
                        el.find('.SMPContent').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                    }
                }

                if (endYear == maxYear && maxMonth != 12) {
                    for (var i = maxMonth+1; i <= 12; i++) {
                        el.find('.SMPContentEnd').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                    }
                }
            }

            if (this.options.min != '') {
                if (startYear == minYear && minMonth != 1) {
                    for (var i = minMonth-1; i >= 1; i--) {
                        el.find('.SMPContent').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                    }
                }

                if (endYear == minYear && minMonth != 1) {
                    for (var i = minMonth-1; i >= 1; i--) {
                        el.find('.SMPContentEnd').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                    }
                }
            }
        },

        constructor : function() {
            var _self = this,
                clone = this.$element.clone(),
                d = new Date();

            if (this.options.startDate != '') {
                startMonth = Number(this.options.startDate.split('-')[0]);
                startYear = Number(this.options.startDate.split('-')[1]);
            } else {
                startMonth = d.getMonth();
                startMonth = d.getFullYear();
            }

            if (this.options.endDate != '') {
                endMonth = Number(this.options.endDate.split('-')[0]);
                endYear = Number(this.options.endDate.split('-')[1]);
            } else {
                endMonth = d.getMonth() + 1;
                endYear = d.getFullYear();
            }

            startSelectMonth = startMonth;
            startSelectYear = startYear;
            endSelectMonth = endMonth;
            endSelectYear = endYear;

            if (this.options.min != '') {
                minMonth = Number(this.options.min.split('-')[0]);
                minYear = Number(this.options.min.split('-')[1]);
            }

            if (this.options.max != '') {
                maxMonth = Number(this.options.max.split('-')[0]);
                maxYear = Number(this.options.max.split('-')[1]);
            }

            this.$elementSuperMonthPicker = $('<div class="SuperMonthPicker">'+
                '  <div class="SMPField">'+(startSelectMonth < 10 ? '0':'')+startSelectMonth+'/'+startSelectYear+(this.options.endDate != '' ? ' - '+(endSelectMonth < 10 ? '0':'')+endSelectMonth+'/'+endSelectYear:'')+'</div>'+
                '  <div class="SMPContainer">'+
                '    <div class="SMPContent">'+
                '      <div class="SMPChangeYear">'+
                '        <div class="SMPYear">'+startSelectYear+'</div>'+
                '        <div class="SMPLeft"><i class="arrow left"></i></div>'+
                '        <div class="SMPRight"><i class="arrow right"></i></div>'+
                '      </div>'+
                '      <div class="SMPChangeMonth">'+
                '        <div data-val="1">'+this.options.monthsName[0]+'</div>'+
                '        <div data-val="2">'+this.options.monthsName[1]+'</div>'+
                '        <div data-val="3">'+this.options.monthsName[2]+'</div>'+
                '        <div data-val="4">'+this.options.monthsName[3]+'</div>'+
                '        <div data-val="5">'+this.options.monthsName[4]+'</div>'+
                '        <div data-val="6">'+this.options.monthsName[5]+'</div>'+
                '        <div data-val="7">'+this.options.monthsName[6]+'</div>'+
                '        <div data-val="8">'+this.options.monthsName[7]+'</div>'+
                '        <div data-val="9">'+this.options.monthsName[8]+'</div>'+
                '        <div data-val="10">'+this.options.monthsName[9]+'</div>'+
                '        <div data-val="11">'+this.options.monthsName[10]+'</div>'+
                '        <div data-val="12">'+this.options.monthsName[11]+'</div>'+
                '      </div>'+
                '    </div>'+
                (this.options.endDate != '' ? 
                    '    <div class="SMPContentEnd">'+
                    '      <div class="SMPChangeYear">'+
                    '        <div class="SMPYear">'+endSelectYear+'</div>'+
                    '        <div class="SMPLeft"><i class="arrow left"></i></div>'+
                    '        <div class="SMPRight"><i class="arrow right"></i></div>'+
                    '      </div>'+
                    '      <div class="SMPChangeMonth">'+
                    '        <div data-val="1">'+this.options.monthsName[0]+'</div>'+
                    '        <div data-val="2">'+this.options.monthsName[1]+'</div>'+
                    '        <div data-val="3">'+this.options.monthsName[2]+'</div>'+
                    '        <div data-val="4">'+this.options.monthsName[3]+'</div>'+
                    '        <div data-val="5">'+this.options.monthsName[4]+'</div>'+
                    '        <div data-val="6">'+this.options.monthsName[5]+'</div>'+
                    '        <div data-val="7">'+this.options.monthsName[6]+'</div>'+
                    '        <div data-val="8">'+this.options.monthsName[7]+'</div>'+
                    '        <div data-val="9">'+this.options.monthsName[8]+'</div>'+
                    '        <div data-val="10">'+this.options.monthsName[9]+'</div>'+
                    '        <div data-val="11">'+this.options.monthsName[10]+'</div>'+
                    '        <div data-val="12">'+this.options.monthsName[11]+'</div>'+
                    '      </div>'+
                    '    </div>':'')+
                '    <div class="SMPButtons">'+
                '      <button type="button" class="btnCancel">Cancel</button>'+
                '      <button type="button" class="btnOk">Ok</button>'+
                '    </div>'+
                '  </div>'+
                '</div>').prepend(clone);

            this.$element.before(this.$elementSuperMonthPicker);
            this.$element.remove();

            var SMPContent = this.$elementSuperMonthPicker.find('.SMPContent'),
                SMPContentEnd = this.$elementSuperMonthPicker.find('.SMPContentEnd');

            if (this.options.endDate != '') {
                SMPContentEnd.find('.SMPChangeMonth div[data-val="'+endMonth+'"]').addClass('active');
                this.$elementSuperMonthPicker.find('.SMPContainer').css('width', '430px');
            } else {
                this.$elementSuperMonthPicker.find('.SMPContainer').css('width', 'auto');
            }

            this.check();

            // DEFALT EVENTS
            this.$elementSuperMonthPicker.on('click', function (e) {
                e.stopPropagation();
            });

            this.$elementSuperMonthPicker.find('.SMPField').on('click', function (e) {
                $('.SMPContainer').hide();
                _self.$elementSuperMonthPicker.find('.SMPContainer').show();
            });

            SMPContent.find('.SMPLeft').on('click', function (e) {
                startSelectYear--;
                if (Number(_self.options.min.split('-')[1]) <= startSelectYear || _self.options.min == '') {
                    SMPContent.find('.SMPYear').html(startSelectYear);
                    _self.check();
                } else {
                    startSelectYear++;
                }
            });

            SMPContent.find('.SMPRight').on('click', function (e) {
                startSelectYear++;
                if (Number(_self.options.max.split('-')[1]) >= startSelectYear || _self.options.max == '') {
                    SMPContent.find('.SMPYear').html(startSelectYear);
                    _self.check();
                } else {
                    startSelectYear--;
                }
            });

            SMPContent.find('.SMPChangeMonth div').on('click', function (e) {
                if ($(this).hasClass('disabled')) {
                    return false;
                }
                SMPContent.find('.SMPChangeMonth div').removeClass('active');
                $(this).addClass('active');
                startSelectMonth = $(this).attr('data-val');
                startSelectYear = SMPContent.find('.SMPYear').html();

                if (startSelectYear >= endSelectYear && startSelectMonth >= endSelectMonth) {
                    endSelectMonth = startSelectMonth == 12 ? 1 : startSelectMonth+1;

                    if (startSelectYear > endSelectYear) {
                        endSelectYear = endSelectMonth == 1 ? startSelectYear + 1 : startSelectYear;
                    }

                    if (SMPContentEnd.find('.SMPYear').html() == endSelectYear) {
                        SMPContentEnd.find('.SMPChangeMonth div').removeClass('active');
                        SMPContentEnd.find('.SMPChangeMonth div[data-val="'+endSelectMonth+'"]').addClass('active');
                    }
                }

                this.check();
            });

            SMPContentEnd.find('.SMPLeft').on('click', function (e) {
                endYear--;
                if (Number(_self.options.min.split('-')[1]) <= endYear || _self.options.min == '') {
                    SMPContentEnd.find('.SMPYear').html(endYear);
                    _self.check(SMPContentEnd);
                } else {
                    endYear++;
                }
            });

            SMPContentEnd.find('.SMPRight').on('click', function (e) {
                endYear++;
                if (Number(_self.options.max.split('-')[1]) >= endYear || _self.options.max == '') {
                    SMPContentEnd.find('.SMPYear').html(endYear);
                    _self.check(SMPContentEnd);
                } else {
                    endYear--;
                }
            });

            SMPContentEnd.find('.SMPChangeMonth div').on('click', function (e) {
                if ($(this).hasClass('disabled')) {
                    return false;
                }
                SMPContentEnd.find('.SMPChangeMonth div').removeClass('active');
                $(this).addClass('active');
                endMonth = $(this).attr('data-val');
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
        'startDate' : '',
        'endDate' : ''
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