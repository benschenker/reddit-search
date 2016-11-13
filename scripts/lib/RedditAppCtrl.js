'use strict';

/* global angular*/
/* eslint func-names: "off", no-param-reassign: "off"*/
angular.module('redditApp').controller('RedditAppCtrl', ['$scope', '$http', function ($scope, $http) {
  var redditApiBase = 'https://www.reddit.com/r/';
  $scope.getPosts = function (subReddit) {
    return $http.get('' + redditApiBase + subReddit + '.json').then(function (res) {
      $scope.notFound = false;
      $scope.posts = res.data.data.children.map(function (post) {
        return post.data;
      });
    }).catch(function () {
      $scope.notFound = true;
    });
  };
}]);