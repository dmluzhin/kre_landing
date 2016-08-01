(function() {
    'use strict';

    $('.j-popup-close').on('click', function () {
        $(this).parent().arcticmodal('close');
    });

    $('.j-input-time').on('focusin', function() {
        $(this).attr({type: 'time', value: '12:00'});
    }).on('focusout', function() {
        $(this).attr('type', 'text');
    });

    $('.j-phone-masked').on('keydown', function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode == 65 && ( e.ctrlKey === true || e.metaKey === true ) ) ||
            (e.keyCode >= 35 && e.keyCode <= 40)) {
            return;
        }
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 107)) {
            e.preventDefault();
        }
    });
    $('.j-scrollto-link').on('click', function(event) {
        $.scrollTo(
            $(this).data('scrollto-block'),
            {duration: 500}
        );
        return false;
    });

})();