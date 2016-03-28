'use strict';

const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(file => file !== 'index.js');
module.exports = files.map(file => require(path.join(__dirname, file)));
