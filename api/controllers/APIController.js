/**
 * APIController
 *
 * @description :: Server-side logic for managing APIS
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport'),
    bcrypt = require('bcryptjs'),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport('smtps://smit.shah%40openxcell.com:just*123@smtp.gmail.com');

module.exports = {
	
    newUser: function(req, res) {
        if (req.method == 'POST') {
            var userData = {
                    platform: req.param('platform'),
                    first_name: req.param('first_name'),
                    last_name: req.param('last_name'),
                    email: req.param('email'),
                    password: req.param('password'),
                    device_id: req.param('device_id'),
                    gender: req.param('gender'),
                    age: req.param('age'),
                    status: 'active'
                };
            
            if (userData.platform === undefined || userData.platform == '')
                return res.json({ status: 'Fail', message: 'Platform can not be blank!' });

            if (userData.first_name === undefined || userData.first_name == '')
                return res.json({ status: 'Fail', message: 'First Name can not be blank!' });

            if (userData.last_name === undefined || userData.last_name == '')
                return res.json({ status: 'Fail', message: 'Last Name can not be blank!' });

            if (userData.email === undefined || userData.email == '')
                return res.json({ status: 'Fail', message: 'Email can not be blank!' });

            if (userData.password === undefined || userData.password == '')
                return res.json({ status: 'Fail', message: 'Password can not be blank!' });

            if (userData.device_id === undefined || userData.device_id == '')
                return res.json({ status: 'Fail', message: 'Device Id can not be blank!' });

            User.create(userData).exec(function(err, user){
                if (err) {
                    var msg = '';

                    if (err.invalidAttributes.email)
                        msg = 'Email is already taken!';
                    
                    if (err.invalidAttributes.password) {
                        msg = (err.invalidAttributes.password[0].rule == 'minLength') ? 'Password must be of 4 characters' : 'Password can not be longer than 10 digits';
                    }

                    return res.json({ status: 'Fail', message: msg, err: err });
                }
                return res.json({ status: 'Success', message: 'User created successfully!', data: user });
            });

        }
        else
            return res.json({ status: 'Fail', message: 'You must have to use POST method' });
    },

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
	},

    forget: function(req, res) {
        var email = req.param('email');

        if (email === undefined || email == '')
            return res.json({ message: 'Email is blank', status: 'Fail' });
        else {
            User.findOne({ email: email }).exec(function(e, user){
                if (user === undefined)
                    return res.json({ message: 'No user found', status: 'Fail' });

                var mailOptions = {
                    from: '"Test"<test@gmail.com>', // sender address 
                    to: user.email, // list of receivers , seperated
                    subject: 'Reset Password Link ✔'
                };

                UserMeta.findOne({ user: user.id, usermeta_key: 'forget' }).exec(function(er, meta){
                    if (meta === undefined) { //User has not previously requested for forget password
                        bcrypt.genSalt(10, function(err, salt) {
                            bcrypt.hash(user.email, salt, function(err, hash) {
                                if (err) {
                                    return res.json({ message: err, status: 'Fail' });
                                } else {
                                    UserMeta.create({ user: user.id, usermeta_key: 'forget', usermeta_value: hash }).exec(function(err, new_meta){
                                        mailOptions.html = '<b>Hello</b> <div>Here is the link to reset password: <a href="'+req.baseUrl+'/reset/'+hash+'">Reset</a>'; // html body 
                                        transporter.sendMail(mailOptions, function(error, info){});
                                        return res.json({ status: 'Success', message: 'Password reset email sent!' });
                                    });
                                }
                            });
                        });
                    }
                    else { //There is already forget password request
                        mailOptions.html = '<b>Hello</b> <div>Here is the link to reset password: <a href="'+req.baseUrl+'/reset/'+hash+'">Reset</a>'; // html body 
                        transporter.sendMail(mailOptions, function(error, info){});
                        return res.json({ status: 'Success', message: 'Password reset email sent!' });
                    }
                });
            });
        }
    },

    about: function(req, res) {
        Static.findOne({ slug: 'about' }).exec(function(e, about){
            return about === undefined ? res.json({ status: 'Fail', message: 'No data found!' }) : res.json({ status: 'Success', data: about.content });
        });
    },

    terms: function(req, res) {
        Static.findOne({ slug: 'terms' }).exec(function(e, terms){
            return terms === undefined ? res.json({ status: 'Fail', message: 'No data found!' }) : res.json({ status: 'Success', data: terms.content });
        });
    },

    privacy: function(req, res) {
        Static.findOne({ slug: 'privacy' }).exec(function(e, privacy){
            return privacy === undefined ? res.json({ status: 'Fail', message: 'No data found!' }) : res.json({ status: 'Success', data: privacy.content });
        });
    }

};

