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
        $scope.country = [];
        $scope.commerc = [];

        /*CALLBACK POPUP START*/

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
        /*CALLBACK POPUP END*/

        /*SIGN POPUP START*/
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
        /*SIGN POPUP END*/

        /*SENDING EMAIL TO BROKER START*/
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

        /*SENDING EMAIL TO BROKER END*/

        function addSpaces(n) {
            var rx = /(\d+)(\d{3})/;
            return String(n)
                .replace(/^\d+/, function (w) {
                    while (rx.test(w)) {
                        w = w.replace(rx, '$1 $2');
                    }
                    return w;
                });
        }
        $http.get('/city.json').success(function(data) {
            for (var i=0;i<data.length; i+=1) {
                var currentFlat = data[i];
                $scope.params.push({
                    lot: parseInt(currentFlat.id),
                    estate: currentFlat.estate,
                    address: currentFlat.address,
                    rooms: parseInt(currentFlat['nb_rooms']),
                    floor: parseInt(currentFlat.floor),
                    square: parseFloat(currentFlat.area),
                    decoration: currentFlat.decoration,
                    old_price: addSpaces(parseInt(currentFlat['old_price']/100)),
                    new_price: addSpaces(parseInt(currentFlat['new_price']/100)),
                    discount: parseFloat(currentFlat.discount),
                    img: currentFlat.photo
                });
            }
        });
        $http.get('/country.json').success(function(data) {
            for (var i=0;i<data.length; i+=1) {
                var currentFlat = data[i];
                $scope.country.push({
                    lot: parseInt(currentFlat.id),
                    estate: currentFlat.estate,
                    address: currentFlat.address,
                    direction: currentFlat.direction,
                    distance: parseInt(currentFlat.distance),
                    type: currentFlat.type,
                    land_area: parseFloat(currentFlat['land_area']),
                    house_area: parseFloat(currentFlat['house_area']),
                    decoration: currentFlat.decoration,
                    old_price: addSpaces(parseInt(currentFlat['old_price']/10)),
                    new_price: addSpaces(parseInt(currentFlat['new_price']/10)),
                    discount: parseFloat(currentFlat.discount),
                    img: currentFlat.photo
                });
            }
        });
        $http.get('/commerc.json').success(function(data) {
            for (var i=0;i<data.length; i+=1) {
                var currentFlat = data[i];
                $scope.commerc.push({
                    lot: parseInt(currentFlat.id),
                    type: currentFlat.type,
                    address: currentFlat.address,
                    district: currentFlat.district,
                    metro: currentFlat.metro,
                    distance: currentFlat.distance,
                    area: parseFloat(currentFlat['area']),
                    decoration: currentFlat.decoration,
                    old_price: addSpaces(parseInt(currentFlat['old_price'])),
                    new_price: addSpaces(parseInt(currentFlat['new_price'])),
                    discount: parseFloat(currentFlat.discount),
                    img: currentFlat.photo
                });
            }
        });
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