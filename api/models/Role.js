/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		title: { type: 'string', required: true, unique: true },
		desc:  { type: 'string' },

		/*
			Role.finddOne(1).exec(funtion(err, role){
				role.capabilites.add(1); //This will add capabilty_id = 2 for role_id = 1
				role.capabilites.add([1,2,3,4]); //This way we can also add multiple capabilities
				role.capabilites.remove(1); //Remove any capability from role
				role.save(function(){});
			});
		*/

		//Role.findOne(1).populate('capabilities').exec( console.log );
		capabilities: {
	    	collection: 'capability',
	    	via: 'can',
	    	dominant: true
	    }
	},

	beforeDestroy: function(criteria, cb) {
		var total = 0;
		var count = 0;
		Role.find(criteria).populate('capabilities').exec(function(err, roles){
			if (err) return cb(err);
			total = roles.length;
			console.log('total: '+total);
			roles.forEach(function(role){
				Capability.destroy({ id: _.pluck(role.capabilities, 'id') }, function(er){
					console.log('DELETED');
					count++;
					_isCompleted(total, count, function(done){
						if (done)
							cb();
					})
				});
			});
		});
	},
};

function _isCompleted(total, count, cb) {
	console.log('total: '+total+ ' & count: '+count);
	count == total ? cb(true) : cb(false);
}