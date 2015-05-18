this._events = {
	
	'touchstart': function(e) {
		var dataObj = e.originalEvent;
		if (!dataObj) {
			dataObj = e;
		}

		UXHand._last.start = dataObj;

		console.log('TOUCH START', e);
	},

	'touchend': function(e) {
		var dataObj = e.originalEvent;

		if (!dataObj) {
			console.log('!dataObj');
			dataObj = e;
		}

		UXHand._last.end = dataObj.changedTouches;


		console.log('TOUCH END', UXHand._last.end);

		UXHand.cycle();
	},

	'touchmove': function(e) {
		UXHand._last.moved = true;
		UXHand._last.drag.push(e);
	}


};