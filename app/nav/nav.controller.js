angular
  .module("AppModule")
  .controller("NavController", [
    "$scope",
    "$http",
    "$localStorage",
    "$location",
    NavController,
  ]);

function NavController($scope, $http, $localStorage, $location) {
  $scope.initController = function () {
    $scope.$watch(
      function () {
        return $localStorage.currentUser;
      },
      function () {
        $scope.currentUser = $localStorage.currentUser;
      },
      true
    );
  };

  $scope.isSignedIn = function () {
    return !!$localStorage.currentUser;
  };

  $scope.signIn = function () {
    $location.path("/signin");
  };

  $scope.signUp = function () {
    $location.path("/signup");
  };

  $scope.initController();

  $scope.signOut = function () {
    delete $localStorage.currentUser;
    $http.defaults.headers.common.Authorization = "";
    $location.path("/");
  };
}
