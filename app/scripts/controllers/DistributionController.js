/**
 * Created by oguzhancolak on 7.10.2016.
 */
app.controller('DistributionController', function($scope, Chats) {
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

});
