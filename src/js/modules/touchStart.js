this.touchStart = function(e) {

	var dataObj = e.originalEvent;

	this.DOM.textField.prepend(e.type+": "+dataObj.changedTouches[0].clientX+"<br />");
	

	this.touch.start = dataObj;

};