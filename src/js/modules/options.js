this.options = function() {

	var userOptions = window.UXHandOptions;


	var output = {
		certainty: 0.2,
		cycleDelay: 20000,
		destroyClasses: true,
		destroyData: true,
		root: document.body,
		threshold: 50
	};


	if (userOptions) {
		try {
			for (var key in userOptions) {
				output[key] = userOptions[key];
			}
		} catch(e) {
			console.info("Are your options an array..?");
			console.error(e);
		}
	}

	return output;

};