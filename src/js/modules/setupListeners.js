this._setupListeners = function(root) {

	document.body.addEventListener('touchstart', function(e) {
		UXHand._events.touchstart(e);
	});

	document.body.addEventListener('touchend', function(e) {
		UXHand._events.touchend(e);
	});

	document.body.addEventListener('touchmove', function(e) {
		UXHand._events.touchmove(e);
	});

};