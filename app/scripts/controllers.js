/**
 * Home Controller
 */
app.controller('HomeController', ['$scope', 'Post', function ($scope, Post) {

  $scope.headerImage = "lantern-festival-402049_1920.jpg";
  $scope.isNew = true;

  Post.getAll().then(function (res) {
    $scope.posts = res.posts;
  });

}]);

/**
 * Posts List Controller
 */
app.controller('PostsListController', ['$scope', '$routeParams', function ($scope, $routeParams) {

}]);

/**
 * Post Controller
 */
app.controller('PostController', ['$scope', '$routeParams', 'Post', function ($scope, $routeParams, Post) {

  $scope.headerImage = "forest-793691_1920.jpg";
  $scope.postId = $routeParams.postId;
  $scope.isNew = true;

  Post.getById($routeParams.postId).then(function (res) {
    $scope.post = res.posts[0];
    console.log($scope.post);
  });

}]);

/**
 * Error Controller
 */
app.controller('ErrorController', ['$scope', '$routeParams', function ($scope, $routeParams) {
  $scope.headerImage = "road-690585_1920.jpg";
}]);
