angular
  .module("AppModule")
  .controller("SignInController", [
    "$scope",
    "$location",
    "AuthService",
    SignInController,
  ]);

function SignInController($scope, $location, AuthService) {
  $scope.signIn = signIn;

  $scope.initController = function () {};

  $scope.initController();

  function signIn() {
    $scope.loading = true;
    AuthService.signIn($scope.username, $scope.password, function (result) {
      if (result === true) {
        $location.path("/");
      } else {
        $scope.error = "Username or password is incorrect";
        $scope.loading = false;
      }
    });
  }
}
