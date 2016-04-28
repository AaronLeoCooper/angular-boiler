var dummy_posts = {
	"posts": [{
		"id": 1,
		"title": "Cool post",
		"intro": "Here's a little intro...",
		"content": "<p>Hello hello hello!<\/p>",
		"datePosted": "2015-05-05",
		"niceDatePosted": "Tue 5th May, 2015",
    "slug": "post-1"
	}]
};

var dummy_topics = {
	"posts": [{
		"id": 1,
		"title": "Cool post",
		"intro": "Here's a little intro...",
		"content": "<p>Hello hello hello!<\/p>",
		"datePosted": "2015-05-05",
		"niceDatePosted": "Tue 5th May, 2015",
    "slug": "post-1"
	}]
};

/**
 * Filters
 */
angular.module('appFilters', [])
  .filter('slugify', function () {

    return function (text) {
      return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
    };

  });


/**
 * Routes
 */
angular.module('appRoutes', [])
  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider.
      when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }).
      when('/posts', {
        templateUrl: 'views/posts-list.html',
        controller: 'PostsListController'
      }).
      when('/post/:postId', { // Post ID or Slug
        templateUrl: 'views/post.html',
        controller: 'PostController'
      }).
      when('/404', {
        templateUrl: 'views/404.html',
        controller: 'ErrorController'
      }).
      otherwise({
        redirectTo: '/404'
      });

    $locationProvider.html5Mode(true);

  }]);


/**
* Services
*/
var useDummy = true;
angular.module('appServices', [])

  // POSTS
  .factory('Post', ['$http', '$q', '$httpParamSerializer', function ($http, $q, $httpParamSerializer) {

    var api = "/api/";

    return {
      getAll: function () {
        var url = api + 'posts';
        return useDummy ? $q(function(resolve, reject) {
          resolve(dummy_posts);
        }) : $http.get(url);
      },
      getById: function (id) {
        var url = api + 'posts/' + id; // Id or Slug
        return useDummy ? $q(function(resolve, reject) {
          resolve(dummy_posts);
        }) : $http.get(url);
      }
    };

  }])

  // TOPICS
  .factory('Topic', ['$http', '$q', '$httpParamSerializer', function ($http, $q, $httpParamSerializer) {

    var api = "/api/";

    return {
      getAll: function () {
        var url = api + 'topics';
        return useDummy ? $q(function(resolve, reject) {
          return dummy_topics;
        }) : $http.get(url);
      },
      getById: function (id) {
        var url = api + 'topics/' + id;
        return useDummy ? $q(function(resolve, reject) {
          return dummy_topics;
        }) : $http.get(url);
      }
    };

  }]);


/**
* App Init
*/
app = angular.module("BoilerApp",
  [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'appServices',
    'appFilters',
    'appRoutes'
  ]
);
