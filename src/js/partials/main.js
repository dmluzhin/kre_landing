(function() {
    'use strict';

    var mobileMode = $(document).width() > 640 ? 0 : 1;

    var app = angular.module('main', []);

    app.controller('mainController', ['$scope', '$http', '$filter', function ($scope, $http, $filter) {

        $http.get('/sliders.json').
        success(function (data, status, headers, config) {
            $scope.mskData = data['msk'];
            $scope.areaData = data['area'];
        });

        $scope.currentRegion = currentRegion;

        $scope.changeRegion = function (targetId) {
            if (targetId) {
                if (targetId != $scope.currentRegion) {
                    $('.j-switcher-slider').prop('checked') ? $('.j-switcher-slider').prop('checked', false) : $('.j-switcher-slider').prop('checked', true);
                    $scope.currentRegion = $scope.currentRegion == 'msk' ? 'area' : 'msk';
                }
            } else {
                $scope.currentRegion = $scope.currentRegion == 'msk' ? 'area' : 'msk';
            }
        };

        $scope.mskSliderReady = function () {
            setTimeout(function(){
                $('.j-slider-msk').slick({
                    centerMode: true,
                    variableWidth: true,
                    speed: 400,
                    responsive: [
                        {
                            breakpoint: 640,
                            slideToShow: 1,
                            centerMode: false,
                            variableWidth: false
                        }
                    ]
                });
            }, 1);
        };

        $scope.areaSliderReady = function () {
            setTimeout(function(){
                $('.j-slider-area').slick({
                    centerMode: true,
                    variableWidth: true,
                    speed: 400,
                    responsive: [
                        {
                            breakpoint: 640,
                            slideToShow: 1,
                            centerMode: false,
                            variableWidth: false
                        }
                    ]
                });
            }, 1);
        };

        $http.get('/brokers.json').
        success(function(data, status, headers, config) {
            $scope.brokers = data;
        });

        $scope.currentBrokers = currentRegion;
        $scope.callbackFormData = {};

        $scope.changeBrokers = function (targetId) {
            if (targetId) {
                if (targetId != $scope.currentBrokers) {
                    $('.j-switcher-brokers').prop('checked') ? $('.j-switcher-brokers').prop('checked', false) : $('.j-switcher-brokers').prop('checked', true);
                    $scope.currentBrokers = $scope.currentBrokers == 'msk' ? 'area' : 'msk';
                }
            } else {
                $scope.currentBrokers = $scope.currentBrokers == 'msk' ? 'area' : 'msk';
            }
            $('.j-brokers').hide().fadeIn(500);
            if (!mobileMode) setTimeout(function() {$scope.mapsInit();}, 500);
        };

        $scope.showBrokerPopup = function(brokerId) {
            $scope.brokerInPopup = $scope.brokers[brokerId];
            if ($scope.isBrokersFormSended) $scope.isBrokersFormSended = false;
            $('.j-popup-broker').arcticmodal();
        };

        $scope.showCallbackPopup = function() {
            if ($scope.isCallbackFormSended) $scope.isCallbackFormSended = false;
            $('.j-popup-callback').arcticmodal();
        };

        $scope.isCallbackFormSended = false;

        $scope.sendCallbackForm = function() {
            if ($scope.callbackForm.$valid) {
                $scope.callbackFormData['subject'] = 'Заказать обратный звонок ЖК Легенда Цветного';
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $.param($scope.callbackFormData),
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

        $scope.isBrokersFormSended = false;
        $scope.brokersFormData = {};

        $scope.sendBrokersForm = function() {
            if ($scope.brokersForm.$valid) {
                $scope.brokersFormData.regions = '';
                $scope.forEachIndex = 1;
                angular.forEach($scope.brokerInPopup.regions, function(value, key) {
                        $scope.brokersFormData.regions += $scope.forEachIndex == $scope.brokerInPopup.regions.length ? value.name + '.' : value.name + ', ';
                        $scope.forEachIndex++;
                });
                $scope.brokersFormData.email = $scope.brokerInPopup.email;
                $scope.brokersFormData['subject'] = 'Запрос для ' + $scope.brokerInPopup.name + '. ' + $scope.brokersFormData.regions;
                $http({
                    method: 'POST',
                    url: '/sendmail.php',
                    data: $.param($scope.brokersFormData),
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function(data) {
                    $scope.brokersForm.$setPristine();
                    $scope.isBrokersFormSended = true;
                    setTimeout(function() {
                        $('.j-popup-broker').arcticmodal('close');
                    }, 3000);
                    for (var prop in $scope.brokersFormData) {
                        $scope.brokersFormData[prop] = '';
                    }
                });
            }
        };

        if (!mobileMode) {
            $('.j-msk-map')[0].addEventListener('load', function() {
                $scope.mapsInit();
            }, true);

            $scope.mapsInit = function() {
                $scope.$maps = {
                    mskDOM: $('.j-msk-map')[0].contentDocument,
                    areaDOM: $('.j-area-map')[0].contentDocument
                };

                $($scope.$maps.mskDOM.getElementsByTagName('g')).mouseover(function() {
                    this.style.opacity = .55;
                    $('.' + this.getAttribute('class')).addClass('m-broker_selected');
                }).mouseleave(function() {
                    this.style.opacity = .3;
                    $('.m-broker_selected').removeClass('m-broker_selected');
                });

                $($scope.$maps.areaDOM.getElementsByTagName('g')).mouseover(function() {
                    this.style.opacity = .55;
                    $('.' + this.getAttribute('class')).addClass('m-broker_selected');
                }).mouseleave(function() {
                    this.style.opacity = .3;
                    $('.m-broker_selected').removeClass('m-broker_selected');
                });

            };
        }

        $scope.brokersReady = function() {
            $('.j-broker').on('mouseover', function() {
                $(this).addClass('m-broker_selected');
                 var els = $scope.$maps.mskDOM.getElementsByClassName($(this).data('broker'));
                 if (!els.length) var els = $scope.$maps.areaDOM.getElementsByClassName($(this).data('broker'));
                 for (var i = 0; i < els.length; i++) els[i].style.opacity = .55;
            }).on('mouseleave', function() {
                $('.m-broker_selected').removeClass('m-broker_selected');
                 var els = $scope.$maps.mskDOM.getElementsByClassName($(this).data('broker'));
                 if (!els.length) var els = $scope.$maps.areaDOM.getElementsByClassName($(this).data('broker'));
                 for (var i = 0; i < els.length; i++) els[i].style.opacity = .3;
            });
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

    app.filter('getById', function() {
        return function(input, id) {
            var i=0, len=input.length;
            for (; i<len; i++) {
                if (+input[i].id == +id) {
                    return input[i];
                }
            }
            return null;
        }
    });

})();