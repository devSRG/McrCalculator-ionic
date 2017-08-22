var precision_value = 2, unit_value = 'N mm';
angular.module('starter.controllers', ['ionicSettings'])
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  /*$ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  */
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('CalculateCtrl', function($scope) {
  $scope.data = {
    Iz  : null ,
    Iw  : null ,
    It  : null ,
    Lcr : null
  };
  var E = 210000, G = 80700;
  $scope.calculate = function() {
    var factor = Math.pow(10,precision_value);
    var tmp_result = ((Math.pow(Math.PI,2)*E*$scope.data.Iz)/Math.pow($scope.data.Lcr,2))*Math.sqrt(($scope.data.Iw/$scope.data.Iz) + ((Math.pow($scope.data.Lcr,2)*G*$scope.data.It)/(Math.pow(Math.PI,2)*E*$scope.data.Iz)));
    $scope.result = Math.round(tmp_result*factor)/factor + " " + unit_value;
  };
})

.controller('SettingsCtrl', function($rootScope, $ionicSettings, $ionicSettingsConfig) {
  var settings = {
    units: {
      type: 'selection',
      label: 'Unit',
      values: ['N mm', 'kN m'],
      value: 'N mm'
    },
    precision: {
      type: 'selection',
      label: 'Precision',
      values: [1, 2, 3, 4, 5, 6],
      value: 2
    }
  };
  $ionicSettings.init(settings);
  $rootScope.$on($ionicSettings.changed, function($event, changedSetting) {
    switch (changedSetting.key) {
      case 'units':
        unit_value = changedSetting.value;
        break;
      case 'precision':
        precision_value = parseInt(changedSetting.value);
        console.log(precision_value);
        break;
      default:
    }
  });
})
