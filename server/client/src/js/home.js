app.controller("home",function($scope,$q,rest,$http){
	//pedekatan dengan cara OOP semua method method yang berhubungan dengan objek 
	//telah dibungkus dalam function nama_objek
	//dan semua $scope.function pada objek child dapat dipanggil antara satu dengan yang lain. 
	//dual binding antara variabel $scope yang telah di asigment 
	// --> misal $scope.table=$scope.categories apapun yang dirubah dalan
	// --> $scope.table akan ikut merubah apa yang ada didalam $scope.categories 

	getData();
	function getData(){
		$q.all([
			rest.dataset({ action :"read", model:"category" }),
			rest.dataset({ action :"read", model:"article"  })
		]).then(function(res){
			$scope.categories = res[0];
			$scope.articles   = res[1];
			allTools();
			crud();
		})
	}









	function allTools(){
		$scope.navActive=[ "list-group-item", "list-group-item active" ];
		$scope.file=[
			{
				title       : "category", //judul dari tabel yang akan dibuat 
				label       : "category_name", //label dari tabel ini digunakan untuk labeling delete
				active      : 1,   // active tidak nya tabel di navigation optional
				properties  : [
					{ label : "Category Name", model:"category_name", type:"text" }
				], //properties dari tabel
				data        : $scope.categories // data dari tabel digunakan untuk read data   
			},
			{ 
				title       : "article", 
				label       : "title",
				active      : 0,  
				properties  : [
					{ label : "Title",       type : "text",  model : "title"},
					{ label : "Description", type : "text",  model : "description"},
					{ label : "Category",    type : "text",  model : "id_category"}
				],
				data        : $scope.articles
			}
		];
		//mendeklarasikan relasi antar tabel
		$scope.link={
			article : [
			 	{ to : "category", foregn_key : "id_category", parent_label : "category_name" }
			]
		}
		$scope.table=[];
		$scope.setActive=function(index){
			for (var i = 0; i < $scope.file.length; i++) {
				if(i==index){
					$scope.file[i].active=1;
				}
				else {
					$scope.file[i].active=0;	
				}
			}
			$scope.setTable($scope.file);
		}

		$scope.relation=function(){
			var list   = $scope.link[$scope.table.title];
			function parent(title){
				for (var i = 0; i < $scope.file.length; i++) {
					if($scope.file[i].title==title){
						return $scope.file[i].data;
					}
				}
			}
			if(list != undefined){
				for (var i = 0; i < list.length; i++) {
					var data=parent(list[i].to);
					//action for form to use select option automatic
					for (var j = 0; j < $scope.table.properties.length; j++) {
						if($scope.table.properties[j].model==list[i].foregn_key){
							$scope.table.properties[j]["foregn_key"]   = true;
							$scope.table.properties[j]["data"]         = data;
							$scope.table.properties[j]["parent_label"] = list[i].parent_label;
						}
					}
					//action for table automatic use parent label
					for (var j = 0; j < $scope.table.data.length; j++) {
						for (var k = 0; k < data.length; k++) {
							if(data[k].id==$scope.table.data[j][list[i].foregn_key]){
								$scope.table.data[j][list[i].parent_label]=data[k][list[i].parent_label];
							}
						}
					}
				}
			}
		}
		$scope.setTable=function(data){
			for (var i = 0; i < data.length; i++) {
				if(data[i].active==1){
					$scope.table=data[i];
					$scope.relation();
				}
			}
		};
		$scope.setTable($scope.file);
	}














	function crud(){
		$scope.post    = {};
		$scope.action  = "";
		$scope.model   = "";
		$scope.index   = null;
		$scope.backup  = {};
		$scope.cancel=function(){
			$scope.table.data[$scope.index] = $scope.backup 
		}
		$scope.create=function(model){
			$scope.post    = {};
			$scope.action  = "create";
			$scope.model   = model;
		}
		$scope.update=function(model,data,index){
			$scope.index   = index; 
			$scope.post    = data;
			$scope.action  = "update";
			$scope.model   = model;
			$scope.backup  = angular.copy($scope.post);
		}
		$scope.delete=function(model,data,index){
			$scope.post    = data;
			$scope.index   = index;
			$scope.action  = "delete";
			$scope.model   = model;	
		}
		$scope.save=function(){
			rest.dataset({
				action  : $scope.action,
				model   : $scope.model,
				data    : $scope.post
			}).then(function(res){
				$scope.response(res);
			})
		}	
		$scope.response=function(res){
			switch($scope.action){
				case "create":
					$scope.table.data.push(res[0]);
				break;

				case "delete":
					$scope.table.data.splice($scope.index,1);
				break;
			}
			$scope.relation();
		}
	}








})
