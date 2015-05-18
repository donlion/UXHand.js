this._domClasses = function(_data) {

	var update = function(value) {
		var classes = value.split(',');

		var html = document.querySelector('html'),
				htmlCurrent = html.className.indexOf(' ') > -1 ? html.className.split(' ') : [];

		var update = htmlCurrent;

		classes.forEach(function(name) {
			update.push(name);
		});

		console.log("update", update);
		html.className = update.join(' ');
	};

	var reset = function() {
		console.log('reset');
		var html = document.querySelector('html'),
				htmlCurrent = html.className.split(' ');
		
		var inHouseClasses = ['righthand', 'lefthand', 'bothhands'];

		inHouseClasses.forEach(function(inHouse) {
			htmlCurrent.splice(inHouse, 1);
		});

		html.className = htmlCurrent;

	};


	var count = _data.scores.left+_data.scores.right+_data.scores.both;

	if (document.getElementById('textfield')) {
		document.getElementById('textfield').innerHTML = count;
	}

	if (!_data || count < this.options().threshold) {
		return;
	}

	console.log("COUNT", count, this.options().threshold);

	console.log(_data.scores.left, _data.scores.right*(1+this.options().certainty));

	if (_data.scores.left > _data.scores.right*(1+this.options().certainty)) {
		reset();
		update('lefthand');
	} else if (_data.scores.right > _data.scores.left*(1+this.options().certainty)) {
		reset();
		update('righthand');
	}

	var average = (_data.scores.right+_data.scores.left)/2;

	if (_data.scores.both > average) {
		update('bothhands');
	}

};