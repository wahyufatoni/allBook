app.controller("nav",function($scope){
	$scope.style=["","active"];
	$scope.navs=[
		{label :"Home", state : "home", active : 1 },
		{label : "User", state : "user", active : 0 }
	]
	$scope.setActive=function(index){
		for (var i = $scope.navs.length - 1; i >= 0; i--) {
			if(i==index){
				$scope.navs[i].active=1;
			}
			else {
				$scope.navs[i].active=0;
			}
		}
	}
})