this.fireListeners = function(type) {

	this.fireEvent(type);

	if (UXHand._listeners.length > 0) {
		[].forEach.call(UXHand._listeners, function(listener, index) {

			var listenerKeySplit = listener.event.split('.');
			var listenerKey = listenerKeySplit.length > 2 ? listenerKeySplit.splice(0, listenerKeySplit.length-1).join(".") : listenerKeySplit.join(".");


			if (listenerKey == type.toLowerCase()) {
				try {
					listener.callback();
				} catch(e) {
					console.log("Couldn't fire listener callback on "+listener.event);
				}
			}
		});
	}

};