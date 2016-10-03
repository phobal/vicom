var chalk = require('chalk');
var ascii = require('./ascii');
var cp = require('child_process');

function print(str, type){//type 可以为 green red yellow等
	type = type || 'green';
  console.log(chalk[type](str + '\n'));
}

//执行完一个大任务时候执行
function done(str){
	var n = str.length;
	var str = ascii.createLogo(str + ' | ' + 'powerd by vicom', n);
	return print(str, 'yellow');
}

//首字母大写
function upperFirstChar(name) {
	if (!name) return 'Com';
	return name[0].toUpperCase() + name.substring(1, name.length);
}

//生成文件头部的签名
function signature(opt){
	return `
/*
* @Author: ${opt.username}
* @Date:   ${new Date().toLocaleString()}
*/
`;
}

//执行某个命令
function exec(cmd, cb){
	var f = cp.exec(cmd, cb);
	f.stdout.on('data', function(d){
		return print(d, 'green');
	});
}

module.exports = {
	upperFirstChar: upperFirstChar,
	signature: signature,
	print: print,
	done: done,
	exec: exec
};