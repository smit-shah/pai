/**
 * APIController
 *
 * @description :: Server-side logic for managing APIS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');

module.exports = {
	
	login: function(req, res) {
		if (req.method == 'POST') {
			var platform = req.param('platform'),
				email = req.param('email'),
				password = req.param('password'),
				device_id = req.param('device_id');

			if (email === undefined || email == '')
				return res.json({ message: 'Email is blank', status: 'Fail' });

			if (password === undefined || password == '')
				return res.json({ message: 'Password is blank', status: 'Fail' });

			if (platform === undefined || platform == '')
				return res.json({ message: 'Platform is blank', status: 'Fail' });

			if (device_id === undefined || device_id == '')
				return res.json({ message: 'Device token is blank', status: 'Fail' });

            passport.authenticate('local', function(err, user, info) {
                if ((err) || (!user))
                    return res.json({ message: info.message, status: 'Fail' });

                req.logIn(user, function(err) {
                    if (err)
                        return res.json({ message: err, status: 'Fail' });
                    else {
                    	User.findOne(user.id).populate('meta').exec(function(err, user){
                    		UserMeta.update({ user: user.id, usermeta_key: 'device_id' }, { usermeta_value: device_id }).exec(function(er, updated){
                    			user.meta = updated[0];
                    			return res.json({ message: 'User logged in successfully!', status: 'Success', data: user });
                    		});
                    	});
                    }
                         
                });
            })(req, res);
        }
        else
            return res.json({ status: 'Fail', message: 'You must have to use POST method' });
	}

};

