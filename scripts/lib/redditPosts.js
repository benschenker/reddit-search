'use strict';

/* global angular*/
angular.module('redditApp').component('redditPosts', {
  template: '\n    <div ng-show="$ctrl.posts.length">\n      <input type="number" ng-model="$ctrl.minComments" placeholder="Min # of Comments"/>\n      <input type="number" ng-model="$ctrl.maxComments" placeholder="Max # of Comments"/>\n      <input type="number" ng-model="$ctrl.minUps" placeholder="Min # of Upvotes"/>\n      <input type="text" ng-model="$ctrl.textSearch" placeholder="Text search"/>\n    </div>\n    <div ng-repeat="post in $ctrl.posts\n          | filter: $ctrl.minCommentFilter\n          | filter: $ctrl.maxCommentFilter\n          | filter: $ctrl.minUpsFilter\n          | filter: $ctrl.textSearchORFilter\n          | orderBy: $ctrl.textSearchORFilterRanking:true\n    ">\n      <a href="{{post.url}}">{{post.title}}</a>\n      <span>submitted by {{post.author}}</span>\n    </div>\n  ',
  controller: function controller() {
    var ctrl = this;
    ctrl.minCommentFilter = function (post) {
      return post.num_comments > (ctrl.minComments || 0);
    };
    ctrl.maxCommentFilter = function (post) {
      return post.num_comments < (ctrl.maxComments || Infinity);
    };
    ctrl.minUpsFilter = function (post) {
      return post.ups > (ctrl.minUps || 0);
    };
    // returns array of booleans representing which token was found in post title
    var textSearchMatches = function textSearchMatches(post) {
      if (!ctrl.textSearch) {
        return [true]; // This is a helper function outputs arrays, [true] is the pass through value
      }
      var tokens = ctrl.textSearch.split(' ');
      return tokens.map(function (token) {
        return post.title.toLowerCase().indexOf(token.toLowerCase()) !== -1;
      });
    };
    // Returns true if any of the tokens passed the search test
    ctrl.textSearchORFilter = function (post) {
      return textSearchMatches(post).filter(function (isMatch) {
        return isMatch;
      }).length > 0;
    };
    // Returns the number of tokens that passed the search test
    ctrl.textSearchORFilterRanking = function (post) {
      return textSearchMatches(post).reduce(function (acc, val) {
        return acc + val;
      });
    };
  },

  bindings: {
    posts: '<'
  }
});