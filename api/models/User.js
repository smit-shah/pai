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
        gender:     { type: 'string', enum: ['male', 'female', 'other'] },
        age:        { type: 'integer' },
        device_id:  { type: 'string', required: true },
        status:  { type: 'string', defaultsTo: 'active' },

        toJSON: function() {
            var obj = this.toObject();
            delete obj.password;
            return obj;
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

