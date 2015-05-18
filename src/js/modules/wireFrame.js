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

	this.render = function() {
		console.log(this.errorGap());

		var area = this.areas();

		var rendering = [
			"<div ",
			"style='",
			"position:fixed;",
			"top:0;",
			"bottom:0;",
			"left:",
			area.w,
			"px;",
			"width:",
			area.x,
			"px;",
			"background-color:rgba(0,0,0,0.2);",
			"display:inline-block;",
			"' />"
		]; //ErrorGap

		//$("body").prepend(rendering.join(""));
		document.body.innerHTML += rendering.join("");



		rendering = [
			"<div class='lefthand'",
			"style='",
			"position:fixed;",
			"bottom:0;",
			"left:0;",
			"width:",
			area.w,
			"px;",
			"height:",
			(screen.height*0.575),
			"px;",
			"background-color:#3F51B5;opacity:.3;",
			"' />"
			]; //LeftHandArea

		//$("body").prepend(rendering.join(""));
		document.body.innerHTML += rendering.join("");

		rendering = [
			"<div class='righthand'",
			"style='",
			"position:fixed;",
			"bottom:0;",
			"right:0;",
			"width:",
			area.w,
			"px;",
			"height:",
			(screen.height*0.575),
			"px;",
			"background-color:#3F51B5;opacity:.3;",
			"' />"
			]; //LeftHandArea
		//$("body").prepend(rendering.join(""));
		document.body.innerHTML += rendering.join("");
	};



};