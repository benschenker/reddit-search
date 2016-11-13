/* global angular*/
angular.module('redditApp').component('redditPosts', {
  template: `
    <div ng-repeat="post in $ctrl.posts">
      {{post | json}}
    </div>
  `,
  bindings: {
    posts: '<',
  },
});
