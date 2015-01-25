this.wireFrame = new function() {

	this.setup = function() {
		console.log("wireframe setup");

	};

	this.errorGap = function() {

		return {
			x: [$(window).width() * 0.425, $(window).width() * 0.575]
		};

	};

	this.render = function() {
		console.log(this);
		var rendering = [
			"<div ",
			"style='",
			"position:absolute;",
			"top:0;",
			"bottom:0;",
			"left:",
			this.errorGap().x[0],
			"px;",
			"width:",
			this.errorGap().x[1]-this.errorGap().x[0],
			"px;",
			"background-color:rgba(0,0,0,0.2);",
			"display:inline-block;",
			"' />"
		]; //ErrorGap

		$("body").prepend(rendering.join(""))


		rendering = [
			"<div class='lefthand'",
			"style='",
			"position:absolute;",
			"bottom:0;",
			"left:0;",
			"width:",
			$(window).width() * 0.425,
			"px;",
			"height:",
			$(window).height() * 0.575,
			"px;",
			"background-color:rgba(255,0,0,0.1);",
			"' />"
			]; //LeftHandArea
		$("body").prepend(rendering.join(""));
		rendering = [
			"<div class='righthand'",
			"style='",
			"position:absolute;",
			"bottom:0;",
			"right:0;",
			"width:",
			$(window).width() * 0.425,
			"px;",
			"height:",
			$(window).height() * 0.575,
			"px;",
			"background-color:rgba(255,0,0,0.1);",
			"' />"
			]; //LeftHandArea
		$("body").prepend(rendering.join(""));
	};




	this.areas = {

		left: function() {
			
		},

		right: function() {

		}

	};

};