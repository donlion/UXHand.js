this.touchEnd = function(e) {

	var dataObj = e.originalEvent;

	this.touch.end = dataObj;


	if (this.touch.start) {
		this.processor.init();
	}

};