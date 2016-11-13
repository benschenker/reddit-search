/* global angular*/
/* eslint func-names: "off", no-param-reassign: "off"*/
angular.module('redditApp')
.controller('RedditAppCtrl',
  [
    '$scope',
    '$http',
    ($scope, $http) => {
      const redditApiBase = 'https://www.reddit.com/';
      $scope.getPosts = (subReddit) => $http.get(`${redditApiBase}${subReddit}.json`)
      .then((res) => {
        $scope.posts = res.data.data.children;
      })
      .catch((err) => {
        $scope.data = err;
      });
      $scope.getPosts('r/news'); // temporary to speed up testing
    },
  ]
);
