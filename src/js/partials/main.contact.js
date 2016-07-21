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
        function sort(obj1, obj2) {
            return obj2.discount - obj1.discount;
        }
        $http.get('/all.json').success(function(data) {
            data.sort(sort);
            for (var i=0;i<data.length; i+=1) {
                var currentFlat = data[i];
                if (currentFlat.suptype == 'city') {
                    $scope.params.push({
                        city: true,
                        desc: parseInt(currentFlat['nb_rooms'])+' - ком кв, '+currentFlat.decoration+', '+currentFlat.floor+'-й этаж',
                        head: currentFlat.estate,
                        discount: parseFloat(currentFlat.discount),
                        square: parseFloat(currentFlat.area),
                        old_price: addSpaces(parseInt(currentFlat['old_price']/100)),
                        new_price: addSpaces(parseInt(currentFlat['new_price']/100)),
                        img: currentFlat.photo
                    });
                }
                else if (currentFlat.suptype == 'country') {
                    $scope.params.push({
                        country: true,
                        desc: currentFlat.direction+currentFlat.distance+' км. от МКАД',
                        head: currentFlat.estate,
                        discount: parseFloat(currentFlat.discount),
                        square: parseFloat(currentFlat['land_area'])+' сот., '+parseFloat(currentFlat['house_area']),
                        old_price: addSpaces(parseInt(currentFlat['old_price']/100)),
                        new_price: addSpaces(parseInt(currentFlat['new_price']/100)),
                        img: currentFlat.photo
                    });
                }
                else if (currentFlat.suptype == 'commerce') {
                    $scope.params.push({
                        commerce: true,
                        desc: currentFlat.district+' м. '+currentFlat.metro+currentFlat.distance,
                        head: currentFlat.address,
                        discount: parseFloat(currentFlat.discount),
                        square: parseFloat(currentFlat.area),
                        old_price: addSpaces(parseInt(currentFlat['old_price']/100)),
                        new_price: addSpaces(parseInt(currentFlat['new_price']/100)),
                        img: currentFlat.photo
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
                $scope.test = function() {
                    var center = 0, block = document.querySelector('.b-discount_inner'), form = document.querySelector('.b-form');
                    if (parseInt(block.children.length/2)%2) center = parseInt(block.children.length/2)+1;
                    else center = parseInt(block.children.length/2);
                    block.children[center-1].insertAfter(form.cloneNode(true));
                    form.parentNode.removeChild(form);
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