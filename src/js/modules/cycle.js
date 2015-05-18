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

			if (data.start) {
				this.tracking.push({
					x: data.start.pageX,
					y: data.start.pageY,
					count: 5
				});
			}

			if (data.end) {
				this.tracking.push({
					x: data.end[0].clientX,
					y: data.end[0].clientY,
					count: 5
				});
			}

			[].forEach.call(data.drag, function(drag, index) {
				if (drag.x == 0 && drag.y == 0) {
					return;
				}
				UXHand.tracking.push({
					x: drag.x,
					y: drag.y,
					count: 5 
				});
			});

		}



		this._last.move = false;
		this._last.drag = [];
	}

};