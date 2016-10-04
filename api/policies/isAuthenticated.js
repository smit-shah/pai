module.exports = function(req, res, next) {
  var url = req.url;
   if (req.session.user) {
      switch (url) {
          case '/admin/pages':
              req.page = 'active';
              req.allPage = 'active';
              break;
          case '/admin/pages/new':
              req.page = 'active';
              req.newPage = 'active';
              break;
          case '/admin/media':
              req.media = 'active';
              req.allMedia = 'active';
              break;
          case '/admin/media/new':
              req.media = 'active';
              req.newMedia = 'active';
              break;
          case '/admin/users':
              req.users = 'active';
              req.allUsers = 'active';
              break;
          case '/admin/users/new':
              req.users = 'active';
              req.newUser = 'active';
              break;
      }
      return next();
    }
    else{
        return res.redirect('/login?redirect_to='+url);
    }
};