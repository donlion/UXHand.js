this.cycle = function() {
	console.info("cycle");

	try {
		this._calc();
	} catch(e) {
		console.log("No touches to calculate");
	} finally {
		var _data = this._data;

		this._domClasses(_data);

		this._synchronize();


		if (UXHand.HeatMap) {
			var data = this._last;

			if (data.start && data.start.pageX != 0 && data.start.pageY != 0) {
				this.tracking.push({
					x: data.start.pageX,
					y: data.start.pageY,
					pageX: data.start.pageX,
					pageY: (data.start.pageY-window.pageYOffset),
					count: 5
				});
			}

			if (data.end && data.end[0].clientY != 0 && data.end[0].clientX != 0) {
				this.tracking.push({
					x: data.end[0].clientX,
					y: data.end[0].clientY,
					pageX: data.end[0].pageX,
					pageY: (data.end[0].pageY-window.pageYOffset),
					count: 5
				});
			}

			if (data.drag.length != 0) {
				[].forEach.call(data.drag, function(drag, index) {
					// console.log(drag.x, drag.y);
					UXHand.tracking.push({
						x: drag.x,
						y: drag.y,
						pageX: drag.pageX,
						pageY: (drag.pageY-window.pageYOffset),
						count: 5 
					});
				});
			}

		}



		this._last.move = false;
		this._last.drag = [];
	}

};