angular
  .module("AppModule")
  .controller("SignUpController", [
    "$scope",
    "$location",
    "AuthService",
    SignUpController,
  ]);

function SignUpController($scope, $location, AuthService) {
  $scope.signUp = signUp;

  $scope.initController = function () {};

  $scope.initController();

  function signUp() {
    $scope.loading = true;
    AuthService.signUp(
      $scope.username,
      $scope.password,
      function (errorMessages) {
        if (errorMessages) {
          $scope.loading = false;
          $scope.errorMessages = errorMessages;
        } else {
          $location.path("/");
        }
      }
    );
  }
}
