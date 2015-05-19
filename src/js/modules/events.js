this._events = {
	
	'touchstart': function(e) {
		var dataObj = e;
		console.log("TOUCHSTART", e);
		if (!dataObj) {
			dataObj = e;
		}

		UXHand._last.start = dataObj;

	},

	'touchend': function(e) {
		var dataObj = e;
		console.log("TOUCHEND", e);

		if (!dataObj) {
			console.log('!dataObj');
			dataObj = e;
		}

		UXHand._last.end = dataObj.changedTouches;

		UXHand.cycle();
	},

	'touchmove': function(e) {
		console.log(e.touches[0].clientX);
		UXHand._last.moved = true;

		if (UXHand._last.drag.indexOf(e) == -1) {
			console.log(e);
			UXHand._last.drag.push({
				"x": e.touches[0].clientY,
				"y": e.touches[0].clientX,
				"pageX": e.touches[0].pageX,
				"pageY": (e.touches[0].pageY-window.pageYOffset)
			});
		}
	}


};