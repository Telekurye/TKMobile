/**
 * Created by oguzhancolak on 7.10.2016.
 */
app.controller('DistributionDetailController', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.distId);
});
