this.updateClass = function(value) {


	if (UXHand._data.current == value) {
		return;
	} else {
		UXHand._data.current = value;

		UXHand.fireListeners('UXHand.'+value);
	}

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