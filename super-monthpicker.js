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
            var el = this.$elementSuperMonthPicker,
                year = el.find('.SMPContent .SMPYear').html(),
                yearEnd = el.find('.SMPContentEnd .SMPYear').html();
            el.find('.SMPChangeMonth div').removeClass('disabled');
            el.find('.SMPChangeMonth div').removeClass('active');

            maxMonth = Number(this.options.max.split('-')[0]);
            maxYear = Number(this.options.max.split('-')[1]);
            minMonth = Number(this.options.min.split('-')[0]);
            minYear = Number(this.options.min.split('-')[1]);

            if (year == startSelectYear) {
                el.find('.SMPContent .SMPChangeMonth div[data-val="'+startSelectMonth+'"]').addClass('active');
            }

            if (yearEnd == endSelectYear) {
                el.find('.SMPContentEnd .SMPChangeMonth div[data-val="'+endSelectMonth+'"]').addClass('active');
            }

            if (year == minYear) {
                for (var i = 1; i <= 12; i++) {
                    if (i < minMonth) {
                        el.find('.SMPContent').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                    }
                }
            }

            if (year == maxYear) {
                for (var i = 1; i <= 12; i++) {
                    if (i > maxMonth) {
                        el.find('.SMPContent').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                    }
                }
            }

            if (this.options.endDate != '') {
                if (yearEnd == minYear) {
                    for (var i = 1; i <= 12; i++) {
                        if (i < minMonth) {
                            el.find('.SMPContentEnd').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                        }
                    }
                }

                if (yearEnd == maxYear) {
                    for (var i = 1; i <= 12; i++) {
                        if (i > maxMonth) {
                            el.find('.SMPContentEnd').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                        }
                    }
                }

                // Disabled all 
                if (year >= endSelectYear) {
                    for (var i = 1; i <= 12; i++) {
                        if (i >= endSelectMonth || year > endSelectYear) {
                            el.find('.SMPContent').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                        }
                    }
                }

                if (yearEnd <= startSelectYear) {
                    for (var i = 1; i <= 12; i++) {
                        if (i <= startSelectMonth || yearEnd < startSelectYear) {
                            el.find('.SMPContentEnd').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                        }
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

            var SMPContent = this.$elementSuperMonthPicker.find('.SMPContent');

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
                var year = Number(SMPContent.find('.SMPYear').html());
                year--;
                if (minYear <= year || _self.options.min == '') {
                    SMPContent.find('.SMPYear').html(year);
                    _self.check();
                }
            });

            SMPContent.find('.SMPRight').on('click', function (e) {
                var year = Number(SMPContent.find('.SMPYear').html());
                year++;
                if (maxYear >= year || _self.options.max == '') {
                    SMPContent.find('.SMPYear').html(year);
                    _self.check();
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

                _self.check();
            });

            if (this.options.endDate != '') {
                var SMPContentEnd = this.$elementSuperMonthPicker.find('.SMPContentEnd');

                SMPContentEnd.find('.SMPChangeMonth div[data-val="'+endMonth+'"]').addClass('active');
                this.$elementSuperMonthPicker.find('.SMPContainer').css('width', '430px');
                
                SMPContentEnd.find('.SMPLeft').on('click', function (e) {
                    var year = Number(SMPContentEnd.find('.SMPYear').html());
                    year--;
                    if (minYear <= year || _self.options.min == '') {
                        SMPContentEnd.find('.SMPYear').html(year);
                        _self.check();
                    }
                });

                SMPContentEnd.find('.SMPRight').on('click', function (e) {
                    var year = Number(SMPContentEnd.find('.SMPYear').html());
                    year++;
                    if (maxYear >= year || _self.options.max == '') {
                        SMPContentEnd.find('.SMPYear').html(year);
                        _self.check();
                    }
                });

                SMPContentEnd.find('.SMPChangeMonth div').on('click', function (e) {
                    if ($(this).hasClass('disabled')) {
                        return false;
                    }
                    SMPContentEnd.find('.SMPChangeMonth div').removeClass('active');
                    $(this).addClass('active');
                    endSelectMonth = $(this).attr('data-val');
                    endSelectYear = SMPContentEnd.find('.SMPYear').html();

                    _self.check();
                });
            } else {
                this.$elementSuperMonthPicker.find('.SMPContainer').css('width', 'auto');
            }

            _self.$elementSuperMonthPicker.find('.btnOk').on('click', function (e) {
                var val = (startSelectMonth < 10 ? '0':'')+startSelectMonth+'/'+startSelectYear+(_self.options.endDate != '' ? ' ~ '+(endSelectMonth < 10 ? '0':'')+endSelectMonth+'/'+endSelectYear:'');
                _self.$elementSuperMonthPicker.find('.SMPField').html(val);
                _self.$elementSuperMonthPicker.val(val);
                _self.$elementSuperMonthPicker.find('.SMPContainer').hide();
            });

            _self.$elementSuperMonthPicker.find('.btnCancel').on('click', function (e) {
                _self.$elementSuperMonthPicker.find('.SMPContainer').hide();
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

        if (typeof get !== undefined) {
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