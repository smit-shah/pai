/**
* Capability.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = function initialize(sails) {


		sails.on('hook:orm:loaded', function() {

			//Add all custom queries here
			if (false && sails.config.environment == 'development') {
				Role.findOne({ title: 'Admin' }).exec(function(a_err, role){
					if (role === undefined || role.length < 1) {
						Role.create({ title: 'Admin', desc: 'Admin user for CMS' }).exec(function(admin_error, admin_role){

							User.create({ email: 'smit@gmail.com', password: 'smit', first_name: 'Smit', last_name: 'Shah', role: admin_role.id }).exec(function(){
								console.log('Admin created!');
							});

							admin_error ? console.log(admin_error) : console.log('Admin role created!');
							var allAdminCapabilities = [
										'create_user', 'delete_user', 'edit_user', 'view_users', 
										'create_page', 'delete_page', 'edit_page', 'view_pages',
										'create_post', 'delete_post', 'edit_post', 'view_posts',
										'create_categories', 'delete_categories', 'edit_categories', 'view_categories',
										'create_tag', 'delete_tag', 'edit_tag', 'view_tag',
									];
							var id = 1;
							var tmp = '';
							for(var c in allAdminCapabilities) {
								tmp = allAdminCapabilities[c];

								(function(tmp){
									console.log('going to create '+tmp);
									Capability.find({ title: tmp }).exec(function(c_error, capability){
										if (capability === undefined || capability.length < 1) {
											create_capability(tmp, Capability, admin_role);
											console.log('created '+tmp);
											//id++;
										}
									});
								}(tmp));

							}
						})
					}
				});

				Role.findOne({ title: 'User' }).exec(function(err, role){
					if (role === undefined || role.length < 1) {
						Role.create({ title: 'User', desc: 'Users for CMS', id: 2 }).exec(function(user_error, record){
							user_error ? console.log(user_error) : console.log('User role created!');
						})
					}
				});

			}

		});
		console.log('returning');
		return {};
		

}

function create_capability(capability_name, Capability, role) {
	Capability.create({ title: capability_name }).exec(function(capability_error, create_capability){
		capability_error ? console.log(capability_error) : console.log(capability_name+' capability created');
		role.capabilities.add(create_capability.id);
		role.save(function(){});
		console.log(capability_name + ' capability binded to ' + role.title);
	});
}