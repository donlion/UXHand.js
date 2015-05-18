this._setupListeners = function() {

	var rootElement = document.body;
	//rootElement = document.querySelector("iframe").contentDocument.body;

	rootElement.addEventListener('touchstart', function(e) {
		UXHand._events.touchstart(e);
	});

	rootElement.addEventListener('touchend', function(e) {
		UXHand._events.touchend(e);
	});

	rootElement.addEventListener('touchmove', function(e) {
		UXHand._events.touchmove(e);
	});

};