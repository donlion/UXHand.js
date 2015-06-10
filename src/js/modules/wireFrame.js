this.wireFrame = new function() {

	this.areas = function() {
		var gap = UXHand.options().certainty,
				x = screen.width*gap,
				w = (screen.width/2)-(x/2);

		return {
			gap: gap,
			x: x,
			w: w
		};
	};

	this.errorGap = function() {

		var area = this.areas();

		return {
			x: [0, area.w+area.x]
		};

	};



};