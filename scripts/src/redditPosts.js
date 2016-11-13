/* global angular*/
angular.module('redditApp').component('redditPosts', {
  template: `
    <input type="number" ng-model="$ctrl.minComments" placeholder="Minimum # of Comments"/>
    <input type="number" ng-model="$ctrl.maxComments" placeholder="Maximum # of Comments"/>
    <input type="number" ng-model="$ctrl.minUps" placeholder="Minimum # of Upvotes"/>
    <input type="text" ng-model="$ctrl.textSearch" placeholder="Text search"/>
    <div ng-repeat="post in $ctrl.posts
          | filter: $ctrl.minCommentFilter
          | filter: $ctrl.maxCommentFilter
          | filter: $ctrl.minUpsFilter
          | filter: $ctrl.textSearchORFilter
    ">
      <a href="{{post.url}}">{{post.title}}</a>
      <span>submitted by {{post.author}}</span>
    </div>
  `,
  controller() {
    const ctrl = this;
    ctrl.minCommentFilter = (post) => post.num_comments > (ctrl.minComments || 0);
    ctrl.maxCommentFilter = (post) => post.num_comments < (ctrl.maxComments || Infinity);
    ctrl.minUpsFilter = (post) => post.ups > (ctrl.minUps || 0);

    // Performs a text search on multiple tokens separated by a space and returns true if any pass
    ctrl.textSearchORFilter = (post) => {
      if (!ctrl.textSearch) {
        return true;
      }
      const tokens = ctrl.textSearch.split(' ');
      // TODO: make case insensitive
      const matchingTokens = tokens.map((token) => post.title.indexOf(token) !== -1);
      return matchingTokens.filter((isMatch) => isMatch).length > 0;
    };
  },
  bindings: {
    posts: '<',
  },
});
