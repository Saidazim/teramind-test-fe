var appModule = angular.module("appModule", ["ngRoute"]);

appModule.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider.when('/files', {
      templateUrl: 'views/files.template.html',
      controller: 'FilesController',
    }).otherwise({
      redirectTo: '/files'
    });
  },
]);
