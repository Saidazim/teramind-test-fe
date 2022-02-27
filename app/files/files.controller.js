angular
  .module("AppModule")
  .controller("FilesController", ["$scope", "FilesService", FilesController]);

function FilesController($scope, FilesService) {
  $scope.uploadFile = null;
  $scope.files = null;

  $scope.getFiles = function () {
    FilesService.getFiles().then(
      function (response) {
        $scope.files = response.data;
      },
      function (response) {
        console.log("Error status: " + resp.status);
      }
    );
  };

  $scope.initController = function () {
    $scope.getFiles();
  };

  $scope.initController();

  $scope.submit = function () {
    if ($scope.form.uploadFile.$valid && $scope.uploadFile) {
      $scope.upload($scope.uploadFile);
    }
  };

  $scope.upload = function (file) {
    FilesService.upload(file, function (status) {
      if (status) {
        $scope.uploadFile = null;
        $scope.getFiles();
      }
    });
  };
}
