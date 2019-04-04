/* jshint strict: global, esversion: 6, devel: true, node: true */
'use strict';

var express = require('express');
const router = express.Router();
const game = require('../game/index');

router.post("/game/new", game.new);
router.post("/game/move", game.move);
router.post("/game/status", game.status);

module.exports = router;
