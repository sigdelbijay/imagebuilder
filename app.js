(function() {

  'use strict';
  angular.module('testApp', [])

  angular.element(document).ready(function() {
    angular.bootstrap(document, ['testApp']);
  })

})();

angular.module('testApp')
  .controller('testController', testController)
  .directive('customDirective', customDirective)
  .directive('uploadImage', uploadImage);
testController.$inject = ['$scope'];
uploadImage.$inject = ['$timeout']

function testController($scope) {
  var self = this;
  self.fontStyle = {};
  self.backgroundStyle = {};
  self.textLocation = "1";

  self.setFile = function(element) {
    self.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        $scope.imageSource = event.target.result
        $scope.$apply()

      }
      // when the file is read it triggers the onload event above.
    reader.readAsDataURL(element.files[0]);
  }
};

// directive

function customDirective() {
  return {
    restrict:'E',
    scope: {
      caption: '=',
      textLocation:'=',
      fontStyle:'=',
      backgroundStyle:'=',
      imageSource: '='
    },
    link: function(scope, element, attributes) {
    },
    template:''+
     '<div class="text-center" ng-style="backgroundStyle" style="position: relative; left: 0; top: 0;">'+
      '<p class="text-center" ng-style="fontStyle" ng-show="textLocation==1">{{caption}}</p>'+
      '<img src="iphone.png" alt="" width="75%" style="position: relative; top: 0; left: 0;">'+
      '<img ng-src="{{imageSource}}" alt="" class="myStyle">'+
      '<p class="text-center" ng-style="fontStyle" ng-show="textLocation==2">{{caption}}</p>'+
      '<div class="clearfix"></div>'+
    '</div>'+
  '</div>'
  };
}

function uploadImage($timeout) {
  return {
    restrict: 'E',
    scope: {
      setFile:'='
    },
    link: function(scope, element, attribute) {
      scope.triggerClick = function() {
        document.getElementById('trigger').click();
      }
    },
    template: ''+
      '<div>'+
        '<button class="btn btn-default" ng-click="triggerClick()">Upload Image</button>'+
        '<input type="file" id="trigger" style="display:none" onchange="angular.element(this).scope().setFile(this)" accept="image/*">' +
      '</div>'
  }
}
