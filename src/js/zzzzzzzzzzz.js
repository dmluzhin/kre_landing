/**
 * Created by luzhin.dm on 15.11.2016.
 */
$http.get('http://www.kre.ru/landing/sale/',{cache: true}).success(function(data) {
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
				desc: currentFlat.direction + ', ' + currentFlat.distance+' км от ћ јƒ',
				head: currentFlat.estate,
				discount: parseFloat(currentFlat.discount),
				square: (parseFloat(currentFlat['land_area']))? +currentFlat['land_area']+' сот., ': '',
				housearea: (parseFloat(currentFlat['house_area']))? ''+currentFlat['house_area']+' м?': '',
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
		$scope.AbsentEmployees.employees = data;
		abEmployees.dataLoaded = true;

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











if($scope.currentTab == 2) {
	$http.get('city.json').success(function(data) {
		console.log('get');
		data.sort(sort);
		for(var i = 0; i < data.length; i += 1) {
			var currentFlat = data[i];
			if (currentFlat.suptype == 'city') {
				$scope.params.push({
					id: currentFlat.id,
					city: true,
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

			$scope.AbsentEmployees.employees = data;
			abEmployees.dataLoaded = true;

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
} else if ($scope.currentTab == 3) {
	$http.get('country.json').success(function(data) {
		data.sort(sort);
		for(var i = 0; i < data.length; i += 1) {
			var currentFlat = data[i];
			if (currentFlat.suptype == 'country') {
				$scope.params.push({
					id: currentFlat.id,
					country: true,
					desc: currentFlat.direction + ', ' + currentFlat.distance+' км от ћ јƒ',
					head: currentFlat.estate,
					discount: parseFloat(currentFlat.discount),
					square: (parseFloat(currentFlat['land_area']))? +currentFlat['land_area']+' сот., ': '',
					housearea: (parseFloat(currentFlat['house_area']))? ''+currentFlat['house_area']+' м?': '',
					old_price: addSpaces(parseInt(currentFlat['old_price'])),
					new_price: addSpaces(parseInt(currentFlat['new_price'])),
					img: currentFlat.photo,
					link: currentFlat.link
				});
			}
			$scope.AbsentEmployees.employees = data;
			abEmployees.dataLoaded = true;

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
}