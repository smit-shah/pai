/**
 * MediaController
 *
 * @description :: Server-side logic for managing media
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');

module.exports = {
	
    /**
    * `MediaController.all()`
    */
    all: function (req, res) {
        User.find(req.session.user_id).populate('media').exec(function(err, media){
            //console.log(media[0]);
            return res.view({ media: media[0].media, user: media[0], layout: 'admin' });
        });
    },


    /**
    * `MediaController.new()`
    */
    new: function (req, res) {
        var user = req.session.user;
        return res.view({ user: user, layout: 'admin' });
    },

    upload: function(req, res) {
        req.file('img').upload({ dirname: sails.config.appPath + '/assets/images' }, function (err, uploadedFile) {
            if (err) {
                console.log('ERROR');
                console.log(err);
            }
            var uploadedFile = uploadedFiles[0];
            var name = uploadedFile.filename;
            var ext = name.split('.')[1];
            var final_name = u.id + '.' + ext;
            fs.rename(uploadedFile.fd, path + '/' + final_name, function(){
                var stamp = new Date().getTime();
                ret.profile_image = req.baseUrl + '/images/avtar/' + final_name + '?' + stamp;

                var uploadLocation = process.cwd() +'/assets/images/avtar/' + final_name;
                var tempLocation = process.cwd() + '/.tmp/public/images/avtar/' + final_name;
                fs.createReadStream(uploadLocation).pipe(fs.createWriteStream(tempLocation));

                u.image = ret.profile_image + '?' + stamp;
                u.save(function(er){
                    if (!er)
                        return res.json({ data: ret, status: 'Success', message: 'User data upated successfully.' });
                });
            });
            return res.json({ status: 'uploaded', file: uploadedFile['UploadedFileMetadata'] });
        });
    }
};

