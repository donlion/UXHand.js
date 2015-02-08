this.processor = new function() {

	this.type = "touch";


	this.init = function() {

		var touch = _this.touch;

		var output = "Processor initiated\n";

		if (touch.moved) {
			output += "... move detected";

			this.drag();
		} else {
			output += "... touch detected";

			this.tap();
		}

		$("body").append(output);

		this.end();
	};


	this.end = function() {
		_this.setTouch();
	};



	//= include processes/drag.js

	//= include processes/tap.js

};
