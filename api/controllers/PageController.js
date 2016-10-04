/**
 * PageController
 *
 * @description :: Server-side logic for managing pages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var fs = require('fs');

module.exports = {
	
	all: function(req, res) {
		Page.find().exec(function(err, allPages){
			var user = req.session.user;
			console.log(allPages);
			for(var i=0; i<allPages.length; i++) {
				allPages[i] = allPages[i].toJSON();
			}
			res.view({ user: user, pages: allPages, layout: 'admin' });
		});
	},

	new: function(req, res) {
		var allPages = Page.findAll();
		var user = req.session.user;

		res.view({ user: user, pages: allPages, layout: 'admin' });
	},

	create: function(req, res) {
		var newPageData = {
				title: req.param('title'),
				slug: req.param('slug'),
				desc: req.param('description'),
				status: req.param('status')
			},
			path = sails.config.appPath + '/assets/images/pages/';

		newPageData.slug = (newPageData.slug != '') ? newPageData.slug.replace(/[^a-zA-Z0-9 ]/g, "").replace(" ", "-") : newPageData.title.replace(/[^a-zA-Z0-9 ]/g, "").replace(" ", "-");

		req.file('featured').upload({ dirname: path }, function (err, uploadedFile) {
			if (err) {
				console.log(err);
				exit;
			}
			if (uploadedFile.length > 0) {
	            var uploadedFile = uploadedFile[0],
	            	name = uploadedFile.filename,
	            	ext = name.split('.')[1],
	            	final_name = page_id + '.' + ext;

	            Page.create(newPageData).exec(function(err, createdPage){
	            	var image = path + '/' + createdPage.id + '/' + final_name;
	            	fs.rename(uploadedFile.fd, image, function(){
	            		Page.update({ id: createdPage.id }, { image: image }).exec(function(e, updatedPage){
		            		req.flash('success', 'Page has been created!');
							return res.redirect('/admin/pages/' + new_post.id + '/edit');
						});
	            	});
	            });
	        }
	        else {
	        	Page.create(newPageData).exec(function(err, new_post){
					if (err) {
						console.log(err);
						exit;
					}
					else {
						req.flash('success', 'Page has been created!');
						return res.redirect('/admin/pages/' + new_post.id + '/edit');
					}
				});
	        }
        });
	},

	edit: function(req, res) {
		var page_id = req.param('id');
		var user = req.session.user;
		var page = Page.findOne({ id: page_id }).exec(function(err, page){
			res.view({ page: page.toJSON(), user: user, layout: 'admin' });
		});
	},

	update: function(req, res) {
		var page_id = req.param('id');
		var user = req.session.user;
		var path = sails.config.appPath + '/assets/images/pages/' + page_id;
		var slug = req.param('slug');
		//slug = slug.replace(/[^a-zA-Z0-9 ]/g, "").replace(" ", "-");

		req.file('featured').upload({ dirname: path }, function (err, uploadedFile) {
			if (err) {
				console.log(err);
				exit;
			}
			if (uploadedFile.length > 0) {
	            var uploadedFile = uploadedFile[0];
	            var name = uploadedFile.filename;
	            var ext = name.split('.')[1];
	            var final_name = page_id + '.' + ext;
	            fs.rename(uploadedFile.fd, path + '/' + final_name, function(){
	            	Page.update({ id: page_id }, { description: req.param('description') }).exec(function(err, updatedPage){
	            		return res.view({ page: updatedPage, user: user, layout: 'admin'});
	            	});
	            	/*page.save(function(er){
	                    if (!er)
	                        return res.json({ data: ret, status: 'Success', message: 'User data upated successfully.' });
	                });*/
	            });
	        }
	        else {
	        	Page.update({ id: page_id }, { description: req.param('description') }).exec(function(err, updatedPage){
	        		if (err) {
	        			console.log(err);
	        			exit;
	        		}
	        		console.log(updatedPage);
            		return res.redirect('/admin/pages/'+page_id+'/edit');
            	});
	        }
        });
	},

	/**
	*
	* Front end page view
	*/
	view: function(req, res) {
		var page_name = req.param('name'),
			user = req.session.user;
		Page.findOne({ slug: page_name }).exec(function(err, page){
			return (page !== undefined) ? res.view({ page: page, user: user, layout: 'layout'}) : res.notFound();
		});
	},

	checkSlug: function(req, res) {
		var page_id = req.param('page_id') ? req.param('page_id') : '',
			slug = req.param('slug'),
			cond = { slug: slug };

		if (page_id != '')
			cond.id = { '!': page_id };

		slug = slug.replace(/[^a-zA-Z0-9 ]/g, "").replace(" ", "-");

		Page.findOne(cond).exec(function(err, page){
			return (page !== undefined) ? res.json({ status: 'Fail', slug: '' }) : res.json({ status: 'Success', slug: slug });
		});
	}

};

