/* global angular*/
/* eslint func-names: "off", no-param-reassign: "off"*/
angular.module('redditApp')
.controller('RedditAppCtrl',
  [
    '$scope',
    '$http',
    ($scope, $http) => {
      const redditApiBase = 'https://www.reddit.com/r/';
      $scope.getPosts = (subReddit) => $http.get(`${redditApiBase}${subReddit}.json`)
      .then((res) => {
        $scope.notFound = false;
        $scope.posts = res.data.data.children.map((post) => post.data);
      })
      .catch(() => {
        $scope.notFound = true;
      });
    },
  ]
);
