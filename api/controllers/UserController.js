/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var helper = require('../services/helper');

module.exports = {
	
	/**
	* `UserController.dashboard()`
	*/
	all: function (req, res) {
		var allUsers = [];
		var total = 0;
		User.find().populate('role').exec(function(err, users){
			total = users.length;
			for( var i = 0; i < total; i++ ) {
				if (allUsers[users[i].role.title] === undefined)
					allUsers[users[i].role.title] = [];
				allUsers[users[i].role.title].push(users[i].toJSON());
				helper.usersAdded(total, allUsers, function(done){
					if (done) {
						console.log(allUsers);
						res.view({ user: req.session.user, allUsers: allUsers, layout: 'admin' });
					}
				});
			}
		});
	},

	/**
	* `UserController.new()`
	*/
	dashboard: function (req, res) {
		res.view({ user: req.session.user, layout: 'admin' });
	},

	/**
	* `UserController.new()`
	*/
	new: function (req, res) {
		Role.find().exec(function(err, roles){
			res.view({ user: req.session.user, roles: roles, layout: 'admin' });
		});
	},

	/**
	* `UserController.edit()`
	*/
	edit: function (req, res) {
		res.view({ user: req.session.user, layout: 'admin' });
	},

	/**
	* `UserController.myProfile()`
	*/
	myProfile: function (req, res) {
		res.view({ user: req.session.user, layout: 'admin' });
	},
	
};

