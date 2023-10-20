var myApp = angular.module("myModule", ["ui.router"]);

myApp.config([
  "$stateProvider",
  "$urlRouterProvider",
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("inbox", {
        url: "/inbox",
        templateUrl: "/pages/inbox/inbox.html",
        controller: "inboxController",
      })
      .state("registration", {
        url: "/registration",
        templateUrl: "/pages/registration/registration.html",
        controller: "registrationController",
      })
      .state("registration.dob", {
        url: "/dob",
        templateUrl: "/pages/registration/dob.html",
        controller: "dobController",
      })
      .state("registration.email", {
        url: "/email",
        templateUrl: "/pages/registration/email.html",
        controller: "emailController",
      })
      .state("registration.password", {
        url: "/password",
        templateUrl: "/pages/registration/password.html",
        controller: "passwordController",
      })
      .state("registration.recEmail", {
        url: "/recEmail",
        templateUrl: "/pages/registration/recEmail.html",
        controller: "recEmailController",
      })
      .state("registration.recPhone", {
        url: "/recPhone",
        templateUrl: "/pages/registration/recPhone.html",
        controller: "recPhoneController",
      })
      .state("registration.submit", {
        url: "/submit",
        templateUrl: "/pages/registration/submit.html",
        controller: "submitController",
      })
      .state("login", {
        url: "/login",
        templateUrl: "/pages/login/login.html",
        controller: "loginController",
      })
      .state("login.pass", {
        url: "/pass",
        templateUrl: "/pages/login/pass.html",
        controller: "passController",
      })
      .state("dashboard", {
        url: "/dashboard",
        templateUrl: "/pages/dashboard/dashboard.html",
        controller: "dashboardController",
      })
      .state("dashboard.starred", {
        url: "/starred",
        templateUrl: "/pages/starred/starred.html",
        controller: "starredMailController",
      })
      .state("dashboard.draft", {
        url: "/draft",
        templateUrl: "/pages/draft/draft.html",
        controller: "draftMailController",
      })
      .state("dashboard.sent", {
        url: "/sent",
        templateUrl: "/pages/sent/sent.html",
        controller: "sentMailController",
      })
      .state("dashboard.archive", {
        url: "/archive",
        templateUrl: "/pages/archive/archive.html",
        controller: "archiveMailController",
      });

    $urlRouterProvider.otherwise("/login");
  },
]);

const apiUrl = "https://10.21.82.60:8000";

myApp.factory("sharedDataFactory", function () {
  var sharedData = {};
  return {
    getData: function () {
      return sharedData;
    },
    setData: function (newData) {
      angular.extend(sharedData, newData);
    },
  };
});
