/* global angular*/
/* eslint func-names: "off", no-param-reassign: "off"*/


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
