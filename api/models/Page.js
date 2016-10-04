/**
* Page.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		title: { type: 'string' },
		description: { type: 'text' },
		slug: { type: 'text' },
		status : { type: 'string', defaultsTo: 'draft' }, //draft, publish, trash
		image: { type: 'string' }
	},
	
	toJSON: function() {
	    var obj = this.toObject();
	    obj.createdAt = 'sa';
	    return obj;
	},
};

