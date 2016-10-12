angular.module('todoApp',[])
.service('usrData',function () {
    return {
      user:'Adam',
      items:[
        {action:'Buy Flowers',done:false},
        {action:'Get Shoes',done:false},
        {action:'Collect Tickets',done:true},
        {action:'Call Joe',done:false}
      ]
    };
  })
.controller('ToDoController',['$scope','usrData',function ($scope,usrData) {
    $scope.data = usrData;
  $scope.incompleteCount = function () {
    var count = 0;
    angular.forEach($scope.data.items,function (item) {
      if(!item.done){count++;}
    });
    return count;
  };
  $scope.warningLevel = function () {
    return $scope.incompleteCount() < 3? 'label-success':'label-warning';
  };
  $scope.addNewItem = function (actionText) {
    $scope.data.items.push({action:actionText,done:false});
  };
  $scope.enterHandler = function (event) {
    var keyCode = window.event ? event.keyCode:event.which;
    if(keyCode == 13){
      $scope.addNewItem(event.target.value);
      event.target.value = '';
    }
  }
}])