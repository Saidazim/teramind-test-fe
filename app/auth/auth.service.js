angular
  .module("AppModule")
  .factory("AuthService", ["$http", "$localStorage", Service]);

function Service($http, $localStorage) {
  var service = {};

  service.signIn = signIn;
  service.signUp = signUp;

  return service;

  function signIn(username, password, callback) {
    var postConfing = {
      method: "POST",
      url: "http://localhost:3000/auth/signin",
      data: {
        username,
        password,
      },
    };

    $http(postConfing).then(
      function (response) {
        $localStorage.currentUser = {
          username: username,
          token: response.data.accessToken,
        };

        $http.defaults.headers.common.Authorization =
          "Bearer " + response.data.accessToken;

        callback(true);
      },
      function (error) {
        callback(false);
      }
    );
  }

  function signUp(username, password, callback) {
    var postConfing = {
      method: "POST",
      url: "http://localhost:3000/auth/signup",
      data: {
        username,
        password,
      },
    };

    $http(postConfing).then(
      function (response) {
        $localStorage.currentUser = {
          username: username,
          token: response.data.accessToken,
        };
        $http.defaults.headers.common.Authorization =
          "Bearer " + response.data.accessToken;

        callback(null);
      },
      function (errorRes) {
        callback(errorRes.data.message);
      }
    );
  }
}
