#!/usr/bin/env node

// Set options as a parameter, environment variable, or rc file.
global.require = require('esm')(module/* , options */)
let cli = global.require('./main/main.js').cli
cli(process.argv)
