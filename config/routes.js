module.exports.routes = {


	'/': 'MainController.index',

	'get /signup': { view: 'signup' },
	'get /login': 'AuthController.login',
	'post /login': 'AuthController.login',
	'/logout': 'AuthController.logout',

	'get /dashboard': 'UserController.dashboard',
    'get /admin/users': 'UserController.all',
    'get /admin/users/new': 'UserController.new',
    'get /admin/users/:id/edit': 'UserController.edit',
    'get /admin/users/me': 'UserController.myProfile',
    /*'get /user/dashboard': { 
    	view: 'user/dashboard',
    	locals: { layout: 'admin' }
    },*/
    'get /admin/posts': 'PostController.all',
	
	//Pages
	'get /admin/pages': 'PageController.all',
	'get /admin/pages/new': 'PageController.new',
	'post /admin/pages/create': 'PageController.create',
	'get /admin/pages/:id/edit': 'PageController.edit',
    'post /admin/pages/:id/update': 'PageController.update',
    'post /admin/page/checkSlug': 'PageController.checkSlug',

    //Media
    'get /admin/media': 'MediaController.all',
    'get /admin/media/new': 'MediaController.new',
    'post /admin/media/upload': 'MediaController.upload',

    //For page
    'get /:name': 'PageController.view',

    //API
    'post /api/login': 'APIController.login',
    'post /api/forget': 'APIController.forget',
    'get /api/about': 'APIController.about',
    'get /api/terms': 'APIController.terms',
    'get /api/privacy': 'APIController.privacy',

};
