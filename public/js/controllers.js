angular.module("WebApp")
.controller("MainController",['$scope','$resource','PostResource', function($scope,$resource,PostResource){
	/*$http.get()//sin resource
	$http.post()*/
	User = $resource("http://jsonplaceholder.typicode.com/users/:id",{id: "@id"});
	$scope.posts = PostResource.query();
	$scope.users = User.query();
	$scope.removePost = function(post){
		console.log(post);
		PostResource.delete({id: post.id}, function(data){
			console.log(data);
			//$scope.posts = Post.query();
		});
		$scope.posts = $scope.posts.filter(function(element){
			return element.id !== post.id;//Si es verdadero va a elminarlo
		});
		//[1,2,3,4]

	}
	//query() -> GET /posts -> Un arreglo de posts -> isArray: true

}])
.controller("PostController",['$scope','PostResource','$routeParams', '$location', function($scope,PostResource,$routeParams,$location){
	$scope.title = "Editar Post";
	$scope.post = PostResource.get({id: $routeParams.id});// isArray => false espera recibir solo un objeto JSON
	$scope.savePost = function(){
		PostResource.update({id: $scope.post.id},{data: $scope.post}, function(data){
				console.log(data);
				$location.path("/post/"+ $scope.post.id);
			});//CORS header
	}
}])
.controller("NewPostController",['$scope','PostResource','$location', function($scope,PostResource,$location){
	$scope.post = {};// isArray => false espera recibir solo un objeto JSON
	$scope.title = "Crear post";
	$scope.savePost = function(){
		PostResource.save({data: $scope.post}, function(data){
			console.log(data);
			$location.path("/");
		});//CORS header

	}
}]);
