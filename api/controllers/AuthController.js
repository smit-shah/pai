/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passport = require('passport');
module.exports = {

    login: function(req, res) {
        var redirection = req.param('redirect_to');
        if (req.method == 'POST') {
            passport.authenticate('local', function(err, user, info) {
                if ((err) || (!user)) {
                    return res.send({
                        message: info.message,
                        user: user
                    });
                }
                req.logIn(user, function(err) {
                    if (err)
                        res.send(err);
                    
                    User.findOne(user.id).populate('role').exec(function(err, user){
                        req.session.user = user;
                        if (redirection && redirection != '' && redirection != 'undefined') {
                            console.log("redirection from AuthController: "+redirection);
                            res.redirect(redirection);
                        }
                        else
                            res.redirect('dashboard');
                    });
                });
            })(req, res);
        }
        else
            res.view('user/login', { redirect_to: redirection });
    },

    logout: function(req, res) {
        req.session.user = '';
        req.logout();
        res.redirect('/');
    }

};

