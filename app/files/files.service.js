angular.module("AppModule").factory("FilesService", [
  "$http",
  "Upload",
  function ($http, Upload) {
    var service = {};

    service.getFiles = function () {
      var getConfig = {
        method: "GET",
        url: "http://localhost:3000/files",
      };

      return $http(getConfig);
    };

    service.upload = function (file, callback) {
      Upload.upload({
        url: "http://localhost:3000/files",
        data: { file: file },
      }).then(
        function (resp) {
          callback(true);
        },
        function (resp) {
          callback(false);
          console.log("Error status: " + resp.status);
        }
      );
    };

    return service;
  },
]);
