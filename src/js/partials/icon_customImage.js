ymaps.ready(function () {
    var myMap = new ymaps.Map('map-1', {
            center: [55.723699,37.583697],
            zoom: 16
        }, {
            searchControlProvider: 'yandex#search'
        }),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Фрунзенская 2-я ул., д. 8',
            balloonContent: 'Фрунзенская 2-я ул., д. 8'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: 'img/map-icon-g.png',
            // Размеры метки.
            iconImageSize: [73, 94],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-30, -100]
        });

    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
    myMap.behaviors.disable('drag');
});