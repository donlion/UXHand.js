this.off = function(event) {

	[].forEach.call(UXHand._listeners, function(listener, index) {
		if (listener.event == event.toLowerCase()) {
			UXHand._listeners.splice(listener, 1);
		}
	});

};