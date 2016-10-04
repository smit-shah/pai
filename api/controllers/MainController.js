/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	/**
	* `MainController.index()`
	*/
	index: function (req, res) {
		var user = req.session.user;
		if (user === undefined)
			res.redirect('/login');
		else
			res.redirect('/dashboard');
	}
};

