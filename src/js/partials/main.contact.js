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
        /*$scope.filter = {
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
        };*/

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

        $scope.sendOrderForm = function() {
            if ($scope.orderForm.$valid) {
                $scope.orderFormData['subject'] = 'Заявка на квартиру ЖК Андреевский';
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $httpParamSerializerJQLike($scope.orderFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $('.j-popup-gratitude').arcticmodal();
                    setTimeout(function() {
                        $('.j-popup-gratitude').arcticmodal('close');
                    }, 3000);
                    $scope.orderForm.$setPristine();
                    for (var prop in $scope.orderFormData) {
                        $scope.orderFormData[prop] = '';
                    }
                    ga('send', 'event', 'callback', 'click button');
                    yaCounter19895512.reachGoal('callback');
                });
            }
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