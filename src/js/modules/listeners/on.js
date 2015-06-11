this.on = function(event, listenerFn) {
	UXHand._listeners.push({
		event: event.toLowerCase(),
		callback: listenerFn
	});
};