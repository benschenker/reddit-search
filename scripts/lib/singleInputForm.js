'use strict';

/* global angular*/
/* eslint func-names: "off" */
angular.module('redditApp').component('singleInputForm', {
  template: '\n    <form ng-submit="$ctrl.update(subRedditName)">\n      <input type=text placeholder="subreddit, try \'news\'" ng-model="subRedditName"/>\n      <button class="btn btn-primary" type="submit">Get Posts!</button>\n    </form',
  controller: function controller() {
    var ctrl = this;
    ctrl.update = function (name) {
      ctrl.onUpdate({ name: name });
    };
  },

  bindings: {
    onUpdate: '&'
  }
});