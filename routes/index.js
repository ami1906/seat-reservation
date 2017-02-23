var express = require('express');
var router = express.Router();
var seatReserve = require('./../home/reserve.js');
var render = require('mithril-node-render');

/* GET home page. */
router.get('/', function(req, res, next) {
  var renderData = {};
  renderData.title = 'Simple Seat Reservation App'
  renderData.bodyContent = render(m.component(seatReserve));;
  renderData.css = ['/stylesheets/reserve_home.min.css'];
  renderData.js = ['/javascripts/reserve_home.min.js'];
  res.render('index', renderData);
});

module.exports = router;
