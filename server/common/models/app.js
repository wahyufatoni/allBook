'use strict';

var app=require("../../server/server.js");
module.exports = function(App) {
		
		App.service=function(action,model,data,filter,res){
			var lib,model,dataset;
			lib={ 
				employee   : { api : app.models.employee},
				category   : { api : app.models.category, label : "category_name" },
				article    : { api : app.models.article,  label : "title" }
			};
			dataset=lib[model].api;
			switch(action){
				case "login":
					dataset.login(data).then(function(cb){
						res(null,[cb]);
					}).catch(function(err){
						res(null,[false]);
					})
				break;

				case "session":
					dataset.findById().then(function(cb){
						res(null,[cb])
					})
				break;

				case "read":
					if(filter==undefined){
						dataset.find().then(function(cb){
							res(null,cb);
						})
					}
					else {
						dataset.find(filter).then(function(cb){
							res(null,cb);
						})	
					}
				break;

				case "create":
					dataset.create(data).then(function(cb){
						res(null,[cb]);
					});
				break;

				case "update":
					var id=data.id;
					data.id=undefined;
					dataset.replaceById(id,data).then(function(cb){
						res(null,[cb]);
					})
				break;

				case "delete":
					dataset.deleteById(data.id).then(function(cb){
						res(null,[cb]);
					})
				break;
			}
		}

		App.remoteMethod("service",{
			http     : { path : "/service", verb:"post"},
			accepts  : [
				{ type : "string", arg : "action" },
				{ type : "string", arg : "model"  },
				{ type : "object", arg : "data"   },
				{ type : "object", arg : "filter" }
			],
			returns  : { type:"array", root : true }
		})

};
