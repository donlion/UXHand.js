this.session = function() {

	var self = UXHand._session;


	var add = function(hand) {
		console.log('session.add');
		if (self.hand == hand) {
			self.count++;
		} else {
			self.hand = hand;
			self.count = 1;
		}

		sync();

	};



	var sync = function() {
		if (self.count != 3) {
			return;
		}

		var html = document.querySelector('html'),
				htmlClass = html.className;

		var newClass = htmlClass.replace(' templeft', '').replace(' tempright', '');
		newClass += ' temp'+self.hand;

		html.className = newClass.trim();
	};




	return {
		'data': {
			hand: self.hand,
			count: self.count,
			threshold: self.threshold
		},
		add: add,
		sync: sync
	};

};