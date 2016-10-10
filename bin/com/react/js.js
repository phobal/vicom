'use strict';
var Utils = require('./../../libs/utils');

module.exports = function(opt) {
	var name = Utils.upperFirstChar(opt.name);
	return Utils.signature(opt) + `

 'use strict';
 
 require('./index.css');

 var Utils = require('bcore/utils');
 var Event = require('bcore/event');
 //
 function ${name}(container, options){
   this.container = container;
 	 options = this.options = Utils.deepMerge(${name}.options, options);
 	 //
 	 this.init();
 	 this.initEvents();
 }

 ${name} = Event.extend(${name}, {
   init: function(){},
 	 initEvents: function(){},
 	 //数据导入
 	 data: function(ds){
 	   this._data = ds;
 	 },
 	 render: function(ds){
 	 	 if(ds) this.data(ds);
 	 	 this.draw();
 	 },
 	 draw: function(){},
 	 //更新配置，如各种样式
 	 updateOptions: function(options){
 	 	 this.options = Utils.deepMerge(this.options, options);
 	 }
 });
 
 //
 ${name}.options = {};

 module.exports = ${name};
`;
};