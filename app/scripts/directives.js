/**
 * Heading section
 */
app.directive('postHeader', function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/post-header.html'
  };
});

/**
 * Single post listing
 */
app.directive('postListing', function () {
  return {
    restrict: 'E',
    templateUrl: 'directives/post-listing.html'
  };
});

/**
 * Background image attribute
 */
app.directive('backImg', function () {
  return function (scope, element, attrs) {
    attrs.$observe('backImg', function (value) {
      element.css({
        'background-image': 'url(' + value + ')',
        'background-size' : 'cover'
      });
    });
  };
});
