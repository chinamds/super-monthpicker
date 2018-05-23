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


    $(document).on('click', function () {
        $('.SMPContainer').hide();
    });

    var SuperMonthPicker = function(element, options) {
        this.options = options;
        this.$elementSuperMonthPicker = [];
        this.$element = $(element);
    };

    SuperMonthPicker.prototype = {
        startYear: '',
        startMonth: '',
        endYear: '',
        endMonth: '',
        maxYear: '',
        maxMonth: '',
        minYear: '',
        minMonth: '',
        startSelectYear: '',
        startSelectMonth: '',
        endSelectYear: '',
        endSelectMonth: '',

        check : function () {
            var el = this.$elementSuperMonthPicker,
                year = el.find('.SMPContent .SMPYear').html(),
                yearEnd = '';
            el.find('.SMPChangeMonth div').removeClass('disabled');
            el.find('.SMPChangeMonth div').removeClass('active');

            if (this.options.min != '') {
                if (typeof this.options.min == 'object') {
                    this.minMonth = this.options.min.getMonth();
                    this.minYear = this.options.min.getFullYear();
                } else {
                    this.minMonth = Number(this.options.min.split('-')[0]);
                    this.minYear = Number(this.options.min.split('-')[1]);
                }
            }

            if (this.options.max != '') {
                console.log(typeof this.options.max);
                if (typeof this.options.max == 'object') {
                    this.maxMonth = this.options.max.getMonth();
                    this.maxYear = this.options.max.getFullYear();
                } else {
                    this.maxMonth = Number(this.options.max.split('-')[0]);
                    this.maxYear = Number(this.options.max.split('-')[1]);
                }
            }

            if (year == this.startSelectYear) {
                el.find('.SMPContent .SMPChangeMonth div[data-val="'+this.startSelectMonth+'"]').addClass('active');
            }

            if (year == this.minYear) {
                for (var i = 1; i <= 12; i++) {
                    if (i < this.minMonth) {
                        el.find('.SMPContent').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                    }
                }
            }

            if (year == this.maxYear) {
                for (var i = 1; i <= 12; i++) {
                    if (i > this.maxMonth) {
                        el.find('.SMPContent').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                    }
                }
            }

            if (this.options.endDate != '') {
                yearEnd = el.find('.SMPContentEnd .SMPYear').html();
                
                if (yearEnd == this.endSelectYear) {
                    el.find('.SMPContentEnd .SMPChangeMonth div[data-val="'+this.endSelectMonth+'"]').addClass('active');
                }

                if (yearEnd == this.minYear) {
                    for (var i = 1; i <= 12; i++) {
                        if (i < this.minMonth) {
                            el.find('.SMPContentEnd').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                        }
                    }
                }

                if (yearEnd == this.maxYear) {
                    for (var i = 1; i <= 12; i++) {
                        if (i > this.maxMonth) {
                            el.find('.SMPContentEnd').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                        }
                    }
                }

                // Disabled all 
                if (year >= this.endSelectYear) {
                    for (var i = 1; i <= 12; i++) {
                        if (i >= this.endSelectMonth || year > this.endSelectYear) {
                            el.find('.SMPContent').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                        }
                    }
                }

                if (yearEnd <= this.startSelectYear) {
                    for (var i = 1; i <= 12; i++) {
                        if (i <= this.startSelectMonth || yearEnd < this.startSelectYear) {
                            el.find('.SMPContentEnd').find('.SMPChangeMonth div[data-val="'+i+'"]').addClass('disabled');
                        }
                    }
                }
            }
        },

        checkNavigator: function (el, year) {
            el.find('.SMPRight, .SMPLeft').removeClass('disabled');

            if (this.minYear >= year && this.options.min != '') {
                el.find('.SMPLeft').addClass('disabled');
            }
            if (this.maxYear <= year && this.options.max != '') {
                el.find('.SMPRight').addClass('disabled');
            }
        },

        reset: function () {
            this.startSelectMonth = this.currentStartMonth;
            this.startSelectYear = this.currentStartYear;
            this.endSelectMonth = this.currentEndMonth;
            this.endSelectYear = this.currentEndYear;

            this.$elementSuperMonthPicker.find('.SMPContent .SMPYear').html(this.startSelectYear);
            this.$elementSuperMonthPicker.find('.SMPContentEnd .SMPYear').html(this.endSelectYear);
            this.check();
        },

        constructor : function() {
            var _self = this,
                clone = this.$element.clone(),
                d = new Date(),
                val = '';

            if (this.options.startDate != '') {
                if (typeof this.options.startDate == 'object') {
                    this.startMonth = this.options.startDate.getMonth()+1;
                    this.startYear = this.options.startDate.getFullYear();
                } else {
                    this.startMonth = Number(this.options.startDate.split('-')[0]);
                    this.startYear = Number(this.options.startDate.split('-')[1]);
                }
            } else {
                this.startMonth = d.getMonth();
                this.startMonth = d.getFullYear();
            }

            if (this.options.endDate != '') {
                if (typeof this.options.endDate == 'object') {
                    this.endMonth = this.options.endDate.getMonth()+1;
                    this.endYear = this.options.endDate.getFullYear();
                } else {
                    this.endMonth = Number(this.options.endDate.split('-')[0]);
                    this.endYear = Number(this.options.endDate.split('-')[1]);
                }
            } else {
                this.endMonth = d.getMonth() + 1;
                this.endYear = d.getFullYear();
            }


            if (this.options.endDate != '') {
                if (this.startYear > this.endYear) {
                    console.log('Invalid: startDate greater than or equal endDate');
                } else if (this.startYear == this.endYear) {
                    if (this.startMonth >= this.endMonth) {
                        console.log('Invalid: startDate greater than or equal endDate');
                    }
                }
            }

            this.startSelectMonth = this.startMonth;
            this.startSelectYear = this.startYear;
            this.endSelectMonth = this.endMonth;
            this.endSelectYear = this.endYear;

            this.currentStartMonth = this.startMonth;
            this.currentStartYear = this.startYear;
            this.currentEndMonth = this.endMonth;
            this.currentEndYear = this.endYear;

            if (this.options.min != '') {
                if (typeof this.options.min == 'object') {
                    this.minMonth = this.options.min.getMonth()+1;
                    this.minYear = this.options.min.getFullYear();
                } else {
                    this.minMonth = Number(this.options.min.split('-')[0]);
                    this.minYear = Number(this.options.min.split('-')[1]);
                }
            }

            if (this.options.max != '') {
                console.log(typeof this.options.max);
                if (typeof this.options.max == 'object') {
                    this.maxMonth = this.options.max.getMonth()+1;
                    this.maxYear = this.options.max.getFullYear();
                } else {
                    this.maxMonth = Number(this.options.max.split('-')[0]);
                    this.maxYear = Number(this.options.max.split('-')[1]);
                }
            }

            val = (this.startSelectMonth < 10 ? '0':'')+this.startSelectMonth+'/'+this.startSelectYear+(this.options.endDate != '' ? ' ~ '+(this.endSelectMonth < 10 ? '0':'')+this.endSelectMonth+'/'+this.endSelectYear:'');
            clone.val(val);
            clone.prop('disabled', true);

            this.$elementSuperMonthPicker = $('<div class="SuperMonthPicker">'+
                '  <div class="SMPField"></div>'+
                '  <div class="SMPContainer">'+
                '    <div class="SMPContent">'+
                '      <div class="SMPChangeYear">'+
                '        <div class="SMPYear">'+this.startSelectYear+'</div>'+
                '        <div class="SMPLeft"><i class="arrow left"></i></div>'+
                '        <div class="SMPRight"><i class="arrow right"></i></div>'+
                '      </div>'+
                '      <div class="SMPChangeMonth">'+
                '        <div data-val="1">'+this.options.monthsName[0].slice(0, 3)+'</div>'+
                '        <div data-val="2">'+this.options.monthsName[1].slice(0, 3)+'</div>'+
                '        <div data-val="3">'+this.options.monthsName[2].slice(0, 3)+'</div>'+
                '        <div data-val="4">'+this.options.monthsName[3].slice(0, 3)+'</div>'+
                '        <div data-val="5">'+this.options.monthsName[4].slice(0, 3)+'</div>'+
                '        <div data-val="6">'+this.options.monthsName[5].slice(0, 3)+'</div>'+
                '        <div data-val="7">'+this.options.monthsName[6].slice(0, 3)+'</div>'+
                '        <div data-val="8">'+this.options.monthsName[7].slice(0, 3)+'</div>'+
                '        <div data-val="9">'+this.options.monthsName[8].slice(0, 3)+'</div>'+
                '        <div data-val="10">'+this.options.monthsName[9].slice(0, 3)+'</div>'+
                '        <div data-val="11">'+this.options.monthsName[10].slice(0, 3)+'</div>'+
                '        <div data-val="12">'+this.options.monthsName[11].slice(0, 3)+'</div>'+
                '      </div>'+
                '    </div>'+
                (this.options.endDate != '' ? 
                    '    <div class="SMPDivider"></div>'+
                    '    <div class="SMPContentEnd">'+
                    '      <div class="SMPChangeYear">'+
                    '        <div class="SMPYear">'+this.endSelectYear+'</div>'+
                    '        <div class="SMPLeft"><i class="arrow left"></i></div>'+
                    '        <div class="SMPRight"><i class="arrow right"></i></div>'+
                    '      </div>'+
                    '      <div class="SMPChangeMonth">'+
                    '        <div data-val="1">'+this.options.monthsName[0].slice(0, 3)+'</div>'+
                    '        <div data-val="2">'+this.options.monthsName[1].slice(0, 3)+'</div>'+
                    '        <div data-val="3">'+this.options.monthsName[2].slice(0, 3)+'</div>'+
                    '        <div data-val="4">'+this.options.monthsName[3].slice(0, 3)+'</div>'+
                    '        <div data-val="5">'+this.options.monthsName[4].slice(0, 3)+'</div>'+
                    '        <div data-val="6">'+this.options.monthsName[5].slice(0, 3)+'</div>'+
                    '        <div data-val="7">'+this.options.monthsName[6].slice(0, 3)+'</div>'+
                    '        <div data-val="8">'+this.options.monthsName[7].slice(0, 3)+'</div>'+
                    '        <div data-val="9">'+this.options.monthsName[8].slice(0, 3)+'</div>'+
                    '        <div data-val="10">'+this.options.monthsName[9].slice(0, 3)+'</div>'+
                    '        <div data-val="11">'+this.options.monthsName[10].slice(0, 3)+'</div>'+
                    '        <div data-val="12">'+this.options.monthsName[11].slice(0, 3)+'</div>'+
                    '      </div>'+
                    '    </div>':'')+
                '    <div class="SMPButtons">'+
                '      <button type="button" class="btnCancel">'+this.options.btnCancel+'</button>'+
                '      <button type="button" class="btnOk">'+this.options.btnOk+'</button>'+
                '    </div>'+
                '  </div>'+
                '</div>').prepend(clone);

            this.$element.before(this.$elementSuperMonthPicker);
            this.$element.remove();

            var SMPContent = this.$elementSuperMonthPicker.find('.SMPContent');

            this.check();

            this.$elementSuperMonthPicker.on('click', function (e) {
                e.stopPropagation();
            });
            
            _self.checkNavigator(SMPContent, this.startSelectYear);

            this.$elementSuperMonthPicker.find('.SMPField').on('click', function (e) {
                $('.SMPContainer').hide();
                _self.$elementSuperMonthPicker.find('.SMPContainer').show();
                _self.reset();
            });

            SMPContent.find('.SMPLeft').on('click', function (e) {
                var year = Number(SMPContent.find('.SMPYear').html());
                year--;
                if (_self.minYear <= year || _self.options.min == '') {
                    SMPContent.find('.SMPYear').html(year);
                    _self.check();
                    _self.checkNavigator(SMPContent, year);
                }
                if (typeof _self.options.onSelectYear == 'function') {
                    _self.options.onSelectYear();
                }
            });

            SMPContent.find('.SMPRight').on('click', function (e) {
                var year = Number(SMPContent.find('.SMPYear').html());
                year++;
                if (_self.maxYear >= year || _self.options.max == '') {
                    SMPContent.find('.SMPYear').html(year);
                    _self.check();
                    _self.checkNavigator(SMPContent, year);
                }
                if (typeof _self.options.onSelectYear == 'function') {
                    _self.options.onSelectYear();
                }
            });

            SMPContent.find('.SMPChangeMonth div').on('click', function (e) {
                if ($(this).hasClass('disabled')) {
                    return false;
                }
                SMPContent.find('.SMPChangeMonth div').removeClass('active');
                $(this).addClass('active');
                _self.startSelectMonth = $(this).attr('data-val');
                _self.startSelectYear = SMPContent.find('.SMPYear').html();

                _self.check();
                if (typeof _self.options.onSelectMonth == 'function') {
                    _self.options.onSelectMonth();
                }
            });

            if (this.options.endDate != '') {
                var SMPContentEnd = this.$elementSuperMonthPicker.find('.SMPContentEnd');
                _self.checkNavigator(SMPContentEnd, this.endSelectYear);

                SMPContentEnd.find('.SMPChangeMonth div[data-val="'+this.endMonth+'"]').addClass('active');
                this.$elementSuperMonthPicker.find('.SMPContainer').css('width', '430px');
                
                SMPContentEnd.find('.SMPLeft').on('click', function (e) {
                    var year = Number(SMPContentEnd.find('.SMPYear').html());
                    year--;
                    if (_self.minYear <= year || _self.options.min == '') {
                        SMPContentEnd.find('.SMPYear').html(year);
                        _self.check();
                        _self.checkNavigator(SMPContentEnd, year);
                    }
                    if (typeof _self.options.onSelectYear == 'function') {
                        _self.options.onSelectYear();
                    }
                });

                SMPContentEnd.find('.SMPRight').on('click', function (e) {
                    var year = Number(SMPContentEnd.find('.SMPYear').html());
                    year++;
                    if (_self.maxYear >= year || _self.options.max == '') {
                        SMPContentEnd.find('.SMPYear').html(year);
                        _self.check();
                        _self.checkNavigator(SMPContentEnd, year);
                    }
                    if (typeof _self.options.onSelectYear == 'function') {
                        _self.options.onSelectYear();
                    }
                });

                SMPContentEnd.find('.SMPChangeMonth div').on('click', function (e) {
                    if ($(this).hasClass('disabled')) {
                        return false;
                    }
                    SMPContentEnd.find('.SMPChangeMonth div').removeClass('active');
                    $(this).addClass('active');
                    _self.endSelectMonth = $(this).attr('data-val');
                    _self.endSelectYear = SMPContentEnd.find('.SMPYear').html();

                    _self.check();
                    if (typeof _self.options.onSelectMonth == 'function') {
                        _self.options.onSelectMonth();
                    }
                });
            } else {
                this.$elementSuperMonthPicker.find('.SMPContainer').css('width', 'auto');
            }

            _self.$elementSuperMonthPicker.find('.btnOk').on('click', function (e) {
                var val = (_self.startSelectMonth < 10 ? '0':'')+_self.startSelectMonth+'/'+_self.startSelectYear+(_self.options.endDate != '' ? ' ~ '+(_self.endSelectMonth < 10 ? '0':'')+_self.endSelectMonth+'/'+_self.endSelectYear:'');
                //_self.$elementSuperMonthPicker.find('.SMPField').html(val);
                clone.val(val);

                _self.currentStartMonth = _self.startSelectMonth;
                _self.currentStartYear = _self.startSelectYear;
                _self.currentEndMonth = _self.endSelectMonth;
                _self.currentEndYear = _self.endSelectYear;

                _self.$elementSuperMonthPicker.find('.SMPContainer').hide();
                if (typeof _self.options.onChose == 'function') {
                    _self.options.onChose();
                }
            });

            _self.$elementSuperMonthPicker.find('.btnCancel').on('click', function (e) {
                _self.$elementSuperMonthPicker.find('.SMPContainer').hide();
                if (typeof _self.options.onClose == 'function') {
                    _self.options.onClose();
                }
            });

            if (typeof this.options.onOpen == 'function') {
                this.options.onOpen();
            }
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
        'endDate' : '',
        'theme': 'default',
        'btnOk' : 'Ok',
        'btnCancel' : 'Cancel',
        'onSelectMonth': function () {},
        'onSelectYear': function () {},
        'onOpen': function () {},
        'onClose': function () {},
        'onChose': function () {}
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