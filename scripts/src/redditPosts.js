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
          | orderBy: $ctrl.textSearchORFilterRanking:true
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
    // returns array of booleans representing which token was found in post title
    const textSearchMatches = (post) => {
      if (!ctrl.textSearch) {
        return [true]; // This is a helper function outputs arrays, [true] is the pass through value
      }
      const tokens = ctrl.textSearch.split(' ');
      return tokens.map(
        (token) => post.title.toLowerCase().indexOf(token.toLowerCase()) !== -1);
    };
    // Returns true if any of the tokens passed the search test
    ctrl.textSearchORFilter = (post) => textSearchMatches(post)
    .filter((isMatch) => isMatch).length > 0;
    // Returns the number of tokens that passed the search test
    ctrl.textSearchORFilterRanking = (post) => textSearchMatches(post)
    .reduce((acc, val) => acc + val);
  },
  bindings: {
    posts: '<',
  },
});
