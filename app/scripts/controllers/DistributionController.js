/**
 * Created by oguzhancolak on 7.10.2016.
 */
app.controller('DistributionController', function($scope, Chats, SyncSrvc, $rootScope) {
  $scope.data = {
    showDelete: false
  };

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $scope.moveItem = function(item, fromIndex, toIndex) {
    $scope.chats.splice(fromIndex, 1);
    $scope.chats.splice(toIndex, 0, item);
  };

  SyncSrvc.setDatabase();
  SyncSrvc.sync();
  SyncSrvc.startListening();

  $scope.items = {};

  $rootScope.$on("$pouchDB:change", function(event, data) {
    $scope.items[data.doc._id] = data.doc;
    $scope.$apply();
  });

  $rootScope.$on("$pouchDB:delete", function(event, data) {
    delete $scope.items[data.doc._id];
    $scope.$apply();
  });

});
