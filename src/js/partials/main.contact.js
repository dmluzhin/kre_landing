(function() {
    'use strict';

    Array.prototype.max = function() {
        return Math.max.apply(null, this);
    };

    Array.prototype.min = function() {
        return Math.min.apply(null, this);
    };

    var app = angular.module('main', []);

    app.controller('mainController', ['$scope', '$http', '$httpParamSerializerJQLike', function($scope, $http, $httpParamSerializerJQLike) {

        $scope.callbackFormData = {};
        $scope.orderFormData = {};
        $scope.barkliBrokerFormData = {};
        $scope.isCallbackFormSended = false;
        $scope.isBarkliBrokerFormSended = false;
        $scope.currentTab = 1;
        $scope.params = [];
        $scope.filter = {
            rooms: {
                min: 10,
                max: 10,
                currentMin: 10,
                currentMax: 10,
                cssClass: '.j-filter-rooms'
            },
            floor: {
                min: 10,
                max: 10,
                currentMin: 10,
                currentMax: 10,
                cssClass: '.j-filter-floor'
            },
            square: {
                min: 10,
                max: 10,
                currentMin: 10,
                currentMax: 10,
                cssClass: '.j-filter-square'
            },
            price: {
                min: 10,
                max: 10,
                currentMin: 10,
                currentMax: 10,
                cssClass: '.j-filter-price'
            }
        };

        $scope.showCallbackPopup = function() {
            if ($scope.isCallbackFormSended) $scope.isCallbackFormSended = false;
            $('.j-popup-callback').arcticmodal();
        };

        $scope.sendCallbackForm = function() {
            if ($scope.callbackForm.$valid) {
                $scope.callbackFormData['subject'] = 'Заказать обратный звонок ЖК Андреевский';
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $httpParamSerializerJQLike($scope.callbackFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $scope.callbackForm.$setPristine();
                    for (var prop in $scope.callbackFormData) {
                        $scope.callbackFormData[prop] = '';
                    }
                    $scope.isCallbackFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-callback').arcticmodal('close');
                    }, 3000);
                    ga('send', 'event', 'callback', 'click button');
                    yaCounter19895512.reachGoal('callback');
                });
            }
        };

        $scope.showSignPopup = function() {
            if ($scope.isSignFormSended) $scope.isSignFormSended = false;
            $('.j-popup-sign').arcticmodal();
        };

        $scope.sendSignForm = function() {
            if ($scope.signForm.$valid) {
                $scope.signFormData['subject'] = 'Заказать обратный звонок ЖК Андреевский';
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $httpParamSerializerJQLike($scope.callbackFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $scope.callbackForm.$setPristine();
                    for (var prop in $scope.callbackFormData) {
                        $scope.callbackFormData[prop] = '';
                    }
                    $scope.isCallbackFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-sign').arcticmodal('close');
                    }, 3000);
                    ga('send', 'event', 'callback', 'click button');
                    yaCounter19895512.reachGoal('callback');
                });
            }
        };

        $scope.showBarkliBrokerPopup = function() {
            if ($scope.isBarkliBrokerFormSended) $scope.isBarkliBrokerFormSended = false;
            $('.j-popup-barkli-broker').arcticmodal();
        };

        $scope.sendBarkliBrokerForm = function() {
            if ($scope.barkliBrokerForm.$valid) {
                $scope.barkliBrokerFormData['subject'] = 'Заявка на квартиру ЖК Андреевский';
                $scope.barkliBrokerFormData['email'] = 'voronkov@kre.ru';
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $httpParamSerializerJQLike($scope.barkliBrokerFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $scope.barkliBrokerForm.$setPristine();
                    for (var prop in $scope.barkliBrokerFormData) {
                        $scope.barkliBrokerFormData[prop] = '';
                    }
                    $scope.isBarkliBrokerFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-barkli-broker').arcticmodal('close');
                    }, 3000);
                    ga('send', 'event', 'callback', 'click button');
                    yaCounter19895512.reachGoal('callback');
                });
            }
        };

        $http.get(window.apartmentsUrl + window.PID + '/').success(function(data) {

            $scope.searchMinMax = {
                rooms: [],
                floor: [],
                square: [],
                price: []
            };
            var flats = data.split('\n');
            flats.forEach(function(flat, i) {
                if (flat.length === 0) return;
                var currentFlat = flat.split(';');
                $scope.searchMinMax.rooms.push(currentFlat[1]);
                $scope.searchMinMax.floor.push(currentFlat[2]);
                $scope.searchMinMax.square.push(currentFlat[3]);
                $scope.searchMinMax.price.push(currentFlat[5]);
                $scope.params.push({
                    lot: parseInt(currentFlat[0]),
                    rooms: parseInt(currentFlat[1]),
                    floor: parseInt(currentFlat[2]),
                    square: parseFloat(currentFlat[3]),
                    section: currentFlat[4],
                    price: parseFloat(currentFlat[5]),
                    img: currentFlat[6]
                });
            });

            $scope.flatsSumm = $scope.params.length;

            $scope.slidersInit = function() {
                for (var prop in $scope.filter) {
                    $scope.filter[prop].min = $scope.filter[prop].currentMin = $scope.searchMinMax[prop].min();
                    $scope.filter[prop].max = $scope.filter[prop].currentMax = $scope.searchMinMax[prop].max();

                    $($scope.filter[prop].cssClass).slider({
                        range: true,
                        min: $scope.filter[prop].min,
                        max: $scope.filter[prop].max,
                        values: [$scope.filter[prop].min, $scope.filter[prop].max]
                    });
                }

                $('.j-filter-rooms, .j-filter-floor, .j-filter-square, .j-filter-price').on('slide', function(event, ui) {
                    var prop = $(this).data('param');
                    var $scope = angular.element('body').scope();
                    $scope.$apply(function() {
                        $scope.filter[prop].currentMin = ui.values[0];
                        $scope.filter[prop].currentMax = ui.values[1];
                    });
                    $('.m-flats__row_odd').removeClass('m-flats__row_odd');
                    $('.j-flats-row:visible:odd').addClass('m-flats__row_odd');
                    var $scope = angular.element('body').scope();
                    $scope.$apply(function() {
                        $scope.flatsSumm = $('.j-flats-row:visible').length;
                    });
                });

            }();

        });

        /*$http.get('/sliders.contact.json').success(function(data) {
            $scope.hugeSliderData = data;
        });*/

        /*$scope.flatsReady = function() {
            $('.j-flats-row:odd').addClass('m-flats__row_odd');
        };*/


        /*$scope.hugeSliderReady = function () {
            setTimeout(function() {
                $('.j-huge-slider').slick({
                    slidesToShow: 1,
                    speed: 150
                });
            }, 1);
        };*/

        /*$scope.showFlatPopup = function(index) {
            $scope.flatInPopup = $scope.params[index];
            $('.j-popup-flat').arcticmodal();
        };
        $scope.showCountryPopup = function(index) {
            $scope.flatInPopup = $scope.params[index];
            $('.j-popup-country').arcticmodal();
        };
        $scope.showCommercPopup = function(index) {
            $scope.flatInPopup = $scope.params[index];
            $('.j-popup-commerc').arcticmodal();
        };*/

        $scope.isShowRow = function(index) {
            return  ($scope.params[index].rooms >=  $scope.filter.rooms.currentMin &&
                $scope.params[index].rooms <= $scope.filter.rooms.currentMax) &&
                ($scope.params[index].floor >= $scope.filter.floor.currentMin &&
                $scope.params[index].floor <= $scope.filter.floor.currentMax) &&
                ($scope.params[index].square >= $scope.filter.square.currentMin &&
                $scope.params[index].square <= $scope.filter.square.currentMax) &&
                ($scope.params[index].price >= $scope.filter.price.currentMin &&
                $scope.params[index].price <= $scope.filter.price.currentMax);
        };

    }]);

    app.directive("repeatEnd", function () {
        return {
            restrict: "A",
            link: function (scope, element, attrs) {
                if (scope.$last) {
                    scope.$eval(attrs.repeatEnd);
                }
            }
        };
    });

})();