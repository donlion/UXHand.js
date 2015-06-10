this._domClasses = function(_data) {

	var update = function(value) {

		var classes = value.split(','),
				UXHandClasses = ['lefthand', 'righthand', 'bothhands'];

		var html = document.querySelector('html'),
				htmlClass = html.className;

		var outputClasses = function() {

			UXHandClasses.forEach(function(className) {

				if (value.indexOf(className) >= 0) {

					if (htmlClass.indexOf(className) == -1) {
						htmlClass += ' '+className;
					} 

				} else {
					htmlClass = htmlClass.replace(' '+className, '');
				}

			});

			return htmlClass;
		};

		html.className = outputClasses();
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
		update('lefthand');
	} else if (_data.scores.right > _data.scores.left*(1+this.options().certainty)) {
		update('righthand');
	}

	var average = (_data.scores.right+_data.scores.left)/2;

	if (_data.scores.both > average) {
		update('bothhands');
	}

};