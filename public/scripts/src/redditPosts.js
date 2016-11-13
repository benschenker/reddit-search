/* global angular*/
angular.module('redditApp').component('redditPosts', {
  template: `
    <input type="number" ng-model="$ctrl.minComments" placeholder="Minimum # of Comments"/>
    <input type="number" ng-model="$ctrl.maxComments" placeholder="Maximum # of Comments"/>
    <div ng-repeat="post in $ctrl.posts
          | filter: $ctrl.minCommentFilter
          | filter: $ctrl.maxCommentFilter
    ">
      <a href="{{post.url}}">{{post.title}}</a>
      <span>submitted by {{post.author}}</span>
    </div>
  `,
  controller() {
    const ctrl = this;
    ctrl.minCommentFilter = (post) => post.num_comments > (ctrl.minComments || 0);
    ctrl.maxCommentFilter = (post) => post.num_comments < (ctrl.maxComments || Infinity);
  },
  bindings: {
    posts: '<',
  },
});
