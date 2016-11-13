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
        $scope.data = res.data;
      })
      .catch((err) => {
        $scope.data = err;
      });
    },
  ]
);
