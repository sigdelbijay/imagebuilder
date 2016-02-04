(function() {
  'use strict';
  angular.module('testApp')
    .controller('testController', testController);

  testController.$inject = ['$scope'];

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
})();
