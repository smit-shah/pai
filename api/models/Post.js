/**
* Post.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

	attributes: {
		title: { type: 'string' },
		description: { type: 'text' },

		//Post.find(1).populate('meta').exec(console.log)
        meta: {
        	collection: 'postmeta',
        	via: 'post'
        }
	}
};

