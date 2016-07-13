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

    /*$('.j-slider-benefits').slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        speed: 150,
        responsive: [
            {
                breakpoint: 700,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    $('.j-slider-experience').slick({
        mobileFirst: true,
        slidesToShow: 1,
        speed: 150,
        responsive: [
            {
                breakpoint: 780,
                settings: 'unslick'
            }
        ]
    });*/

    /*ymaps.ready(initMap);
    var myMap;
    var myPlacemark;

    function initMap() {
        myMap = new ymaps.Map('map', {
            center: [55.78658653618388, 37.61672235865735],
            zoom: 15
        });

        myPlacemark = new ymaps.Placemark([55.78658653618388, 37.61672235865735], {}, {
            iconImageHref: '/img/map-icon.png',
            iconImageSize: [73, 95],
            iconImageOffset: [-15, -95],
            iconLayout: 'default#image'
        });

        myMap.geoObjects.add(myPlacemark);
        myMap.behaviors.disable("scrollZoom");
        myMap.behaviors.disable('drag');
    }*/

    $('.j-scrollto-link').on('click', function(event) {
        $.scrollTo(
            $(this).data('scrollto-block'),
            {duration: 500}
        );
        return false;
    });

})();