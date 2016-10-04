/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {

	attributes: {
		first_name: { type: 'string', minLength: 2, maxLength: 10 },
		last_name: 	{ type: 'string', minLength: 2, maxLength: 10 },
		email: 		{ type: 'email',  required: true, unique: true },
        password: 	{ type: 'string', minLength: 4, maxLength: 10, required: true },
        role    :   { model: 'role' },
        status:     { type: 'string', defaultsTo: 'active' },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
        },

        //User.find(1).populate('meta').exec(console.log)
        meta: {
        	collection: 'usermeta',
        	via: 'user'
        },

        //User.find(1).populate('media').exec(console.log)
        media: {
        	collection: 'media',
        	via: 'owner'
        },

        //User.find(1).populate('role').exec(console.log)
        

        /*
        User.findOne(1).exec(function(e, u){
            u.capabilities(function(err, caps){
                console.log(caps);
            });
        });
        */
        capabilities: function(cb) {
            var user_capabilities = [];
            var is_returned = false;
            Role.findOne(this.role).populate('capabilities').exec(function(err, data){
                console.log(data.capabilities);
                console.log(data.capabilities.length);
                if (data.capabilities && data.capabilities.length > 0) {
                    for (var can in data.capabilities)
                        if (data.capabilities[can].title)
                            user_capabilities.push(data.capabilities[can].title);
                    is_returned = true;
                    cb(err, user_capabilities);
                }
                
            });
            if (!is_returned)
                cb(err, user_capabilities);
        },
	},

	beforeCreate: function(user, cb) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                    cb(err);
                } else {
                    user.password = hash;
                    cb();
                }
            });
        });
    }
};

