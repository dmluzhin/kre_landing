/**
 * Created by d.m.luzhin on 12.07.2016.
 */
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
					img: currentFlat[6].split('|')
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

		$scope.flatsReady = function() {
			$('.j-flats-row:odd').addClass('m-flats__row_odd');
		};

		$http.get('/sliders.contact.json').success(function(data) {
			$scope.hugeSliderData = data;
		});

		$scope.hugeSliderReady = function () {
			setTimeout(function() {
				$('.j-huge-slider').slick({
					slidesToShow: 1,
					speed: 150
				});
			}, 1);
		};

		$scope.showFlatPopup = function(index) {
			$scope.flatInPopup = $scope.params[index];

			if($scope.flatInPopup.img[0] != "-") {
				$('.j-popup-flat').arcticmodal();
			}
		};

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