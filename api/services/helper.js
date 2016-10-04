module.exports = {

	usersAdded: function(count, users, cb) {
		var done = false;
		var counting = 0;
		for (var u in users)
			counting += users[u].length;
		if (counting == count)
			done = true;
		cb(done);
	}

}