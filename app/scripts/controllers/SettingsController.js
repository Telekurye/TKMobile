/**
 * Created by oguzhancolak on 7.10.2016.
 */
app.controller('SettingsController', function($scope) {
  $scope.settings = {
    enableWifi: true
  };

  $scope.callAdmin = function(){
    var number = '05074290210' ;
    window.location.href = 'tel:'+ number;
  };
});
