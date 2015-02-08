this.touchStart = function(e) {

	var dataObj = e.originalEvent;

	if (!dataObj) {
		dataObj = e;
	}

	this.DOM.textField.prepend(e.type+": "+dataObj.changedTouches[0].clientX+"<br />");
	

	this.touch.start = dataObj;

	console.log("TOUCH START", e);

};