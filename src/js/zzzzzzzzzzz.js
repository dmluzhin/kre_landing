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