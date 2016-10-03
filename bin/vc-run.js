#!/usr/bin/env node

'use strict';
var childProcess = require('child_process');
var path = require('path');
var fs = require('fs');
//
var Utils = require('./libs/utils');

var comdir = process.cwd();
var tooldir = path.join(__dirname, './../coms');
var toolRootDir = path.join(__dirname, './../');
var htmlDir = path.join(__dirname, './../index.html');
var cs = comdir.split('\/');
var name = cs[cs.length - 1];


function createSoftLink() {
	childProcess.exec('ln -s ' + comdir + ' ' + tooldir);
}
//
function writeFile(name, content) {
	fs.writeFileSync(path.join(__dirname, './../' + name), content, 'utf8');
}

function updateFiles() {
	//更新配置
	var config = {
		name: name,
		com: comdir,
		comRelative: './coms/' + name,
		html: htmlDir
	};
	writeFile('config.json', JSON.stringify(config, null, 2));
	//更新文件
	var js = require('./src/script');
	writeFile('index.js', js);
	var makefile = require('./src/makefile');
	writeFile('Makefile', makefile);
}

//
function createServer() {
	var cmd = 'NODE_ENV=development webpack-dev-server --hot --inline --progress --colors --host 0.0.0.0 --port 8080 --config ' + 
	path.join(toolRootDir, './webpack.config.js');
	//
	Utils.exec(cmd, function(){
		Utils.done('调试服务开启');
	});
}

createSoftLink();
updateFiles();
createServer();

