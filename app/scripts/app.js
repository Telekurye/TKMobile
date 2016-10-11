var app = angular.module('TKMobile', ['ionic', 'starter.services', 'ionic-material']);

app.run(function($ionicPlatform, ionicMaterialInk, ionicMaterialMotion, $rootScope) {

  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    ionicMaterialInk.displayEffect();
    ionicMaterialMotion.ripple();

    function resetTabs() {
      $rootScope.isActiveDashboard = '';
      $rootScope.isActiveHome = '';
      $rootScope.isActiveSettings = '';
    }

    $rootScope.changeTab = function (tabName) {
      resetTabs();

      if(tabName == 'dash')
        $rootScope.isActiveDashboard = 'active';
      else if(tabName == 'dist')
        $rootScope.isActiveHome = 'active';
      else if(tabName == 'set')
        $rootScope.isActiveSettings = 'active';
    };

    $rootScope.changeTab('dist');
  });
});

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashboardController'
      }
    }
  })

  .state('tab.dist', {
      url: '/dist',
      views: {
        'tab-dist': {
          templateUrl: 'templates/tab-dist.html',
          controller: 'DistributionController'
        }
      }
    })
    .state('tab.dist-detail', {
      url: '/dist/:distId',
      views: {
        'tab-dist': {
          templateUrl: 'templates/tab-dist-detail.html',
          controller: 'DistributionDetailController'
        }
      }
    })

  .state('tab.settings', {
    url: '/settings',
    views: {
      'tab-settings': {
        templateUrl: 'templates/tab-settings.html',
        controller: 'SettingsController'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/dist');
  $ionicConfigProvider.tabs.position('bottom');

});
