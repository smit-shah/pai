/**
 * IndexController
 *
 * @description :: Server-side logic for managing indices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  /**
   * `IndexController.main()`
   */
  main: function (req, res) {
  	sails.sockets.join(req.socket, 'sammy');
  	console.log(sails.sockets.subscribers('sammy'));
    return res.json({ data: 'yup!' });
  }
};

