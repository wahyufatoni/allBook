app.controller("login",function($scope,rest,$state){
	$scope.post={};
	$scope.login=function(){
		rest.dataset({action:"login",model:"employee",data:$scope.post}).then(function(res){
			if(res[0]!=false){
				console.log(res);
			}
		})
		$scope.post={};
	}	
})