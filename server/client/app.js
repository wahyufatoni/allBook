
var app=angular.module("app",["ui.router"])

app.run(function($state){
	$state.go("home");
})

app.config(function($stateProvider){
	$stateProvider
	.state("home",{
		url         : "/Home",
		templateUrl : "src/tpl/home.html",
		controller  : "home"
	})
	.state("user",{
		url         : "/User",
		templateUrl : "src/tpl/user.html",
		controller  : "user"
	})
  .state("login",{
    url         : "/Login",
    templateUrl : "src/tpl/login.html",
    controller  : "login"
  })
})


app.service("rest",function($http){

	this.dataset=function(req){
		cb=$http.post("/api/apps/service",req).then(function(res){
			return res.data;
		})
		return cb;
	}

});

app.service('fileUpload', function ($http) {
    this.uploadFileToUrl = function(file, uploadUrl){
        	var fd = new FormData();
        	fd.append('file', file);
       	 
        	$http.post(uploadUrl, fd, {
            	transformRequest: angular.identity,
            	headers: {'Content-Type': undefined}
        	})
       	 
        	.success(function(){
        	})
       	 
        	.error(function(){
        	});
    }
})

app.directive('convertToNumber', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngModel) {
      ngModel.$parsers.push(function(val) {
        return parseInt(val, 10);
      });
      ngModel.$formatters.push(function(val) {
        return '' + val;
      });
    }
  };
});

app.directive('fileModel', ['$parse', function ($parse) {
    return {
    	restrict: 'A',
    	link: function($scope, $element, $attrs) {
        	var model = $parse($attrs.fileModel);
        	var modelSetter = model.assign;
         	 
        	$element.bind('change', function(){
          	$scope.$apply(function(){
            	modelSetter($scope, $element[0].files[0]);
            	});
        	});
    	}
    };
}])
