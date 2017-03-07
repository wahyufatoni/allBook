app.controller("user",function($scope,fileUpload){
	$scope.upload = function() {
		
		var file = $scope.myFile;
    	var uploadUrl = "/api/containers/profile/upload";
    	fileUpload.uploadFileToUrl(file, uploadUrl);

	};

})