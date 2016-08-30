this.destroy = function() {

	localStorage.removeItem("UXHandData");

	UXHand._last = {
		start: null,
		end: null,
		drag: [],
		moved: false
	};

	return true;

};