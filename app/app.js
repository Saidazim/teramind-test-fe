var AppModule = angular.module("AppModule", [
  "ngStorage",
  "ngRoute",
  "ngFileUpload",
]);

AppModule.config([
  "$routeProvider",
  function ($routeProvider) {
    $routeProvider
      .when("/files", {
        templateUrl: "files/files.template.html",
        controller: "FilesController",
      })
      .when("/signin", {
        templateUrl: "auth/sign-in.template.html",
        controller: "SignInController",
      })
      .when("/signup", {
        templateUrl: "auth/sign-up.template.html",
        controller: "SignUpController",
      })
      .otherwise({
        redirectTo: "/files",
      });
  },
]);

AppModule.config([
  "$httpProvider",
  function ($httpProvider) {
    $httpProvider.interceptors.push([
      "$q",
      "$location",
      "$localStorage",
      function ($q, $location, $localStorage) {
        return {
          request: function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
              config.headers.Authorization = "Bearer " + $localStorage.token;
            }
            return config;
          },
          responseError: function (response) {
            if (response.status === 401 || response.status === 403) {
              $location.path("/signin");
            }
            return $q.reject(response);
          },
        };
      },
    ]);
  },
]);

AppModule.run([
  "$rootScope",
  "$http",
  "$location",
  "$localStorage",
  function ($rootScope, $http, $location, $localStorage) {
    if ($localStorage.currentUser) {
      $http.defaults.headers.common.Authorization =
        "Bearer " + $localStorage.currentUser.token;
    }

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
      var publicPages = ["/signin", "/signup"];
      var restrictedPage = publicPages.indexOf($location.path()) === -1;
      if (restrictedPage && !$localStorage.currentUser) {
        $location.path("/signin");
      }
    });
  },
]);
