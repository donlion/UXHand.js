this.touchEnd = function(e) {

	var dataObj = e.originalEvent;

	if (!dataObj) {
		console.log("!dataObj");
		dataObj = e;
	}

	_this.touch.end = dataObj.changedTouches;


	console.log("TOUCHEND", _this.touch.end);


	if (this.touch.start) {
		this.processor.init();
	}

};