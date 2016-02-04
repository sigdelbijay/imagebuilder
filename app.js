var app = angular.module('testApp', []);
app.controller("testController", ['$scope', function($scope) {
  var self = this;
  this.fontStyle = {};
  this.backgroundStyle = {};
  this.textLocation = "1";

  this.setFile = function(element) {
    this.currentFile = element.files[0];
    var reader = new FileReader();

    reader.onload = function(event) {
        $scope.imageSource = event.target.result
        $scope.$apply()

      }
      // when the file is read it triggers the onload event above.
    reader.readAsDataURL(element.files[0]);
  }
}]);

// directive

app.directive('customDirective', [function() {
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
}]);

app.directive('uploadImage', ['$timeout', function($timeout) {
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
}])
