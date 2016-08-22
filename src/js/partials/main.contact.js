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
        $scope.signFormData = {};
        $scope.orderFormData = {};
        $scope.subFormData = {}
        $scope.barkliBrokerFormData = {};
        $scope.isCallbackFormSended = false;
        $scope.isSignFormSended = false;
        $scope.issubFormSended = false;
        $scope.isOrderFormSended = false;
        $scope.isBarkliBrokerFormSended = false;
        $scope.currentTab = 2;
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
                $scope.callbackFormData['subject'] = 'Заказать обратный звонок. Скидки.';
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
                });
            }
        };
        /*CALLBACK POPUP END*/

        /*SIGN POPUP START*/
        $scope.showSignPopup = function() {
            if ($scope.isSignFormSended) $scope.isSignFormSended = false;
            $('.j-popup-gratitude-sign').arcticmodal();
        };

        $scope.sendSignForm = function() {
            if ($scope.signForm.$valid) {
                $scope.signFormData['subject'] = 'Подписка на Discount';
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $httpParamSerializerJQLike($scope.signFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $scope.signForm.$setPristine();
                    for (var prop in $scope.signFormData) {
                        $scope.signFormData[prop] = '';
                    }
                    $scope.isSignFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-gratitude-sign').arcticmodal('close');
                    }, 3000);
                });
            }
            console.log($scope.signForm);
        };
        /*SIGN POPUP END*/

        /*REQUEST FORM SENDING START*/

        $scope.sendOrderForm = function() {
            if ($scope.orderForm.$valid) {
                $scope.orderFormData['subject'] = 'Заказать обратный звонок';
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $httpParamSerializerJQLike($scope.orderFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $('.j-popup-gratitude-request').arcticmodal();
                    setTimeout(function() {
                        $('.j-popup-gratitude-request').arcticmodal('close');
                    }, 3000);
                    $scope.orderForm.$setPristine();
                    for (var prop in $scope.orderFormData) {
                        $scope.orderFormData[prop] = '';
                    }
                    $scope.isOrderFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-gratitude-request').arcticmodal('close');
                    }, 3000);
                });
            }
        };

        $scope.sendSubForm = function() {
            if ($scope.subForm.$valid) {
                $scope.subFormData['subject'] = 'Подписка на Discount';
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $httpParamSerializerJQLike($scope.subFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $('.j-popup-gratitude-sign').arcticmodal();
                    setTimeout(function() {
                        $('.j-popup-gratitude-sign').arcticmodal('close');
                    }, 3000);
                    $scope.subForm.$setPristine();
                    for (var prop in $scope.subFormData) {
                        $scope.subFormData[prop] = '';
                    }
                    $scope.issubFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-gratitude-sign').arcticmodal('close');
                    }, 3000);
                });
            }
        };

        $scope.showSignPopup = function() {
            if ($scope.isSignFormSended) $scope.isSignFormSended = false;
            $('.j-popup-sign').arcticmodal();
        };
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
        function sort(obj1, obj2) {
            return obj2.discount - obj1.discount;
        }
        $http.get('http://www.kre.ru/landing/sale/').success(function(data) {
            data.sort(sort);
            for (var i=0;i<data.length; i+=1) {
                var currentFlat = data[i];
                if (currentFlat.suptype == 'city') {
                    $scope.params.push({
                        id: currentFlat.id,
                        city: true,
                        /*desc: (parseInt(currentFlat['nb_rooms'])+' - ком. кв., '+currentFlat.decoration+', '+currentFlat.floor+'-й этаж'),*/
                        rooms: (parseInt(currentFlat['nb_rooms']))? (parseInt(currentFlat['nb_rooms'])+' - ком. кв., ') : ' ',
                        decoration: currentFlat.decoration || '',
                        floor: (parseInt(currentFlat.floor))? ', '+(parseInt(currentFlat.floor) + '-й этаж') : '',
                        head: currentFlat.estate,
                        discount: parseFloat(currentFlat.discount),
                        square: parseFloat(currentFlat.area),
                        old_price: addSpaces(parseInt(currentFlat['old_price']/1)),
                        new_price: addSpaces(parseInt(currentFlat['new_price']/1)),
                        img: currentFlat.photo,
                        link: currentFlat.link
                    });
                }
                else if (currentFlat.suptype == 'country') {
                    $scope.params.push({
                        id: currentFlat.id,
                        country: true,
                        desc: currentFlat.direction + ', ' + currentFlat.distance+' км от МКАД',
                        head: currentFlat.estate,
                        discount: parseFloat(currentFlat.discount),
                        square: parseFloat(currentFlat['land_area'])+' сот.' || '',
                        housearea: (parseFloat(currentFlat['house_area']))? ', '+currentFlat['house_area']+' м²': ' ',
                        old_price: addSpaces(parseInt(currentFlat['old_price'])),
                        new_price: addSpaces(parseInt(currentFlat['new_price'])),
                        img: currentFlat.photo,
                        link: currentFlat.link
                    });
                }
                else if (currentFlat.suptype == 'commerce') {
                    $scope.params.push({
                        id: currentFlat.id,
                        commerce: true,
                        desc: currentFlat.metro+ ', ' + currentFlat.distance,
                        head: currentFlat.address || currentFlat.name,
                        discount: parseFloat(currentFlat.discount),
                        square: parseFloat(currentFlat.area),
                        old_price: addSpaces(parseInt(currentFlat['old_price']/1)),
                        new_price: addSpaces(parseInt(currentFlat['new_price']/1)),
                        img: currentFlat.photo,
                        link: currentFlat.link
                    });
                }
                $scope.filter = function(items, attr) {
                    var result = {};
                    angular.forEach(items, function(value, key) {
                        if (value[attr]) {
                            result[key] = value;
                        }
                    });
                    return result;
                };
                $scope.test = function(current) {
                    var center = 0,
                        blocks = document.querySelectorAll('.b-discount_inner'),
                        forms = document.querySelectorAll('.b-form');

                    if (parseInt(blocks[current].children.length/2)%2) {
                        center = parseInt(blocks[current].children.length / 2) + 1;
                    }
                    else {
                        center = parseInt(blocks[current].children.length/2);
                    }
                    blocks[current].children[center-1].insertAfter(forms[current]);
                }
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
    Element.prototype.insertAfter = function(elem) {
        return this.parentNode.insertBefore(elem, this.nextSibling);
    };
})();