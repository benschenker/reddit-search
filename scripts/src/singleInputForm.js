/* global angular*/
/* eslint func-names: "off", no-param-reassign: "off"*/


angular.module('redditApp').component('singleInputForm', {
  template: `
    <form ng-submit="$ctrl.update(subRedditName)">
      <input type=text placeholder="subreddit, try 'r/news'" ng-model="subRedditName"/>
      <button class="btn btn-primary" type="submit">Get Posts!</button>
    </form`,
  controller() {
    const ctrl = this;
    ctrl.update = function (name) {
      ctrl.onUpdate({ name });
    };
  },
  bindings: {
    onUpdate: '&',
  },
});
