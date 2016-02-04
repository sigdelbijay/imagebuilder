(function() {
  'use strict';
  angular.module('testApp')
    .directive('customDirective', customDirective)
    .directive('uploadImage', uploadImage);

  uploadImage.$inject = ['$timeout']

  function customDirective() {
    return {
      restrict: 'E',
      scope: {
        caption: '=',
        textLocation: '=',
        fontStyle: '=',
        backgroundStyle: '=',
        imageSource: '='
      },
      link: function(scope, element, attributes) {},
      template: '' +
        '<div class="text-center" ng-style="backgroundStyle" style="position: relative; left: 0; top: 0;">' +
        '<p class="text-center" ng-style="fontStyle" ng-show="textLocation==1">{{caption}}</p>' +
        '<img src="iphone.png" alt="" width="75%" style="position: relative; top: 0; left: 0;">' +
        '<img ng-src="{{imageSource}}" alt="" class="myStyle">' +
        '<p class="text-center" ng-style="fontStyle" ng-show="textLocation==2">{{caption}}</p>' +
        '<div class="clearfix"></div>' +
        '</div>' +
        '</div>'
    };
  }

  function uploadImage($timeout) {
    return {
      restrict: 'E',
      scope: {
        setFile: '='
      },
      link: function(scope, element, attribute) {
        scope.triggerClick = function() {
          document.getElementById('trigger').click();
        }
      },
      template: '' +
        '<div>' +
        '<button class="btn btn-default" ng-click="triggerClick()">Upload Image</button>' +
        '<input type="file" id="trigger" style="display:none" onchange="angular.element(this).scope().setFile(this)" accept="image/*">' +
        '</div>'
    }
  }


})();
