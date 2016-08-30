this.fireEvent = function(type) {
	
	var e;

	var eventName = 'UXHand.'+type;


	if (document.createEvent) {
		e = document.createEvent('Event');
		e.initEvent(eventName, true, false);
	} else {
		e = document.createEventObject();
		e.eventType = eventName;
	}

	e.eventName = eventName;

	if (document.createElement) {
		document.dispatchEvent(e);
	} else {
		e.fireEvent('on'+eventName, e);
	}


};