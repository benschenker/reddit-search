/* global angular*/
angular.module('redditApp').component('redditPosts', {
  template: `
    <div ng-repeat="post in $ctrl.posts">
      <a href="{{post.data.url}}">{{post.data.title}}</a>
      <span>submitted by {{post.data.author}}</span>
    </div>
  `,
  bindings: {
    posts: '<',
  },
});
